import type {
    IClient,
    ICreateClientArgs,
    IUpdateClientArgs,
} from '../interfaces/client.interface';

import { handleError } from '../utils/handleError';

import prisma from '../database';
import CustomResponse from '../models/customResponse.model';
import httpCodes from '../constants/httpCodes';

export const createClientService = async (
    args: ICreateClientArgs,
): Promise<CustomResponse<IClient>> => {
    const { name, logoUrl, minSearchPercentage, maxInvestorLevels } = args;

    try {
        const response = await prisma.client.create({
            data: {
                name,
                logoUrl,
                minimumSearchPercentage: minSearchPercentage,
                maxInvestorLevels: maxInvestorLevels,
            },
        });

        return new CustomResponse(httpCodes.OK, response, undefined);
    } catch (error) {
        return handleError(error) as CustomResponse<IClient>;
    }
};

export const getClientByIdService = async (
    clientId: number,
): Promise<CustomResponse<IClient>> => {
    try {
        const response = await prisma.client.findUnique({
            where: {
                clientId,
            },
        });

        return new CustomResponse(httpCodes.OK, response, undefined);
    } catch (error) {
        return handleError(error) as CustomResponse<IClient>;
    }
};

export const getAllClientsService = async (
    limit?: number,
): Promise<CustomResponse<IClient[]>> => {
    try {
        const response = await prisma.client.findMany({
            take: limit,
            orderBy: {
                name: 'asc',
            },
        });

        return new CustomResponse(httpCodes.OK, response, undefined);
    } catch (error) {
        return handleError(error) as CustomResponse<IClient[]>;
    }
};

export const updateClientByIdService = async (
    args: IUpdateClientArgs,
): Promise<CustomResponse<IClient>> => {
    const { clientId, name, logoUrl, minSearchPercentage, maxInvestorLevels } =
        args;

    try {
        const response = await prisma.client.update({
            where: {
                clientId,
            },
            data: {
                name,
                logoUrl,
                minimumSearchPercentage: minSearchPercentage,
                maxInvestorLevels,
            },
        });

        return new CustomResponse(httpCodes.OK, response, undefined);
    } catch (error) {
        return handleError(error) as CustomResponse<IClient>;
    }
};

export const deleteClientByIdService = async (
    clientId: number,
): Promise<CustomResponse<IClient>> => {
    try {
        const response = await prisma.client.delete({
            where: {
                clientId,
            },
        });

        return new CustomResponse(httpCodes.OK, response, undefined);
    } catch (error) {
        return handleError(error) as CustomResponse<IClient>;
    }
};
