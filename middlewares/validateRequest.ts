// src/middleware/validateRequest.ts
import { Request, Response, NextFunction, RequestHandler } from "express";
import logger from "../utils/logger";
import { ZodSchema, ZodError } from "zod";

export const validateRequest = (schema: ZodSchema<any>): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        }));

        // Log the validation errors with details
        logger.warn("Payload Validation Failed", {
          errors: formattedErrors,
          requestBody: req.body,
        });

        res.status(400).json({
          message: "Validation failed",
          errors: formattedErrors,
        });
        return; // Ensure the function exits after sending a response
      }
      next(error); // Pass the error to the next middleware if it's not a ZodError
    }
  };
};
