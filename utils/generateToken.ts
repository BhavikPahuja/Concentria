// src/utils/generateToken.ts
import {
  accessTokenValidity,
  jwtRefreshKey,
  jwtSecretKey,
  refreshTokenValidity,
} from "../config";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export const generateAccessToken = (userId: ObjectId) => {
  console.log(userId);
  return jwt.sign({ userId: userId.toHexString() }, jwtSecretKey as string, {
    expiresIn: accessTokenValidity,
  });
};

export const generateRefreshToken = (userId: ObjectId) => {
  return jwt.sign({ userId: userId.toHexString }, jwtRefreshKey as string, {
    expiresIn: refreshTokenValidity,
  });
};
