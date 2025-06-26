// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomError } from "../utils/customError";
import { jwtSecretKey } from "../config";

export const verifyAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new CustomError("Access token missing or invalid", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, jwtSecretKey) as jwt.JwtPayload;
    req.user = decoded; // Attach decoded token payload to the request object
    next();
  } catch (error) {
    next(new CustomError("Invalid access token", 401));
  }
};
