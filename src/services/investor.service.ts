import type {
    IInvestor,
    ICreateInvestorArgs,
    IUpdateInvestorArgs,
} from '../interfaces/investor.interface';

import { handleError } from '../utils/handleError';

import * as algo from '../utils/algorithms';

import CustomResponse from '../models/customResponse.model';
import httpCodes from '../constants/httpCodes';
import invalidCodes from '../constants/invalidCodes';
import prisma from '../database';
import { IFile } from '../interfaces/file.interface';
import { createCompanyService } from './company.service';

export const createInvestorService = async (
    args: ICreateInvestorArgs,
): Promise<CustomResponse<IInvestor>> => {
    const { companyId, sharePercentage, name, code, type, parentInvestorId } =
        args;

    try {
        const response = await prisma.investor.create({
            data: {
                companyId,
                sharePercentage,
                name,
                code,
                type,
                parentInvestorId,
            },
        });

        return new CustomResponse(httpCodes.OK, response, undefined);
    } catch (error) {
        return handleError(error) as CustomResponse<IInvestor>;
    }
};

export const updateInvestorService = async (
    args: IUpdateInvestorArgs,
): Promise<CustomResponse<IInvestor>> => {
    const {
        id,
        companyId,
        sharePercentage,
        name,
        code,
        type,
        parentInvestorId,
    } = args;

    try {
        const response = await prisma.investor.update({
            where: { id },
            data: {
                companyId,
                sharePercentage,
                name,
                code,
                type,
                parentInvestorId,
            },
        });

        return new CustomResponse(httpCodes.OK, response, null);
    } catch (error) {
        return handleError(error) as CustomResponse<IInvestor>;
    }
};

export const getInvestorByIdService = async (
    id: number,
): Promise<CustomResponse<IInvestor | undefined>> => {
    try {
        const response = await prisma.investor.findUnique({
            where: { id },
        });

        if (!response) {
            return new CustomResponse(
                httpCodes.NOT_FOUND,
                undefined,
                invalidCodes.INVALID_NOT_FOUND,
            );
        }

        return new CustomResponse(httpCodes.OK, response, undefined);
    } catch (error) {
        return handleError(error) as CustomResponse<any>;
    }
};

export const getInvestorsService = async (): Promise<
    CustomResponse<IInvestor[]>
> => {
    try {
        const response = await prisma.investor.findMany();
        return new CustomResponse(httpCodes.OK, response, undefined);
    } catch (error) {
        return handleError(error) as CustomResponse<IInvestor[]>;
    }
};

export const getInvestorsByCompanyIdService = async (
    id: number,
): Promise<CustomResponse<IInvestor[]>> => {
    try {
        const response = await prisma.investor.findMany({
            where: {
                companyId: id,
            },
        });
        return new CustomResponse(httpCodes.OK, response, undefined);
    } catch (error) {
        return handleError(error) as CustomResponse<IInvestor[]>;
    }
};

export const deleteInvestorService = async (
    id: number,
): Promise<CustomResponse<IInvestor>> => {
    try {
        const response = await prisma.investor.delete({
            where: { id },
        });

        return new CustomResponse(httpCodes.OK, response, undefined);
    } catch (error) {
        return handleError(error) as CustomResponse<IInvestor>;
    }
};

export const saveCompanyInvestorsService = async (
    clientId: number,
    company: Record<string, string>,
    investors: IInvestor[],
): Promise<CustomResponse<IInvestor[] | undefined>> => {
    try {
        const registeredCompany = await createCompanyService({
            clientId,
            name: company.name,
            code: company.code,
        });

        const companyId = registeredCompany.getData()?.id;

        if (!companyId) {
            return new CustomResponse(
                httpCodes.BAD_REQUEST,
                undefined,
                invalidCodes.SOMETHING_BROKEN,
            );
        }

        const mappedParentsId = new Map<number, number>();

        const processInvestors = async (
            investors: IInvestor[],
            parentId: number | null = null,
        ) => {
            for (const investor of investors) {
                if (investor.parentInvestorId === parentId) {
                    const saveInvestors = await createInvestorService({
                        companyId,
                        sharePercentage: investor.sharePercentage,
                        name: investor.name,
                        code: investor.code,
                        type: investor.type,
                        parentInvestorId: parentId
                            ? mappedParentsId.get(parentId)
                            : null,
                    });

                    const newInvestorId = saveInvestors.getData()?.id;
                    if (newInvestorId) {
                        mappedParentsId.set(investor.id, newInvestorId);
                        await processInvestors(investors, investor.id);
                    }
                }
            }
        };

        await processInvestors(investors);

        const companyInvestors =
            await getInvestorsByCompanyIdService(companyId);

        return new CustomResponse(
            companyInvestors.getCode(),
            companyInvestors.getData(),
            companyInvestors.getError(),
        );
    } catch (error) {
        return handleError(error) as CustomResponse<IInvestor[]>;
    }
};

export interface ICompanyRealOwners {
    name: string;
    code: string;
    percentage: number;
    file: IFile;
}

export const getCompanyRealOwners = async (
    companyId: number,
): Promise<CustomResponse<ICompanyRealOwners[] | undefined>> => {
    try {
        const company = await prisma.company.findUnique({
            where: { id: companyId },
        });

        if (!company) {
            return new CustomResponse(
                httpCodes.NOT_FOUND,
                undefined,
                invalidCodes.INVALID_NOT_FOUND,
            );
        }

        const client = await prisma.client.findUnique({
            where: { id: company.clientId },
        });

        const companyInvestors = await prisma.investor.findMany({
            where: { companyId: company.id },
            orderBy: { id: 'asc' },
            include: { files: true },
        });

        const investorGraph =
            algo.transformToAdjacentGraphAlgo(companyInvestors);

        const rootInvestors = companyInvestors.filter(
            (investor) => investor.parentInvestorId === null,
        );

        const realOwners = algo.calculateRealOwnersSharesAlgo(
            investorGraph,
            rootInvestors,
        );

        const result: ICompanyRealOwners[] = companyInvestors
            .filter(
                (investor) =>
                    realOwners.hasOwnProperty(investor.code) &&
                    investor.type === 'person',
            )
            .map((investor) => {
                return {
                    name: investor.name,
                    code: investor.code,
                    percentage: realOwners[investor.code],
                    file: investor.files[0],
                };
            })
            .filter(
                (investor) =>
                    investor.percentage >= (client?.minSearchPercentage ?? 0),
            );

        return new CustomResponse(httpCodes.OK, result, undefined);
    } catch (error) {
        return handleError(error) as CustomResponse<
            ICompanyRealOwners[] | undefined
        >;
    }
};
