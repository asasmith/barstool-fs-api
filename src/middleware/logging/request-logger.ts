import expressWinston from 'express-winston';
import { requestLoggerOptions } from './logger-config';
import { Request, Response, NextFunction } from 'express';

export const requestLogger = process.env.NODE_ENV === 'test'
  ? (_req: Request, _res: Response, next: NextFunction) => next() // Skip logging during tests
  : expressWinston.logger(requestLoggerOptions);
