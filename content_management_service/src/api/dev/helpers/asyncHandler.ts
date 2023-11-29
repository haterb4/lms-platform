import { NextFunction, Request, Response } from 'express';

type IRPINPUT =  any
type IRQINPUT = any
type IRBINPUT = any
/**
 * Async handler to wrap the API routes, allowing for async error handling.
 * @param fn Function to call for the API endpoint
 * @returns Promise with a catch statement
 */
export const asyncHandler = (fn: (req: Request<IRPINPUT, IRQINPUT, IRBINPUT>, res: Response, next: NextFunction) => void) => (req: Request<IRPINPUT, IRQINPUT, IRBINPUT>, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
};