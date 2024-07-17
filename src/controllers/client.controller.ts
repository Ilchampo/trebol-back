import type { Request, Response } from 'express';

import {
    createClientService,
    updateClientService,
    getClientByIdService,
    getClientsService,
    deleteClientService,
} from '../services/client.service';

import * as strValidators from '../utils/strValidators';
import * as numValidators from '../utils/numValidators';

import httpCodes from '../constants/httpCodes';
import invalidCodes from '../constants/invalidCodes';

const MAX_PERCENTAGE = 100 as const;
const MAX_LEVELS = 5 as const;
const MIN_VALUE = 0 as const;

export const createClientController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { name, logoUrl, maxInvestorLevels, minSearchPercentage } = req.body;

    if (
        !strValidators.isString(name) ||
        !numValidators.numberInRange(
            MIN_VALUE,
            MAX_PERCENTAGE,
            parseInt(minSearchPercentage),
        ) ||
        !numValidators.numberInRange(
            MIN_VALUE,
            MAX_LEVELS,
            parseInt(maxInvestorLevels),
        )
    ) {
        return res
            .status(httpCodes.BAD_REQUEST)
            .send(invalidCodes.INVALID_DATA);
    }

    const response = await createClientService({
        name,
        logoUrl,
        maxInvestorLevels,
        minSearchPercentage,
    });

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};

export const updateClientController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { id } = req.params;
    const { name, logoUrl, maxInvestorLevels, minSearchPercentage } = req.body;

    if (!numValidators.isPositiveInteger(Number(id))) {
        return res.status(httpCodes.BAD_REQUEST).send(invalidCodes.INVALID_ID);
    }

    const response = await updateClientService({
        id: Number(id),
        name,
        logoUrl,
        maxInvestorLevels,
        minSearchPercentage,
    });

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};

export const getClientByIdController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { id } = req.params;

    if (!numValidators.isPositiveInteger(Number(id))) {
        return res.status(httpCodes.BAD_REQUEST).send(invalidCodes.INVALID_ID);
    }

    const response = await getClientByIdService(Number(id));

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};

export const getClientsController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const response = await getClientsService();

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};

export const deleteClientController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { id } = req.params;

    if (!numValidators.isPositiveInteger(Number(id))) {
        return res.status(httpCodes.BAD_REQUEST).send(invalidCodes.INVALID_ID);
    }

    const response = await deleteClientService(Number(id));

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};
