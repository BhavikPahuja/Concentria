// src/validators/authValidator.ts
import { z } from "zod";

export const registerUserSchema = z.object({
  fullName: z.string().min(3).max(100),
  countryCode: z.string(),
  email: z.string().email(),
  password: z.string().min(4),
  phoneNumber: z.string(),
  tnc: z.boolean(),
});

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});
