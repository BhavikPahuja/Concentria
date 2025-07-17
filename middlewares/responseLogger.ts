// src/middleware/responseLogger.ts
import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

const responseLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = process.hrtime(); // Capture the start time

  const originalSend = res.send;

  res.send = function (body) {
    const [seconds, nanoseconds] = process.hrtime(start); // Calculate the duration
    const durationInMilliseconds = (seconds * 1000 + nanoseconds / 1e6).toFixed(2);

    // Log the response details
    logger.info(`Response(${durationInMilliseconds} ms): ${res.statusCode} ${req.method} ${req.originalUrl}`, {
      correlationId: req.correlationId,
      statusCode: res.statusCode,
      responseBody: body,
      duration: `${durationInMilliseconds} ms`,
    });

    // Call the original `res.send` method
    return originalSend.call(this, body);
  };

  next();
};

export default responseLogger;