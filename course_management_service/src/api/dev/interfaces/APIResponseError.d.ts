export interface IAPIResponseError {
    message: string;
    additionalInfo?: string;
}

export interface HttpError {
    code: HttpStatus;
    message: HttpMessage;
}