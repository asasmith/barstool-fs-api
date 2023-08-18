import expressWinston from 'express-winston';
import { errorLoggerOptions } from './logger-config';

export const errorLogger = expressWinston.logger(errorLoggerOptions);
