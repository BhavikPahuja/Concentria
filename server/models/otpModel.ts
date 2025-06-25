// src/models/otpModel.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface OTPRecord extends Document {
  email: string;
  otp: number;
  expiresAt: Date;
}

const otpSchema = new Schema<OTPRecord>({
  email: { type: String, required: true, unique: true },
  otp: { type: Number, required: true },
  expiresAt: { type: Date, required: true },
});

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const OTPModel = mongoose.model<OTPRecord>('OTP', otpSchema);
