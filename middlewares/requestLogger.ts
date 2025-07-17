// src/middleware/requestLogger.ts
import { Request, Response, NextFunction } from 'express';
import logger, { getCorrelationId } from '../utils/logger';

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  req.correlationId = getCorrelationId();
  res.setHeader('X-Correlation-ID', req.correlationId); // Optionally send the ID in response headers
  logger.info(`Incoming request: ${req.method} ${req.url}`, { correlationId: req.correlationId });
  next();
};

export default requestLogger;
