// Quick test to verify .env loading
import dotenv from "dotenv";
const result = dotenv.config();

console.log("📁 Current working directory:", process.cwd());
console.log("🔧 Dotenv config result:", result);
console.log(
  "🔧 JWT_SECRET from process.env:",
  process.env.JWT_SECRET
    ? `${process.env.JWT_SECRET.substring(0, 15)}...`
    : "UNDEFINED"
);
console.log("🔧 NODE_ENV:", process.env.NODE_ENV);

// Also check if .env file exists
import fs from "fs";
const envExists = fs.existsSync(".env");
console.log("📄 .env file exists:", envExists);

if (envExists) {
  const envContent = fs.readFileSync(".env", "utf8");
  const hasJwtSecret = envContent.includes("JWT_SECRET=");
  console.log("🔧 .env contains JWT_SECRET:", hasJwtSecret);
}
