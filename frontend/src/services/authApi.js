import { config } from "../config/api.js";

/**
 * Simplified API Service with basic error handling
 */
class ApiService {
  constructor() {
    this.baseURL = config.API_URL;
  }

  /**
   * Make HTTP request with automatic token refresh on 401
   */
  async makeRequest(endpoint, options = {}, isRetry = false) {
    const url = `${this.baseURL}${endpoint}`;

    const defaultHeaders = {
      "Content-Type": "application/json",
    };

    // Add authorization header if token exists
    const token = localStorage.getItem("accessToken");
    if (token) {
      defaultHeaders.Authorization = `Bearer ${token}`;
      console.log(
        "🔐 Added Authorization header with token length:",
        token.length
      );
    } else {
      console.warn("⚠️ No access token found for request");
    }

    const requestOptions = {
      headers: { ...defaultHeaders, ...options.headers },
      ...options,
    };

    console.log(`🚀 API Request: ${options.method || "GET"} ${url}`);
    console.log("📤 Request headers:", requestOptions.headers);

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();

      if (!response.ok) {
        console.error(`❌ API Error: ${response.status}`, data);

        // Handle 401 Unauthorized - attempt token refresh
        if (
          response.status === 401 &&
          !isRetry &&
          endpoint !== config.endpoints.auth.refreshToken
        ) {
          console.log("🔄 Token expired, attempting refresh...");

          try {
            await this.refreshToken();
            console.log("✅ Token refreshed successfully, retrying request...");

            // Dispatch success event for UI notification
            window.dispatchEvent(new CustomEvent("auth:token-refreshed"));

            // Retry the original request with the new token
            return await this.makeRequest(endpoint, options, true);
          } catch (refreshError) {
            console.error("❌ Token refresh failed:", refreshError);

            // Clear tokens and redirect to login
            this.logout();

            // Dispatch a custom event to notify components about auth failure
            window.dispatchEvent(new CustomEvent("auth:token-expired"));

            throw {
              status: 401,
              message: "Session expired. Please login again.",
              errors: ["Authentication failed"],
              tokenExpired: true,
            };
          }
        }

        throw {
          status: response.status,
          message: data.message || "Request failed",
          errors: data.errors || data.error,
          ...data,
        };
      }

      console.log(`✅ API Success: ${url}`, data);
      return data;
    } catch (error) {
      if (error.name === "TypeError" && error.message.includes("fetch")) {
        throw {
          status: 0,
          message: "Network error - please check your connection",
          errors: ["Failed to connect to server"],
        };
      }
      throw error;
    }
  }

  // Authentication endpoints
  async register(userData) {
    console.log(
      "🌐 ApiService: Starting register request with data:",
      userData
    );
    console.log("🌐 ApiService: API URL:", this.baseURL);
    console.log(
      "🌐 ApiService: Register endpoint:",
      config.endpoints.auth.register
    );

    try {
      const response = await this.makeRequest(config.endpoints.auth.register, {
        method: "POST",
        body: JSON.stringify(userData),
      });
      console.log("🌐 ApiService: Register response received:", response);
      return response;
    } catch (error) {
      console.error("🌐 ApiService: Register error:", error);
      throw error;
    }
  }

  async verifyOtp(otpData) {
    return this.makeRequest(config.endpoints.auth.verifyOtp, {
      method: "POST",
      body: JSON.stringify(otpData),
    });
  }

  async resendOtp(uniqueKey) {
    return this.makeRequest(config.endpoints.auth.resendOtp, {
      method: "POST",
      body: JSON.stringify({ uniqueKey }),
    });
  }

  async login(credentials) {
    const response = await this.makeRequest(config.endpoints.auth.login, {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    // Store tokens if login successful
    if (response.accessToken) {
      localStorage.setItem("accessToken", response.accessToken);

      // Also store refresh token if provided
      if (response.refreshToken) {
        localStorage.setItem("refreshToken", response.refreshToken);
        console.log("🔐 Refresh token stored successfully");
      } else {
        console.log("⚠️ No refresh token received from backend");
      }

      // Store user data if provided, otherwise create minimal user object
      if (response.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
      } else {
        // Create minimal user object based on credentials
        const minimalUser = {
          email: credentials.email,
        };
        localStorage.setItem("user", JSON.stringify(minimalUser));
      }

      console.log("🔐 Login tokens stored:", {
        hasAccessToken: !!response.accessToken,
        hasRefreshToken: !!response.refreshToken,
        accessTokenLength: response.accessToken?.length,
        refreshTokenLength: response.refreshToken?.length,
      });
    }

    return response;
  }

  async forgotPassword(email) {
    return this.makeRequest(config.endpoints.auth.forgotPassword, {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }

  async resetPassword(resetData) {
    return this.makeRequest(config.endpoints.auth.resetPassword, {
      method: "POST",
      body: JSON.stringify(resetData),
    });
  }

  async resendPasswordOtp(email) {
    return this.makeRequest(config.endpoints.auth.resendPasswordOtp, {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }

  async refreshToken() {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await this.makeRequest(
      config.endpoints.auth.refreshToken,
      {
        method: "POST",
        body: JSON.stringify({ refreshToken }),
      }
    );

    if (response.accessToken) {
      localStorage.setItem("accessToken", response.accessToken);
    }
    if (response.refreshToken) {
      localStorage.setItem("refreshToken", response.refreshToken);
    }

    return response;
  }

  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  }

  getStoredUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  getStoredToken() {
    return localStorage.getItem("accessToken");
  }

  isAuthenticated() {
    return !!this.getStoredToken();
  }

  // Test utility to simulate expired token
  simulateExpiredToken() {
    const currentToken = localStorage.getItem("accessToken");
    if (currentToken) {
      // Store the original token temporarily
      localStorage.setItem("originalToken", currentToken);
      // Set a dummy expired token
      localStorage.setItem("accessToken", "expired_token_for_testing");
      console.log("🧪 Token set to expired for testing purposes");
      return true;
    }
    return false;
  }

  // Test utility to restore original token
  restoreOriginalToken() {
    const originalToken = localStorage.getItem("originalToken");
    if (originalToken) {
      localStorage.setItem("accessToken", originalToken);
      localStorage.removeItem("originalToken");
      console.log("🧪 Original token restored");
      return true;
    }
    return false;
  }
}

// Create and export singleton instance
export const apiService = new ApiService();
export default apiService;
