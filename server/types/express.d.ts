// src/types/express.d.ts
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

declare module 'express-serve-static-core' {
  interface Request {
    correlationId?: string;
    user?: JwtPayload;
  }
}