import type { Request, Response } from 'express';

import * as service from '../services/document.service';
import * as numValidators from '../utils/numValidators';
import * as strValidators from '../utils/strValidators';

import httpCodes from '../constants/httpCodes';
import invalidCodes from '../constants/invalidCodes';

export const createDocumentController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { shareId, fileName, fileType, fileData } = req.body;

    if (
        !numValidators.isPositiveInteger(shareId) ||
        !strValidators.isString(fileName) ||
        !['PDF', 'PNG'].includes(fileType) ||
        !Buffer.isBuffer(fileData)
    ) {
        return res
            .status(httpCodes.BAD_REQUEST)
            .send(invalidCodes.INVALID_DATA);
    }

    const response = await service.createDocumentService({
        shareId,
        fileName,
        fileType,
        fileData,
    });

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};

export const getDocumentsController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const response = await service.getDocumentsService();

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};

export const getDocumentByIdController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { id } = req.query;

    if (!numValidators.isPositiveInteger(Number(id))) {
        return res.status(httpCodes.BAD_REQUEST).send(invalidCodes.INVALID_ID);
    }

    const response = await service.getDocumentByIdService(Number(id));

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};

export const updateDocumentController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { id } = req.query;
    const { shareId, fileName, fileType, fileData } = req.body;

    if (
        !numValidators.isPositiveInteger(Number(id)) ||
        (shareId && !numValidators.isPositiveInteger(shareId)) ||
        (fileName && !strValidators.isString(fileName)) ||
        (fileType && !['PDF', 'PNG'].includes(fileType)) ||
        (fileData && !Buffer.isBuffer(fileData))
    ) {
        return res
            .status(httpCodes.BAD_REQUEST)
            .send(invalidCodes.INVALID_DATA);
    }

    const response = await service.updateDocumentService(Number(id), {
        shareId,
        fileName,
        fileType,
        fileData,
    });

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};

export const deleteDocumentController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { id } = req.query;

    if (!numValidators.isPositiveInteger(Number(id))) {
        return res.status(httpCodes.BAD_REQUEST).send(invalidCodes.INVALID_ID);
    }

    const response = await service.deleteDocumentService(Number(id));

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};
