// src/models/userModel.ts
import mongoose, { Schema, Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface IUser extends Document {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  countryCode: string;
  phoneNumber?: string;
  email: string;
  password: string;
  tnc: boolean;
  isAdmin?: boolean;
  refreshToken?: string;
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  countryCode: { type: String, required: true },
  phoneNumber: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tnc: { type: Boolean, required: true },
  isAdmin: { type: Boolean },
  refreshToken: { type: String },
});

export const User = mongoose.model<IUser>('User', userSchema);
