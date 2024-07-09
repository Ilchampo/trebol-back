import type { Request, Response } from 'express';

import * as service from '../services/client.service';
import * as numValidators from '../utils/numValidators';

import httpCodes from '../constants/httpCodes';

const MAX_LEVELS_PER_CLIENT = 10 as const;
const MAX_PERCENT_PER_CLIENT = 100 as const;

export const createClientController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { name, logoUrl, minSearchPercentage, maxInvestorLevels } = req.body;

    if (
        !name ||
        !numValidators.numberInRange(
            1,
            MAX_PERCENT_PER_CLIENT,
            minSearchPercentage,
        ) ||
        !numValidators.numberInRange(
            0,
            MAX_LEVELS_PER_CLIENT,
            maxInvestorLevels,
        )
    ) {
        return res.status(httpCodes.BAD_REQUEST).send('Invalid client data');
    }

    const response = await service.createClientService({
        name,
        logoUrl,
        minSearchPercentage,
        maxInvestorLevels,
    });

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};

export const getClientByIdController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const clientId = req.query.id;

    if (!clientId || !numValidators.isValueNumber(clientId as string)) {
        return res.status(httpCodes.BAD_REQUEST).send('Invalid client id');
    }

    const response = await service.getClientByIdService(
        parseInt(clientId as string),
    );

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};

export const getAllClientsController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const response = await service.getAllClientsService();

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};

export const updateClientByIdController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { name, logoUrl, minSearchPercentage, maxInvestorLevels } = req.body;
    const clientId = req.query.id;

    if (!clientId || !numValidators.isValueNumber(clientId as string)) {
        return res.status(httpCodes.BAD_REQUEST).send('Invalid client id');
    }

    if (
        !numValidators.numberInRange(
            1,
            MAX_PERCENT_PER_CLIENT,
            minSearchPercentage,
        ) ||
        !numValidators.numberInRange(
            0,
            MAX_LEVELS_PER_CLIENT,
            maxInvestorLevels,
        )
    ) {
        return res.status(httpCodes.BAD_REQUEST).send('Invalid client data');
    }

    const response = await service.updateClientByIdService({
        clientId: parseInt(clientId as string),
        name,
        logoUrl,
        minSearchPercentage,
        maxInvestorLevels,
    });

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};

export const deleteClientByIdController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const clientId = req.query.id;

    if (!clientId || !numValidators.isValueNumber(clientId as string)) {
        return res.status(httpCodes.BAD_REQUEST).send('Invalid client id');
    }

    const response = await service.deleteClientByIdService(
        parseInt(clientId as string),
    );

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};
