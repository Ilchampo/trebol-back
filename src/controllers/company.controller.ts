import type { Request, Response } from 'express';

import * as service from '../services/company.service';
import * as numValidators from '../utils/numValidators';
import * as strValidators from '../utils/strValidators';

import httpCodes from '../constants/httpCodes';
import invalidCodes from '../constants/invalidCodes';

export const createCompanyController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { clientId, name, code } = req.body;

    if (
        !numValidators.isPositiveInteger(clientId) ||
        !strValidators.isString(name) ||
        !strValidators.isString(code)
    ) {
        return res
            .status(httpCodes.BAD_REQUEST)
            .send(invalidCodes.INVALID_DATA);
    }

    const response = await service.createCompanyService({
        clientId,
        name,
        code,
    });

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};

export const getCompaniesController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const response = await service.getCompaniesService();

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};

export const getCompanyByIdController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { id } = req.query;

    if (!numValidators.isPositiveInteger(Number(id))) {
        return res.status(httpCodes.BAD_REQUEST).send(invalidCodes.INVALID_ID);
    }

    const response = await service.getCompanyByIdService(Number(id));

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};

export const updateCompanyController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { id } = req.query;
    const { clientId, name, code } = req.body;

    if (
        !numValidators.isPositiveInteger(Number(id)) ||
        (clientId && !numValidators.isPositiveInteger(clientId)) ||
        (name && !strValidators.isString(name)) ||
        (code && !strValidators.isString(code))
    ) {
        return res
            .status(httpCodes.BAD_REQUEST)
            .send(invalidCodes.INVALID_DATA);
    }

    const response = await service.updateCompanyService(Number(id), {
        clientId,
        name,
        code,
    });

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};

export const deleteCompanyController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { id } = req.query;

    if (!numValidators.isPositiveInteger(Number(id))) {
        return res.status(httpCodes.BAD_REQUEST).send(invalidCodes.INVALID_ID);
    }

    const response = await service.deleteCompanyService(Number(id));

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};
