import type {
    ICompany,
    ICreateCompanyArgs,
    IUpdateCompanyArgs,
} from '../interfaces/company.interface';

import { handleError } from '../utils/handleError';

import CustomResponse from '../models/customResponse.model';
import httpCodes from '../constants/httpCodes';
import invalidCodes from '../constants/invalidCodes';
import prisma from '../database';

export const createCompanyService = async (
    args: ICreateCompanyArgs,
): Promise<CustomResponse<ICompany>> => {
    const { name, code, clientId } = args;

    try {
        const response = await prisma.company.create({
            data: {
                name,
                code,
                clientId,
            },
        });

        return new CustomResponse(httpCodes.OK, response, undefined);
    } catch (error) {
        return handleError(error) as CustomResponse<ICompany>;
    }
};

export const updateCompanyService = async (
    args: IUpdateCompanyArgs,
): Promise<CustomResponse<ICompany>> => {
    const { id, name, code, clientId } = args;

    try {
        const response = await prisma.company.update({
            where: { id },
            data: {
                name,
                code,
                clientId,
            },
        });

        return new CustomResponse(httpCodes.OK, response, null);
    } catch (error) {
        return handleError(error) as CustomResponse<ICompany>;
    }
};

export const getCompanyByIdService = async (
    id: number,
): Promise<CustomResponse<ICompany | undefined>> => {
    try {
        const response = await prisma.company.findUnique({
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

export const getCompaniesService = async (): Promise<
    CustomResponse<ICompany[]>
> => {
    try {
        const response = await prisma.company.findMany();
        return new CustomResponse(httpCodes.OK, response, undefined);
    } catch (error) {
        return handleError(error) as CustomResponse<ICompany[]>;
    }
};

export const getCompaniesByClientIdService = async (
    clientId: number,
): Promise<CustomResponse<ICompany[]>> => {
    try {
        const response = await prisma.company.findMany({
            where: {
                clientId,
            },
            orderBy: {
                name: 'asc',
            },
        });
        return new CustomResponse(httpCodes.OK, response, undefined);
    } catch (error) {
        return handleError(error) as CustomResponse<ICompany[]>;
    }
};

export const deleteCompanyService = async (
    id: number,
): Promise<CustomResponse<ICompany>> => {
    try {
        const response = await prisma.company.delete({
            where: { id },
        });

        return new CustomResponse(httpCodes.OK, response, undefined);
    } catch (error) {
        return handleError(error) as CustomResponse<ICompany>;
    }
};
