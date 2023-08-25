import winston from 'winston';

export const requestLoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true }),
    ),
    msg: 'HTTP {{req.method}} {{req.url}}',
    expressFormat: true,
};

export const errorLoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.json(),
    ),
};
