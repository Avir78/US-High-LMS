import { Request, Response, NextFunction } from 'express';
import { AppError } from '../exceptions/AppError';
import logger from '../utils/logger';
import { HTTP_STATUS } from '../constants/http-codes';

export const globalErrorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof AppError) {
    logger.warn(`[${err.status}] ${err.message}`, {
      path: req.path,
      method: req.method,
    });

    res.status(err.status).json({
      success: false,
      status: err.status,
      message: err.message,
      errors: (err as any).errors,
      meta: {
        timestamp: new Date().toISOString(),
        version: process.env.API_VERSION || '1.0.0',
      },
    });
  } else {
    logger.error('Unhandled error', {
      error: err.message,
      stack: err.stack,
      path: req.path,
      method: req.method,
    });

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: 'An unexpected error occurred',
      meta: {
        timestamp: new Date().toISOString(),
        version: process.env.API_VERSION || '1.0.0',
      },
    });
  }
};

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
