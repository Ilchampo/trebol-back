import type {
    IFile,
    ICreateFileArgs,
    IUpdateFileArgs,
} from '../interfaces/file.interface';

import { isFileTypeValid } from '../utils/fileValidators';
import { handleError } from '../utils/handleError';

import CustomResponse from '../models/customResponse.model';
import httpCodes from '../constants/httpCodes';
import invalidCodes from '../constants/invalidCodes';
import prisma from '../database';

export const createFileService = async (
    args: ICreateFileArgs,
): Promise<CustomResponse<IFile | undefined>> => {
    const { investorId, fileType, fileData } = args;

    if (!isFileTypeValid(fileType)) {
        return new CustomResponse(
            httpCodes.BAD_REQUEST,
            undefined,
            invalidCodes.INVALID_TYPE,
        );
    }

    try {
        const response = await prisma.file.create({
            data: {
                investorId,
                fileType,
                fileData,
            },
        });

        return new CustomResponse(httpCodes.OK, response, undefined);
    } catch (error) {
        return handleError(error) as CustomResponse<IFile>;
    }
};

export const updateFileService = async (
    args: IUpdateFileArgs,
): Promise<CustomResponse<IFile | undefined>> => {
    const { id, investorId, fileType, fileData } = args;

    if (fileType && !isFileTypeValid(fileType)) {
        return new CustomResponse(
            httpCodes.BAD_REQUEST,
            undefined,
            invalidCodes.INVALID_TYPE,
        );
    }

    try {
        const response = await prisma.file.update({
            where: { id },
            data: {
                investorId,
                fileType,
                fileData,
            },
        });

        return new CustomResponse(httpCodes.OK, response, null);
    } catch (error) {
        return handleError(error) as CustomResponse<IFile>;
    }
};

export const getFileByIdService = async (
    id: number,
): Promise<CustomResponse<IFile | undefined>> => {
    try {
        const response = await prisma.file.findUnique({
            where: { id },
        });

        if (!response) {
            return new CustomResponse(
                httpCodes.NOT_FOUND,
                undefined,
                invalidCodes.INVALID_NOT_FOUND,
            );
        }

        return new CustomResponse(httpCodes.OK, response, undefined);
    } catch (error) {
        return handleError(error) as CustomResponse<any>;
    }
};

export const getFilesService = async (): Promise<CustomResponse<IFile[]>> => {
    try {
        const response = await prisma.file.findMany();
        return new CustomResponse(httpCodes.OK, response, undefined);
    } catch (error) {
        return handleError(error) as CustomResponse<IFile[]>;
    }
};

export const deleteFileService = async (
    id: number,
): Promise<CustomResponse<IFile>> => {
    try {
        const response = await prisma.file.delete({
            where: { id },
        });

        return new CustomResponse(httpCodes.OK, response, undefined);
    } catch (error) {
        return handleError(error) as CustomResponse<IFile>;
    }
};
