import { NextFunction, Request, Response } from "express";
import winston from "winston";

export const logger = winston.createLogger({
	level: "info",
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.timestamp({format: "DD.MM.YYYY HH:mm:ss"}),
		winston.format.printf(info => `${info.timestamp}: ${info.level} - ${info.message}`)
	),
	transports:
      [new winston.transports.Console({ format: winston.format.simple() })],
});

export const myLogger = (req: Request, res: Response, next: NextFunction) => {
	logger.info(`${req.method} ${req.url} Params: ${JSON.stringify(req.params)}`);
	next();
};
