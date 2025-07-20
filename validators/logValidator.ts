// src/validators/logValidator.ts
import { z } from "zod";

export const createLogSchema = z.object({
  type: z.string().min(1, "Log type is required"),
  timestamp: z.string().datetime("Invalid timestamp format"),
  url: z.string().optional(),
  filename: z.string().optional(),
  extra: z.any().optional(),
});

export const getLogsQuerySchema = z.object({
  page: z.string().regex(/^\d+$/).transform(Number).optional(),
  limit: z.string().regex(/^\d+$/).transform(Number).optional(),
  type: z.string().optional(),
});
