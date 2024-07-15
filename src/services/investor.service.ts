import type {
    IInvestor,
    ICreateInvestorArgs,
    IUpdateInvestorArgs,
} from '../interfaces/investor.interface';

import { handleError } from '../utils/handleError';

import prisma from '../database';
import CustomResponse from '../models/customResponse.model';
import httpCodes from '../constants/httpCodes';
import invalidCodes from '../constants/invalidCodes';

export const createInvestorService = async (
    args: ICreateInvestorArgs,
): Promise<CustomResponse<IInvestor>> => {
    const { name, type, code } = args;

    try {
        const response = await prisma.investor.create({
            data: {
                name,
                type,
                code,
            },
        });

        return new CustomResponse(httpCodes.OK, response, undefined);
    } catch (error) {
        return handleError(error) as CustomResponse<IInvestor>;
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
        return handleError(error) as CustomResponse<IInvestor>;
    }
};

export const updateInvestorService = async (
    id: number,
    args: IUpdateInvestorArgs,
): Promise<CustomResponse<IInvestor | undefined>> => {
    const { name, type, code } = args;

    try {
        const response = await prisma.investor.update({
            where: { id },
            data: {
                name,
                type,
                code,
            },
        });

        return new CustomResponse(httpCodes.OK, response, undefined);
    } catch (error) {
        return handleError(error) as CustomResponse<IInvestor>;
    }
};

export const deleteInvestorService = async (
    id: number,
): Promise<CustomResponse<IInvestor | undefined>> => {
    try {
        const response = await prisma.investor.delete({
            where: { id },
        });

        return new CustomResponse(httpCodes.OK, response, undefined);
    } catch (error) {
        return handleError(error) as CustomResponse<IInvestor>;
    }
};
