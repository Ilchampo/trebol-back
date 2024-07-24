import type { Request, Response } from 'express';

import {
    createInvestorService,
    updateInvestorService,
    getInvestorByIdService,
    getInvestorsService,
    deleteInvestorService,
    saveCompanyInvestorsService,
    getCompanyRealOwners,
} from '../services/investor.service';

import * as numValidators from '../utils/numValidators';
import httpCodes from '../constants/httpCodes';
import invalidCodes from '../constants/invalidCodes';

export const createInvestorController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { companyId, sharePercentage, name, code, type, parentInvestorId } =
        req.body;

    if (
        !numValidators.isPositiveInteger(companyId) ||
        !numValidators.numberInRange(0, 100, sharePercentage) ||
        typeof name !== 'string' ||
        typeof code !== 'string' ||
        (type !== 'person' && type !== 'company')
    ) {
        return res
            .status(httpCodes.BAD_REQUEST)
            .send(invalidCodes.INVALID_DATA);
    }

    const response = await createInvestorService({
        companyId,
        sharePercentage,
        name,
        code,
        type,
        parentInvestorId,
    });

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};

export const updateInvestorController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { id } = req.params;
    const { companyId, sharePercentage, name, code, type, parentInvestorId } =
        req.body;

    if (!numValidators.isPositiveInteger(Number(id))) {
        return res.status(httpCodes.BAD_REQUEST).send(invalidCodes.INVALID_ID);
    }

    const response = await updateInvestorService({
        id: Number(id),
        companyId,
        sharePercentage,
        name,
        code,
        type,
        parentInvestorId,
    });

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};

export const getInvestorByIdController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { id } = req.params;

    if (!numValidators.isPositiveInteger(Number(id))) {
        return res.status(httpCodes.BAD_REQUEST).send(invalidCodes.INVALID_ID);
    }

    const response = await getInvestorByIdService(Number(id));

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};

export const getInvestorsController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const response = await getInvestorsService();

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};

export const deleteInvestorController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { id } = req.params;

    if (!numValidators.isPositiveInteger(Number(id))) {
        return res.status(httpCodes.BAD_REQUEST).send(invalidCodes.INVALID_ID);
    }

    const response = await deleteInvestorService(Number(id));

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};

export const saveCompanyInvestorsController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { clientId } = req.params;
    const { company, investors } = req.body;

    if (!numValidators.isPositiveInteger(Number(clientId))) {
        return res.status(httpCodes.BAD_REQUEST).send(invalidCodes.INVALID_ID);
    }

    const response = await saveCompanyInvestorsService(
        Number(clientId),
        company,
        investors,
    );

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};

export const getCompanyRealOwnersController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { companyId } = req.params;

    if (!numValidators.isPositiveInteger(Number(companyId))) {
        return res.status(httpCodes.BAD_REQUEST).send(invalidCodes.INVALID_ID);
    }

    const response = await getCompanyRealOwners(Number(companyId));

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};
