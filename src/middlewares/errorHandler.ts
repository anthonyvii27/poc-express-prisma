import { NextFunction, Request, Response } from 'express';

import { env } from "@/env";
import { Logger } from "@/infra/logger";

export class HttpException extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

export class ErrorHandlerMiddleware {
    public static handler(err: HttpException, req: Request, res: Response, next: NextFunction) {
        const logger = Logger.getInstance();

        const status = err.status || 500;
        const message = status !== 500 ? err.message : "Something went wrong";

        const errContext = {
            status,
            ip: req.ip,
            error: err,
            errMessage: message,
            queryString: req.query,
            headers: req.rawHeaders,
            body: JSON.stringify(req.body),
            baseUrl: req.url,
            stack: env.NODE_ENV === "development" ? err.stack : {}
        };

        logger.error("errorHandler", { ...errContext });

        return res.status(status).json({
            status,
            message,
        });
    }
}