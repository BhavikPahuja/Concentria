// src/controllers/authController.ts
import { NextFunction, Request, RequestHandler, Response } from "express";
import redisClient from "../controllers/redisClient";
import {
  registerUser,
  loginUser,
  verifyOTP,
  refreshAccessToken,
  verifyUserByEmailService,
  sendOTPEmail,
  generateOTP,
  updatePasswordService,
} from "../services/authService";
import logger from "../utils/logger";
import { CustomError } from "../utils/customError";
import { env, refreshTokenValidity } from "../config";
import { timeStringToMs } from "../utils/dateTimeUtils";

const refreshTokenMaxAge = timeStringToMs(refreshTokenValidity);

export const register: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const uniqueKey = await registerUser(req.body);
    res.status(201).json({ message: "OTP sent for verification", uniqueKey });
    logger.info("OTP sent");
  } catch (error: any) {
    next(new CustomError(error.message, 400, { stack: error.stack }));
  }
};

export const login: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { accessToken, refreshToken } = await loginUser(req.body);
    res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: env === "production", // Secure only in production
        sameSite: "strict", // Prevent CSRF attacks
        maxAge: refreshTokenMaxAge, // Refresh token expiry time in ms
      })
      .json({ accessToken });
  } catch (error: any) {
    next(
      new CustomError(error.message, 400, {
        stack: error.stack,
        instance: error,
      })
    );
  }
};

export const verifyOtp: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { otp, uniqueKey } = req.body;
  try {
    const isUserRegistered = await verifyOTP(otp, uniqueKey);
    if (isUserRegistered) {
      res.status(200).json({ message: "OTP verified successfully" });
      logger.info("OTP verified successfully");
      return;
    }

    throw new Error("Invalid OTP");
  } catch (error: any) {
    next(new CustomError(error.message, 400, { stack: error.stack }));
  }
};

export const resendOTP: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { uniqueKey } = req.body;

  try {
    if (!uniqueKey) {
      res.status(400).json({ message: "Unique key is required." });
      return;
    }

    // Fetch user details from Redis using the unique key
    const userDetails = await redisClient.get(uniqueKey);

    if (!userDetails) {
      res.status(404).json({ message: "User details not found." });
      return;
    }

    // Parse user details (stored as JSON in Redis)
    const user = JSON.parse(userDetails);

    if (!user.email) {
      res.status(400).json({ message: "User email not found." });
      return;
    }

    // Generate a new OTP
    const newOTP = generateOTP();

    // Update Redis with the new OTP and reset the TTL
    await redisClient.setex(
      uniqueKey,
      600,
      JSON.stringify({ ...user, otp: newOTP }) // Set expiration time in seconds
    );

    // Send the new OTP via email
    await sendOTPEmail(user.email, newOTP);

    res.json({ message: "New OTP sent to your email." });
  } catch (error: any) {
    next(
      new CustomError(error.message, 500, {
        stack: error.stack,
        instance: error,
      })
    );
  }
};

export const forgotPassword: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  try {
    // Step 1: Verify if the user is registered
    const user = await verifyUserByEmailService(email);
    if (!user) {
      throw new CustomError("User not registered", 400);
    }

    // Step 2: Generate and cache the OTP
    const otp = generateOTP(); // Implement OTP generator (e.g., 6-digit random number)
    const userEmail = user.email;

    // Store OTP in Redis with a 10-minute expiration
    await redisClient.setex(`otp:${userEmail}`, 600, otp.toString());

    // Send OTP via email
    await sendOTPEmail(userEmail, otp);

    res.status(200).json({ message: "OTP sent to your email" });
    logger.info(`OTP sent to email ${email}`);
  } catch (error: any) {
    next(new CustomError(error.message, 400, { stack: error.stack }));
  }
};

export const resetPasswordController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, otp, newPassword } = req.body;

  try {
    // Step 1: Retrieve OTP from Redis
    const cachedOTP = await redisClient.get(`otp:${email}`);
    if (!cachedOTP) {
      throw new CustomError("OTP expired or invalid", 400);
    }

    // Step 2: Validate the OTP
    if (cachedOTP !== otp) {
      throw new CustomError("Invalid OTP", 400);
    }

    // Step 3: Change the user's password
    const updatePassword = await updatePasswordService(email, newPassword);
    if (!updatePassword) {
      res.status(400).json({ error: "Password not updated" });
      return;
    }

    // Step 4: Remove OTP from Redis after successful password reset
    await redisClient.del(`otp:${email}`);

    res.status(200).json({ message: "Password reset successfully" });
    logger.info(`Password reset successfully for ${email}`);
  } catch (error: any) {
    next(new CustomError(error.message, 400, { stack: error.stack }));
  }
};

export const resendOTPController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  try {
    // Step 1: Validate the email
    if (!email) {
      throw new CustomError("Email is required", 400);
    }

    // Step 2: Generate a new OTP
    const newOTP = generateOTP();

    // Step 3: Store the new OTP in Redis with a 10-minute expiration
    await redisClient.setex(`otp:${email}`, 600, newOTP.toString());

    // Step 4: Send the OTP to the user's email
    await sendOTPEmail(email, newOTP);

    res.status(200).json({ message: "New OTP sent to your email." });
    logger.info(`New OTP sent to ${email}`);
  } catch (error: any) {
    next(new CustomError(error.message, 400, { stack: error.stack }));
  }
};

export const refreshToken: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) throw new Error("No refresh token provided");
    const accessToken = await refreshAccessToken(refreshToken);
    res.json(accessToken);
    logger.info("Access token refreshed successfully");
  } catch (error: any) {
    next(new CustomError(error.message, 401, { stack: error.stack }));
  }
};
