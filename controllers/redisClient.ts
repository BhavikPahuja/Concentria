import {
  redis_host,
  redis_port,
  redis_password,
  redis_username,
} from "../config";
import Redis from "ioredis";

console.log("🔧 Redis Configuration:", {
  host: redis_host,
  port: redis_port,
  username: redis_username,
  password: redis_password ? "***" + redis_password.slice(-4) : "not set",
});

const redisClient = new Redis({
  host: redis_host,
  port: redis_port,
  password: redis_password,
  username: redis_username,
  maxRetriesPerRequest: 3,
  enableReadyCheck: true,
  lazyConnect: false,
  connectTimeout: 10000,
  commandTimeout: 5000,
});

let redisConnected = false;

// Handle connection events
redisClient.on("connect", () => {
  console.log("✅ Redis Cloud connected successfully");
  redisConnected = true;
});

redisClient.on("ready", () => {
  console.log("✅ Redis Cloud is ready for commands");
  redisConnected = true;
});

redisClient.on("error", (err) => {
  console.error("❌ Redis Cloud error:", err.message);
  console.error("❌ Redis error details:", err);
  redisConnected = false;
});

redisClient.on("close", () => {
  console.log("🔒 Redis Cloud connection closed");
  redisConnected = false;
});

redisClient.on("reconnecting", () => {
  console.log("🔄 Redis Cloud reconnecting...");
});

// Test the connection immediately
(async () => {
  try {
    await redisClient.ping();
    console.log("✅ Redis Cloud ping successful");
    redisConnected = true;
  } catch (error) {
    console.error("❌ Redis Cloud ping failed:", error);
    redisConnected = false;
  }
})();

// Create a wrapper that handles Redis being unavailable
const safeRedisClient = {
  async setex(key: string, seconds: number, value: string) {
    try {
      console.log(`🔧 Attempting Redis SETEX: ${key}`);
      const result = await redisClient.setex(key, seconds, value);
      console.log(`✅ Redis SETEX successful for key: ${key}`);
      return result;
    } catch (error: any) {
      console.error(`❌ Redis SETEX failed for key: ${key}`, error.message);
      return null;
    }
  },

  async get(key: string) {
    try {
      console.log(`🔧 Attempting Redis GET: ${key}`);
      const result = await redisClient.get(key);
      console.log(
        `✅ Redis GET successful for key: ${key}, result:`,
        result ? "found" : "not found"
      );
      return result;
    } catch (error: any) {
      console.error(`❌ Redis GET failed for key: ${key}`, error.message);
      return null;
    }
  },

  async del(key: string) {
    try {
      console.log(`🔧 Attempting Redis DEL: ${key}`);
      const result = await redisClient.del(key);
      console.log(`✅ Redis DEL successful for key: ${key}`);
      return result;
    } catch (error: any) {
      console.error(`❌ Redis DEL failed for key: ${key}`, error.message);
      return null;
    }
  },
};

export default safeRedisClient;
