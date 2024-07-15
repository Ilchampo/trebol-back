import type {
    IDocument,
    ICreateDocumentArgs,
    IUpdateDocumentArgs,
} from '../interfaces/document.interface';

import { handleError } from '../utils/handleError';

import prisma from '../database';
import CustomResponse from '../models/customResponse.model';
import httpCodes from '../constants/httpCodes';
import invalidCodes from '../constants/invalidCodes';

export const createDocumentService = async (
    args: ICreateDocumentArgs,
): Promise<CustomResponse<IDocument>> => {
    const { shareId, fileName, fileType, fileData } = args;

    try {
        const response = await prisma.document.create({
            data: {
                shareId,
                fileName,
                fileType,
                fileData,
            },
        });

        return new CustomResponse(httpCodes.OK, response, undefined);
    } catch (error) {
        return handleError(error) as CustomResponse<IDocument>;
    }
};

export const getDocumentsService = async (): Promise<
    CustomResponse<IDocument[]>
> => {
    try {
        const response = await prisma.document.findMany();
        return new CustomResponse(httpCodes.OK, response, undefined);
    } catch (error) {
        return handleError(error) as CustomResponse<IDocument[]>;
    }
};

export const getDocumentByIdService = async (
    id: number,
): Promise<CustomResponse<IDocument | undefined>> => {
    try {
        const response = await prisma.document.findUnique({
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
        return handleError(error) as CustomResponse<IDocument>;
    }
};

export const updateDocumentService = async (
    id: number,
    args: IUpdateDocumentArgs,
): Promise<CustomResponse<IDocument | undefined>> => {
    const { shareId, fileName, fileType, fileData } = args;

    try {
        const response = await prisma.document.update({
            where: { id },
            data: {
                shareId,
                fileName,
                fileType,
                fileData,
            },
        });

        return new CustomResponse(httpCodes.OK, response, undefined);
    } catch (error) {
        return handleError(error) as CustomResponse<IDocument>;
    }
};

export const deleteDocumentService = async (
    id: number,
): Promise<CustomResponse<IDocument | undefined>> => {
    try {
        const response = await prisma.document.delete({
            where: { id },
        });

        return new CustomResponse(httpCodes.OK, response, undefined);
    } catch (error) {
        return handleError(error) as CustomResponse<IDocument>;
    }
};
