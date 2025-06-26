import dotenv from "dotenv";
dotenv.config();

const env = process.env.NODE_ENV || "production";
const port = Number(process.env.PORT) || 5000;
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbName = process.env.DB_NAME;
const dbPass = process.env.DB_PASS;
const adminEmail = process.env.EMAIL;
const emailPassword = process.env.EMAIL_PASSWORD;
const jwtSecretKey = process.env.JWT_SECRET;
const jwtRefreshKey = process.env.JWT_REFRESH_SECRET;
// const accessTokenValidity = process.env.ACCESS_TOKEN_EXPIRE_TIME;
// const refreshTokenValidity = process.env.REFRESH_TOKEN_EXPIRE_TIME;
const accessTokenValidity="5m";
const refreshTokenValidity="30d";
const allowedOrigins = process.env.ALLOWED_ORIGINS;
const redis_host = process.env.REDIS_CLIENT_HOST;
const redis_port = Number(process.env.REDIS_CLIENT_PORT) || 6379;

export {
  env,
  port,
  dbHost,
  dbUser,
  dbName,
  dbPass,
  adminEmail,
  emailPassword,
  jwtSecretKey,
  jwtRefreshKey,
  accessTokenValidity,
  refreshTokenValidity,
  allowedOrigins,
  redis_host,
  redis_port
};
