import { Request, Response, NextFunction } from 'express';
import { IAPIResponseError } from '../interfaces/APIResponseError';
import { APIRexponseError } from '../../../config/CustomError';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error(err);
    if (!(err instanceof APIRexponseError)) {
        res.status(500).send(
            JSON.stringify({
                message: 'Server error, please try again later'
            })
        );
    } else {
        const customError = err as APIRexponseError;
        let response = {
            message: customError.message
        } as IAPIResponseError;
        // Check if there is more info to return.
        if (customError.additionalInfo) response.additionalInfo = customError.additionalInfo;
        res.status(customError.status).type('json').send(JSON.stringify(response));
    }
}