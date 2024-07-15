import type {
    ICompany,
    ICreateCompanyArgs,
    IUpdateCompanyArgs,
} from '../interfaces/company.interface';

import { handleError } from '../utils/handleError';

import prisma from '../database';
import CustomResponse from '../models/customResponse.model';
import httpCodes from '../constants/httpCodes';
import invalidCodes from '../constants/invalidCodes';

export const createCompanyService = async (
    args: ICreateCompanyArgs,
): Promise<CustomResponse<ICompany>> => {
    const { clientId, name, code } = args;

    try {
        const response = await prisma.company.create({
            data: {
                clientId,
                name,
                code,
            },
        });

        return new CustomResponse(httpCodes.OK, response, undefined);
    } catch (error) {
        return handleError(error) as CustomResponse<ICompany>;
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
        return handleError(error) as CustomResponse<ICompany>;
    }
};

export const updateCompanyService = async (
    id: number,
    args: IUpdateCompanyArgs,
): Promise<CustomResponse<ICompany | undefined>> => {
    const { clientId, name, code } = args;

    try {
        const response = await prisma.company.update({
            where: { id },
            data: {
                clientId,
                name,
                code,
            },
        });

        return new CustomResponse(httpCodes.OK, response, undefined);
    } catch (error) {
        return handleError(error) as CustomResponse<ICompany>;
    }
};

export const deleteCompanyService = async (
    id: number,
): Promise<CustomResponse<ICompany | undefined>> => {
    try {
        const response = await prisma.company.delete({
            where: { id },
        });

        return new CustomResponse(httpCodes.OK, response, undefined);
    } catch (error) {
        return handleError(error) as CustomResponse<ICompany>;
    }
};
