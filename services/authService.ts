// src/services/authService.ts
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken";
import { User } from "../models/userModel";
import logger from "../utils/logger";
import { LoginRequest, RegisterRequest } from "types/authInterfaces";
import { adminEmail, emailPassword, jwtRefreshKey } from "../config";
import crypto from "crypto";
import nodemailer from "nodemailer";
import redisClient from "../controllers/redisClient";
import { v4 as uuidv4 } from "uuid";

export const registerUser = async (userData: RegisterRequest) => {
  const { email, password, ...rest } = userData;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("A user with this email already exists");
  }
  const otp = generateOTP();

  const saltRounds = 10; // The cost factor for the hashing, 10 is a good default
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  // Generate a unique key to store user data and OTP in Redis
  const uniqueKey = `register:${uuidv4()}`;

  // Store user data and OTP in Redis with a 10-minute expiration
  const redisData = {
    email,
    password: hashedPassword,
    ...rest,
    otp,
  };

  try {
    await redisClient.setex(uniqueKey, 600, JSON.stringify(redisData));
    console.log(`✅ OTP stored in Redis for ${email}: ${otp}`);
  } catch (error) {
    console.log(
      `⚠️  Redis not available - OTP for ${email}: ${otp} (Store this for testing)`
    );
  }

  // Send OTP via email
  try {
    await sendOTPEmail(email, otp);
    console.log(`📧 OTP email sent to ${email}: ${otp}`);
  } catch (error) {
    console.log(
      `⚠️  Email failed - OTP for ${email}: ${otp} (Use this for testing)`
    );
  }

  return uniqueKey;
};

export const loginUser = async (userData: LoginRequest) => {
  const { email, password } = userData;
  const user = await User.findOne({ email });
  if (!user) {
    logger.warn("Invalid login attempt: user not found", { email });
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    logger.warn("Invalid login attempt: incorrect password", { email });
    throw new Error("Invalid credentials");
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  logger.info("User logged in successfully", { userId: user._id, email });
  return { accessToken, refreshToken };
};

// Verify user by email

export const verifyUserByEmailService = async (email: string) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw new Error("Error while verifying user by email");
  }
};

// Generate OTP for register
export function generateOTP() {
  return crypto.randomInt(100000, 999999); // Generates a 6-digit OTP
}

// Email service configuration

const transporter = nodemailer.createTransport({
  service: "gmail", // or any other email service
  auth: {
    user: adminEmail, // Your email address
    pass: emailPassword, // Your email password
  },
});

// Function to send email
export async function sendOTPEmail(email: string, otp: number) {
  const mailOptions = {
    from: adminEmail,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
  };

  console.log(`📧 Attempting to send OTP to ${email}: ${otp}`);

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent successfully to ${email}:`, result.messageId);
    logger.info(`OTP email sent to ${email}`);
  } catch (error: any) {
    console.error(`❌ Failed to send email to ${email}:`, error.message);
    logger.error("Error sending OTP email:", {
      email,
      error: error.message,
      stack: error.stack,
    });
    throw error; // Re-throw so the calling function knows email failed
  }
}

export const updatePasswordService = async (
  email: string,
  newPassword: string
) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  user.password = await bcrypt.hash(newPassword, 10);

  await user.save();

  return true;
};

// Verify OTP and activate user account

export const verifyOTP = async (otp: string, uniqueKey: string) => {
  try {
    // Step 1: Retrieve data from Redis
    const redisData = await redisClient.get(uniqueKey);

    if (!redisData) {
      console.log(`⚠️  Redis data not found for key: ${uniqueKey}`);
      throw new Error(
        "Invalid or expired key. Redis might not be available - please use direct registration for testing"
      );
    }

    // Step 2: Parse the stored data
    const {
      email,
      password,
      phoneNumber,
      countryCode,
      lastName,
      firstName,
      otp: storedOtp,
    } = JSON.parse(redisData);

    console.log(
      `🔍 Verifying OTP for ${email}: ${otp} vs stored: ${storedOtp}`
    );

    // Step 3: Validate the OTP
    if (storedOtp == otp) {
      // Step 4: Create the user in the database
      const newUser = new User({
        email,
        password,
        phoneNumber,
        countryCode,
        lastName,
        firstName,
        tnc: true,
      });

      await newUser.save();
      console.log(`✅ User created successfully: ${email}`);

      // Step 5: Delete the Redis key after successful verification
      try {
        await redisClient.del(uniqueKey);
        console.log(`🗑️  Redis key deleted: ${uniqueKey}`);
      } catch (error) {
        console.log(`⚠️  Could not delete Redis key (Redis might be down)`);
      }

      return true;
    }

    console.log(`❌ OTP mismatch for ${email}`);
    return false;
  } catch (error: any) {
    console.error(`❌ OTP verification error:`, error.message);
    throw error;
  }
};

export const refreshAccessToken = async (refreshToken: string) => {
  const decoded = jwt.verify(
    refreshToken,
    jwtRefreshKey as string
  ) as jwt.JwtPayload;

  // Find the user by decoded userId
  const user = await User.findById(decoded.userId);
  if (!user || user.refreshToken !== refreshToken) {
    logger.warn("Invalid refresh token");
    throw new Error("Invalid refresh token");
  }

  // Generate a new access token
  const newAccessToken = generateAccessToken(user._id);

  return { accessToken: newAccessToken };
};
