import type { Request, Response } from 'express';

import * as service from '../services/investor.service';
import * as numValidators from '../utils/numValidators';
import * as strValidators from '../utils/strValidators';

import httpCodes from '../constants/httpCodes';
import invalidCodes from '../constants/invalidCodes';

export const createInvestorController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { name, type, code } = req.body;

    if (
        !strValidators.isString(name) ||
        !strValidators.isString(code) ||
        !['Person', 'Company'].includes(type)
    ) {
        return res
            .status(httpCodes.BAD_REQUEST)
            .send(invalidCodes.INVALID_DATA);
    }

    const response = await service.createInvestorService({
        name,
        type,
        code,
    });

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};

export const getInvestorsController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const response = await service.getInvestorsService();

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};

export const getInvestorByIdController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { id } = req.query;

    if (!numValidators.isPositiveInteger(Number(id))) {
        return res.status(httpCodes.BAD_REQUEST).send(invalidCodes.INVALID_ID);
    }

    const response = await service.getInvestorByIdService(Number(id));

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};

export const updateInvestorController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { id } = req.query;
    const { name, type, code } = req.body;

    if (
        !numValidators.isPositiveInteger(Number(id)) ||
        (name && !strValidators.isString(name)) ||
        (code && !strValidators.isString(code)) ||
        (type && !['Person', 'Company'].includes(type))
    ) {
        return res
            .status(httpCodes.BAD_REQUEST)
            .send(invalidCodes.INVALID_DATA);
    }

    const response = await service.updateInvestorService(Number(id), {
        name,
        type,
        code,
    });

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};

export const deleteInvestorController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { id } = req.query;

    if (!numValidators.isPositiveInteger(Number(id))) {
        return res.status(httpCodes.BAD_REQUEST).send(invalidCodes.INVALID_ID);
    }

    const response = await service.deleteInvestorService(Number(id));

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};
