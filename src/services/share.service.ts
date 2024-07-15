import type {
    IShare,
    ICreateShareArgs,
    IUpdateShareArgs,
} from '../interfaces/share.interface';

import { handleError } from '../utils/handleError';

import prisma from '../database';
import CustomResponse from '../models/customResponse.model';
import httpCodes from '../constants/httpCodes';
import invalidCodes from '../constants/invalidCodes';

export const createShareService = async (
    args: ICreateShareArgs,
): Promise<CustomResponse<IShare>> => {
    const { companyId, investorId, sharePercentage, level } = args;

    try {
        const response = await prisma.share.create({
            data: {
                companyId,
                investorId,
                sharePercentage,
                level,
            },
        });

        return new CustomResponse(httpCodes.OK, response, undefined);
    } catch (error) {
        return handleError(error) as CustomResponse<IShare>;
    }
};

export const getSharesService = async (): Promise<CustomResponse<IShare[]>> => {
    try {
        const response = await prisma.share.findMany();
        return new CustomResponse(httpCodes.OK, response, undefined);
    } catch (error) {
        return handleError(error) as CustomResponse<IShare[]>;
    }
};

export const getShareByIdService = async (
    id: number,
): Promise<CustomResponse<IShare | undefined>> => {
    try {
        const response = await prisma.share.findUnique({
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
        return handleError(error) as CustomResponse<IShare>;
    }
};

export const updateShareService = async (
    id: number,
    args: IUpdateShareArgs,
): Promise<CustomResponse<IShare | undefined>> => {
    const { companyId, investorId, sharePercentage, level } = args;

    try {
        const response = await prisma.share.update({
            where: { id },
            data: {
                companyId,
                investorId,
                sharePercentage,
                level,
            },
        });

        return new CustomResponse(httpCodes.OK, response, undefined);
    } catch (error) {
        return handleError(error) as CustomResponse<IShare>;
    }
};

export const deleteShareService = async (
    id: number,
): Promise<CustomResponse<IShare | undefined>> => {
    try {
        const response = await prisma.share.delete({
            where: { id },
        });

        return new CustomResponse(httpCodes.OK, response, undefined);
    } catch (error) {
        return handleError(error) as CustomResponse<IShare>;
    }
};
