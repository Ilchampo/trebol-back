import httpCodes from '../constants/httpCodes';
import CustomResponse from '../models/customResponse.model';

export const handleError = (error: unknown): CustomResponse<unknown> => {
    const response = new CustomResponse();
    const errorMessage =
        error instanceof Error ? error.message : 'An unexpected error occurred';
    response.setData(httpCodes.INTERNAL_SERVER_ERROR, undefined, errorMessage);
    return response;
};
