// Note: Our custom error extends from Error, so we can throw this error as an exception.

export class APIRexponseError extends Error {
    message!: string;
    status!: number;
    additionalInfo!: any;

    constructor(message: string, status: number = 500, additionalInfo: any = undefined) {
        super(message);
        this.message = message;
        this.status = status;
        this.additionalInfo = additionalInfo;
    }
};
