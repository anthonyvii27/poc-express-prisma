import winston from "winston";
import { Request } from "express";

import { Logger } from "@/infra/logger";

export class Controller {
    protected readonly logger: winston.Logger;

    constructor() {
        this.logger = Logger.getInstance();
    }

    public logActivity(req: Request, controllerName: string) {
        const context = {
            controllerName,
            queryString: req.query,
            body: JSON.stringify(req.body),
            baseURL: req.url,
        };

        this.logger.info(`New request to ${controllerName}`, { ...context });
    }
}