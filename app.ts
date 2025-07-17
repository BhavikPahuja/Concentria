// src/app.ts
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import logRoutes from "./routes/logRoutes";
import { allowedOrigins } from "./config";
import errorHandler from "./middlewares/errorHandler";
import requestLogger from "./middlewares/requestLogger";
import responseLogger from "./middlewares/responseLogger";
import { connectDatabase } from "./utils/operateDB";

const app = express();

// Enable CORS for all routes
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if ((allowedOrigins || "").split(",")?.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true, // Allow cookies to be sent with requests
  })
);

app.use(requestLogger); // Log incoming requests
app.use(express.json()); // Parse JSON request bodies
app.use(cookieParser()); // Parse cookies
app.use(responseLogger); // Log outgoing responses

connectDatabase();

app.use("/auth", authRoutes);
app.use("/api", logRoutes);

app.use(errorHandler); // Error handling middleware

export default app;
