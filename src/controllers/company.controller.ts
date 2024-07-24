import type { Request, Response } from 'express';

import {
    createCompanyService,
    updateCompanyService,
    getCompanyByIdService,
    getCompaniesService,
    getCompaniesByClientIdService,
    deleteCompanyService,
} from '../services/company.service';

import * as strValidators from '../utils/strValidators';
import * as numValidators from '../utils/numValidators';

import httpCodes from '../constants/httpCodes';
import invalidCodes from '../constants/invalidCodes';

export const createCompanyController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { name, code, clientId } = req.body;

    if (
        !strValidators.isString(name) ||
        !strValidators.isString(code) ||
        !numValidators.isPositiveInteger(clientId)
    ) {
        return res
            .status(httpCodes.BAD_REQUEST)
            .send(invalidCodes.INVALID_DATA);
    }

    const response = await createCompanyService({
        name,
        code,
        clientId,
    });

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};

export const updateCompanyController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { id } = req.params;
    const { name, code, clientId } = req.body;

    if (!numValidators.isPositiveInteger(Number(id))) {
        return res.status(httpCodes.BAD_REQUEST).send(invalidCodes.INVALID_ID);
    }

    const response = await updateCompanyService({
        id: Number(id),
        name,
        code,
        clientId,
    });

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};

export const getCompanyByIdController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { id } = req.params;

    if (!numValidators.isPositiveInteger(Number(id))) {
        return res.status(httpCodes.BAD_REQUEST).send(invalidCodes.INVALID_ID);
    }

    const response = await getCompanyByIdService(Number(id));

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};

export const getCompaniesController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const response = await getCompaniesService();

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};

export const getCompaniesByClientIdController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { id } = req.params;

    if (!numValidators.isPositiveInteger(Number(id))) {
        return res.status(httpCodes.BAD_REQUEST).send(invalidCodes.INVALID_ID);
    }

    const response = await getCompaniesByClientIdService(Number(id));

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};

export const deleteCompanyController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { id } = req.params;

    if (!numValidators.isPositiveInteger(Number(id))) {
        return res.status(httpCodes.BAD_REQUEST).send(invalidCodes.INVALID_ID);
    }

    const response = await deleteCompanyService(Number(id));

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};
