import winston from "winston";

export abstract class Logger {
    private static logger: winston.Logger;

    private constructor() {}

    public static getInstance(): winston.Logger {
        if (!Logger.logger) {
            Logger.logger = winston.createLogger({
                level: "info",
                format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
                transports: [new winston.transports.Console()],
            });
        }

        return Logger.logger;
    }
}