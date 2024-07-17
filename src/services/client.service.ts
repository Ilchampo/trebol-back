import type {
    IClient,
    ICreateClientArgs,
    IUpdateClientArgs,
} from '../interfaces/client.interface';

import { handleError } from '../utils/handleError';

import CustomResponse from '../models/customResponse.model';
import httpCodes from '../constants/httpCodes';
import invalidCodes from '../constants/invalidCodes';
import prisma from '../database';

export const createClientService = async (
    args: ICreateClientArgs,
): Promise<CustomResponse<IClient>> => {
    const { name, logoUrl, maxInvestorLevels, minSearchPercentage } = args;

    try {
        const response = await prisma.client.create({
            data: {
                name,
                logoUrl,
                maxInvestorLevels,
                minSearchPercentage,
            },
        });

        return new CustomResponse(httpCodes.OK, response, undefined);
    } catch (error) {
        return handleError(error) as CustomResponse<IClient>;
    }
};

export const updateClientService = async (
    args: IUpdateClientArgs,
): Promise<CustomResponse<IClient>> => {
    const { id, name, logoUrl, maxInvestorLevels, minSearchPercentage } = args;

    try {
        const response = await prisma.client.update({
            where: { id },
            data: {
                name,
                logoUrl,
                maxInvestorLevels,
                minSearchPercentage,
            },
        });

        return new CustomResponse(httpCodes.OK, response, null);
    } catch (error) {
        return handleError(error) as CustomResponse<IClient>;
    }
};

export const getClientByIdService = async (
    id: number,
): Promise<CustomResponse<IClient | undefined>> => {
    try {
        const response = await prisma.client.findUnique({
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

export const getClientsService = async (): Promise<
    CustomResponse<IClient[]>
> => {
    try {
        const response = await prisma.client.findMany();
        return new CustomResponse(httpCodes.OK, response, undefined);
    } catch (error) {
        return handleError(error) as CustomResponse<IClient[]>;
    }
};

export const deleteClientService = async (
    id: number,
): Promise<CustomResponse<IClient>> => {
    try {
        const response = await prisma.client.delete({
            where: { id },
        });

        return new CustomResponse(httpCodes.OK, response, undefined);
    } catch (error) {
        return handleError(error) as CustomResponse<IClient>;
    }
};
