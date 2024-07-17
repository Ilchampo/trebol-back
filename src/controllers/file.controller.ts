import type { Request, Response } from 'express';

import {
    createFileService,
    updateFileService,
    getFileByIdService,
    getFilesService,
    deleteFileService,
} from '../services/file.service';

import * as numValidators from '../utils/numValidators';
import * as fileValidators from '../utils/fileValidators';

import httpCodes from '../constants/httpCodes';
import invalidCodes from '../constants/invalidCodes';

export const createFileController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { investorId, fileType, fileData } = req.body;

    if (
        !numValidators.isPositiveInteger(investorId) ||
        !Buffer.isBuffer(fileData) ||
        !fileValidators.isFileTypeValid(fileType)
    ) {
        return res
            .status(httpCodes.BAD_REQUEST)
            .send(invalidCodes.INVALID_DATA);
    }

    const response = await createFileService({
        investorId,
        fileType,
        fileData,
    });

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};

export const updateFileController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { id } = req.params;
    const { investorId, fileType, fileData } = req.body;

    if (
        !numValidators.isPositiveInteger(Number(id)) ||
        !fileValidators.isFileTypeValid(fileType)
    ) {
        return res.status(httpCodes.BAD_REQUEST).send(invalidCodes.INVALID_ID);
    }

    const response = await updateFileService({
        id: Number(id),
        investorId,
        fileType,
        fileData,
    });

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};

export const getFileByIdController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { id } = req.params;

    if (!numValidators.isPositiveInteger(Number(id))) {
        return res.status(httpCodes.BAD_REQUEST).send(invalidCodes.INVALID_ID);
    }

    const response = await getFileByIdService(Number(id));

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};

export const getFilesController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const response = await getFilesService();

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};

export const deleteFileController = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { id } = req.params;

    if (!numValidators.isPositiveInteger(Number(id))) {
        return res.status(httpCodes.BAD_REQUEST).send(invalidCodes.INVALID_ID);
    }

    const response = await deleteFileService(Number(id));

    return res
        .status(response.getCode())
        .send(response.getData() ?? response.getError());
};
