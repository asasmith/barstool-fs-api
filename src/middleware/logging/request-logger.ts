import expressWinston from 'express-winston';
import { requestLoggerOptions } from './logger-config';

export const requestLogger = expressWinston.logger(requestLoggerOptions);
