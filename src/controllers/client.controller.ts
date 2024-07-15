import type { Request, Response } from 'express';

import * as service from '../services/client.service';
import * as numValidators from '../utils/numValidators';
import * as strValidators from '../utils/strValidators';

import httpCodes from '../constants/httpCodes';
import invalidCodes from '../constants/invalidCodes';

const MAX_LEVELS_PER_CLIENT = 10 as const;
const MAX_PERCENT_PER_CLIENT = 100 as const;

export const createClientController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { name, logoUrl, minimumSearchPercentage, maxInvestorsLevels } =
        req.body;

    if (
        !strValidators.isString(name) ||
        !numValidators.numberInRange(
            0,
            MAX_PERCENT_PER_CLIENT,
            minimumSearchPercentage,
        ) ||
        !numValidators.numberInRange(
            0,
            MAX_LEVELS_PER_CLIENT,
            maxInvestorsLevels,
        )
    ) {
        return res
            .status(httpCodes.BAD_REQUEST)
            .send(invalidCodes.INVALID_DATA);
    }

    const response = await service.createClientService({
        name,
        logoUrl,
        minimumSearchPercentage,
        maxInvestorsLevels,
    });

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};

export const getClientsController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const response = await service.getClientsService();

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};

export const getClientByIdController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { id } = req.query;

    if (!numValidators.isPositiveInteger(Number(id))) {
        return res.status(httpCodes.BAD_REQUEST).send(invalidCodes.INVALID_ID);
    }

    const response = await service.getClientByIdService(Number(id));

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};

export const updateClientController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { id } = req.query;
    const { name, logoUrl, minimumSearchPercentage, maxInvestorsLevels } =
        req.body;

    if (
        !numValidators.isPositiveInteger(Number(id)) ||
        (name && !strValidators.isString(name)) ||
        (minimumSearchPercentage &&
            !numValidators.numberInRange(
                0,
                MAX_PERCENT_PER_CLIENT,
                minimumSearchPercentage,
            )) ||
        (maxInvestorsLevels &&
            !numValidators.numberInRange(
                0,
                MAX_LEVELS_PER_CLIENT,
                maxInvestorsLevels,
            ))
    ) {
        return res
            .status(httpCodes.BAD_REQUEST)
            .send(invalidCodes.INVALID_DATA);
    }

    const response = await service.updateClientService(Number(id), {
        name,
        logoUrl,
        minimumSearchPercentage,
        maxInvestorsLevels,
    });

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};

export const deleteClientController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { id } = req.query;

    if (!numValidators.isPositiveInteger(Number(id))) {
        return res.status(httpCodes.BAD_REQUEST).send(invalidCodes.INVALID_ID);
    }

    const response = await service.deleteClientService(Number(id));

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};
