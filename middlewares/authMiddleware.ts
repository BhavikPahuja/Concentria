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

  // More robust token extraction - handle extra spaces
  const token = authHeader.replace("Bearer ", "").trim();

  if (!token || token.length === 0) {
    return next(new CustomError("Access token missing or invalid", 401));
  }

  try {
    // Production debugging - log JWT secret info
    if (process.env.NODE_ENV === "production") {
      console.log("🔍 JWT Debug - Secret exists:", !!jwtSecretKey);
      console.log("🔍 JWT Debug - Secret length:", jwtSecretKey?.length || 0);
      console.log("🔍 JWT Debug - Token length:", token.length);
    }

    const decoded = jwt.verify(token, jwtSecretKey as string) as jwt.JwtPayload;
    req.user = decoded; // Attach decoded token payload to the request object
    next();
  } catch (error: any) {
    // Production debugging - log verification error details
    if (process.env.NODE_ENV === "production") {
      console.log("❌ JWT Verification Error:", error.name, error.message);
    }
    next(new CustomError("Invalid access token", 401));
  }
};
