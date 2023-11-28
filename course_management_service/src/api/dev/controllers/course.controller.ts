import { Request, Response } from "express";
import { HttpErrorType, HttpStatusMessages } from "../helpers/httpMessages";
import { HttpError } from "../interfaces/APIResponseError";

class CourseController {
    public async createUserSessionHandler(req: Request, res: Response){
        const resourceNotFoundError: HttpError = HttpStatusMessages[HttpErrorType.RESOURCE_NOT_FOUND];
    }
}

export default CourseController