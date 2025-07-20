// Quick JWT test - run this once to verify token generation/verification
import jwt from "jsonwebtoken";

const testSecret = "concentria-super-secret-jwt-key-2025-development-bhav1k";
const testUserId = "507f1f77bcf86cd799439011";

console.log("🧪 JWT Test - Generating token...");
const testToken = jwt.sign({ userId: testUserId }, testSecret, {
  expiresIn: "5m",
});
console.log("✅ Token generated:", testToken.substring(0, 30) + "...");

console.log("🧪 JWT Test - Verifying token...");
try {
  const decoded = jwt.verify(testToken, testSecret);
  console.log("✅ Token verified successfully:", decoded);
} catch (error) {
  console.log("❌ Token verification failed:", error);
}

export default testToken;
