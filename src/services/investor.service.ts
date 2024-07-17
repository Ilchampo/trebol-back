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
    companyId: number,
    investors: ICreateInvestorArgs[],
): Promise<CustomResponse<IInvestor[] | undefined>> => {
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

        await prisma.investor.deleteMany({
            where: { companyId },
        });

        const createdInvestors = await prisma.$transaction(
            investors.map((investor) =>
                prisma.investor.create({
                    data: {
                        companyId,
                        sharePercentage: investor.sharePercentage,
                        name: investor.name,
                        code: investor.code,
                        type: investor.type,
                        parentInvestorId: investor.parentInvestorId,
                    },
                }),
            ),
        );

        return new CustomResponse(httpCodes.OK, createdInvestors, undefined);
    } catch (error) {
        return handleError(error) as CustomResponse<IInvestor[]>;
    }
};

export const getCompanyRealOwners = async (
    companyId: number,
): Promise<CustomResponse<Record<string, number> | undefined>> => {
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

        const companyInvestors = await prisma.investor.findMany({
            where: { companyId: company.id },
            orderBy: { id: 'asc' },
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

        return new CustomResponse(httpCodes.OK, realOwners, undefined);
    } catch (error) {
        return handleError(error) as CustomResponse<
            Record<string, number> | undefined
        >;
    }
};
