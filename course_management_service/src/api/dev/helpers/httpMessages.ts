import { HttpError } from "../interfaces/APIResponseError";

export enum HttpStatus {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}
  
export enum HttpMessage {
    OK = "OK",
    CREATED = "Created",
    ACCEPTED = "Accepted",
    NO_CONTENT = "No Content",
    BAD_REQUEST = "Bad Request",
    UNAUTHORIZED = "Unauthorized",
    FORBIDDEN = "Forbidden",
    NOT_FOUND = "Not Found",
    INTERNAL_SERVER_ERROR = "Internal Server Error",
}
  
export enum HttpErrorType {
    RESOURCE_NOT_FOUND = "RESOURCE_NOT_FOUND",
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
    // Ajoute d'autres erreurs si nécessaire
}
  
export const HttpStatusMessages: Record<HttpErrorType, HttpError> = {
    [HttpErrorType.RESOURCE_NOT_FOUND]: {
      code: HttpStatus.NOT_FOUND,
      message: HttpMessage.NOT_FOUND,
    },
    [HttpErrorType.INTERNAL_SERVER_ERROR]: {
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: HttpMessage.INTERNAL_SERVER_ERROR,
    },
    // Ajoute d'autres erreurs si nécessaire
};
// Exemple d'utilisation
  