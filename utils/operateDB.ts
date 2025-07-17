// src/utils/operateDB.ts
import mongoose from "mongoose";
import { dbHost, dbPass, dbUser, dbName, env } from "../config";

export const connectDatabase = async () => {
  try {
    if (env === "docker") {
      await mongoose.connect(
        `mongodb://${dbUser}:${dbPass}@sql_db:27017/${dbName}?authSource=admin` as string
      );
    } else {
      // Use the complete connection string from DB_HOST
      await mongoose.connect(dbHost as string);
    }
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export const dropDatabase = async () => {
  try {
    const db = mongoose.connection.db;
    if (!db) {
      console.error("Error: Database connection is undefined.");
      process.exit(1);
    }
    // Drop the database
    console.log(`Dropping database: ${db.databaseName}...`);
    await db.dropDatabase();
    console.log("Database dropped successfully.");
    process.exit(0); // Exit successfully
  } catch (error) {
    console.error("Error dropping database:", error);
    process.exit(1); // Exit with an error code
  }
};
