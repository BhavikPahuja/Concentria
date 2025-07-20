const jwt = require("jsonwebtoken");

// The token from your logs
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzkzZmI1MGVhNmJmNzQzNDIzYzg4NjYiLCJpYXQiOjE3Mzc0MDg0MjksImV4cCI6MTczNzQwODcyOX0.uR2AEwy-8J4bssgtwV_I8heoiNvmDpG7vbPRwfQO67E";

// Your JWT secret
const jwtSecret = "concentria-super-secret-jwt-key-2025-development-bhav1k";

console.log("🔍 JWT TOKEN ANALYSIS:");
console.log("Token length:", token.length);

// Decode without verification to see payload
try {
  const decoded = jwt.decode(token);
  console.log(
    "📄 Decoded payload (no verification):",
    JSON.stringify(decoded, null, 2)
  );

  // Check expiration
  const now = Math.floor(Date.now() / 1000);
  console.log("⏰ Current timestamp:", now);
  console.log("⏰ Token expires at:", decoded.exp);
  console.log("⏰ Token expired?", now > decoded.exp);
  console.log("⏰ Time difference:", now - decoded.exp, "seconds");
} catch (error) {
  console.log("❌ Error decoding token:", error.message);
}

// Try to verify with the secret
console.log("\n🔐 VERIFICATION TEST:");
try {
  const verified = jwt.verify(token, jwtSecret);
  console.log(
    "✅ Token verified successfully:",
    JSON.stringify(verified, null, 2)
  );
} catch (error) {
  console.log("❌ Token verification failed:", error.name, "-", error.message);
}
