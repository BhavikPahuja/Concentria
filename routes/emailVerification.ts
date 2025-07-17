import nodemailer from "nodemailer";
import crypto from "crypto";
import express from "express";
import { Request, Response } from "express";
import * as dotenv from "dotenv";
import { env } from "process";

dotenv.config();
const router = express.Router();

// Email service configuration

const transporter = nodemailer.createTransport({
  service: "gmail", // or any other email service
  auth: {
    user: process.env.EMAIL, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password
  },
});

// Function to generate OTP
export function generateOTP() {
  return crypto.randomInt(100000, 999999); // Generates a 6-digit OTP
}

// Function to send email
export async function sendOTPEmail(email: string, otp: number) {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
  };
  console.log(otp);
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending OTP email:", error);
  }
}

export default router;
