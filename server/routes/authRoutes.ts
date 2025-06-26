// src/routes/authRoutes.ts
import express from "express";
import {
  register,
  login,
  verifyOtp,
  refreshToken,
  forgotPassword,
  resetPasswordController,
  resendOTP,
  resendOTPController,
} from "../controllers/authController";
import { validateRequest } from "../middlewares/validateRequest";
import {
  loginUserSchema,
  registerUserSchema,
} from "../validators/authValidator";

const router = express.Router();

router.post("/register", validateRequest(registerUserSchema), register);
router.post("/login", validateRequest(loginUserSchema), login);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp",resendOTP);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password",resetPasswordController);
router.post("/resend-password-otp",resendOTPController);
router.get("/refresh-token", refreshToken);

export default router;
