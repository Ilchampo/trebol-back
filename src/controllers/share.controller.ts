import type { Request, Response } from 'express';

import * as service from '../services/share.service';
import * as numValidators from '../utils/numValidators';

import httpCodes from '../constants/httpCodes';
import invalidCodes from '../constants/invalidCodes';

export const createShareController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { companyId, investorId, sharePercentage, level } = req.body;

    if (
        !numValidators.isPositiveInteger(companyId) ||
        !numValidators.isPositiveInteger(investorId) ||
        !numValidators.numberInRange(0, 100, sharePercentage) ||
        !numValidators.isPositiveInteger(level)
    ) {
        return res
            .status(httpCodes.BAD_REQUEST)
            .send(invalidCodes.INVALID_DATA);
    }

    const response = await service.createShareService({
        companyId,
        investorId,
        sharePercentage,
        level,
    });

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};

export const getSharesController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const response = await service.getSharesService();

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};

export const getShareByIdController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { id } = req.query;

    if (!numValidators.isPositiveInteger(Number(id))) {
        return res.status(httpCodes.BAD_REQUEST).send(invalidCodes.INVALID_ID);
    }

    const response = await service.getShareByIdService(Number(id));

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};

export const updateShareController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { id } = req.query;
    const { companyId, investorId, sharePercentage, level } = req.body;

    if (
        !numValidators.isPositiveInteger(Number(id)) ||
        (companyId && !numValidators.isPositiveInteger(companyId)) ||
        (investorId && !numValidators.isPositiveInteger(investorId)) ||
        (sharePercentage &&
            !numValidators.numberInRange(0, 100, sharePercentage)) ||
        (level && !numValidators.isPositiveInteger(level))
    ) {
        return res
            .status(httpCodes.BAD_REQUEST)
            .send(invalidCodes.INVALID_DATA);
    }

    const response = await service.updateShareService(Number(id), {
        companyId,
        investorId,
        sharePercentage,
        level,
    });

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};

export const deleteShareController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { id } = req.query;

    if (!numValidators.isPositiveInteger(Number(id))) {
        return res.status(httpCodes.BAD_REQUEST).send(invalidCodes.INVALID_ID);
    }

    const response = await service.deleteShareService(Number(id));

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};
