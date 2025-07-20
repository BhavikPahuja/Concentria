import { config } from "../config/api.js";

/**
 * Enhanced API Service with proper error handling and response formatting
 */
class ApiService {
  constructor() {
    this.baseURL = config.API_URL;
  }

  /**
   * Make HTTP request with proper error handling
   */
  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;

    const defaultHeaders = {
      "Content-Type": "application/json",
    };

    // Add authorization header if token exists
    const token = localStorage.getItem("accessToken");
    if (token) {
      defaultHeaders.Authorization = `Bearer ${token}`;
    }

    const requestOptions = {
      headers: { ...defaultHeaders, ...options.headers },
      ...options,
    };

    try {
      console.log(`🚀 API Request: ${options.method || "GET"} ${url}`);

      const response = await fetch(url, requestOptions);
      const data = await response.json();

      if (!response.ok) {
        console.error(`❌ API Error: ${response.status}`, data);
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
    return this.makeRequest(config.endpoints.auth.refreshToken, {
      method: "POST",
    });
  }

  // Utility methods
  logout() {
    localStorage.removeItem("accessToken");
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
}

// Create and export singleton instance
export const apiService = new ApiService();
export default apiService;
