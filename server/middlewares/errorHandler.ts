// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/customError";
import logger from "../utils/logger";
import { MongooseError } from "mongoose";

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  _next: NextFunction // Prefix with underscore to indicate it's intentionally unused
) => {
  var statusCode = err.statusCode || 500;
  var message = err.message || "Internal Server Error";
  const { instance: errInstance, ...otherDetails } = err.details || {};

  if (errInstance) {
    if (errInstance instanceof MongooseError) {
      if (message.includes("timed out")) {
        message = "Database connection timed out!";
        statusCode = 504;
      } else if (message.includes("failed to connect")) {
        message = "Failed to connect to the database!";
        statusCode = 503;
      } else {
        message = "Internal Server Error";
        statusCode = 500;
      }
    }
  }

  // Log the error
  logger.error(message, {
    statusCode,
    details: otherDetails,
    stack: err.stack,
    correlationId: req.correlationId,
  });

  // Send the error response
  res.status(statusCode).json({ message });
};

export default errorHandler;
