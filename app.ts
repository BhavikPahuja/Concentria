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
      console.log("🔍 CORS Request Origin:", origin);

      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) {
        console.log("✅ CORS: Allowing request with no origin");
        return callback(null, true);
      }

      // Allow ALL Chrome extensions
      if (origin && origin.startsWith("chrome-extension://")) {
        console.log("✅ CORS: Allowing Chrome extension:", origin);
        return callback(null, true);
      }

      // In development, allow localhost on any port
      if (
        process.env.NODE_ENV === "development" &&
        origin.includes("localhost")
      ) {
        console.log("✅ CORS: Allowing localhost in development:", origin);
        return callback(null, true);
      }

      // Check allowed origins list
      if ((allowedOrigins || "").split(",")?.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        console.log("❌ CORS: Blocking origin:", origin);
        return callback(new Error(msg), false);
      }

      console.log("✅ CORS: Allowing origin from allowed list:", origin);
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
