import React, { createContext, useContext, useState, useEffect } from "react";
import { apiService } from "../services/authApi.js";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = apiService.getStoredToken();
        const storedUser = apiService.getStoredUser();

        if (token && storedUser) {
          setUser(storedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        // Clear invalid data
        apiService.logout();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Listen for token expiration events from API service
    const handleTokenExpired = () => {
      console.log(
        "🔄 AuthContext: Token expired event received, logging out user"
      );
      setUser(null);
      setIsAuthenticated(false);
    };

    // Listen for successful token refresh events
    const handleTokenRefreshed = () => {
      console.log("🔄 AuthContext: Token refreshed successfully");
    };

    window.addEventListener("auth:token-expired", handleTokenExpired);
    window.addEventListener("auth:token-refreshed", handleTokenRefreshed);

    return () => {
      window.removeEventListener("auth:token-expired", handleTokenExpired);
      window.removeEventListener("auth:token-refreshed", handleTokenRefreshed);
    };
  }, []);

  const login = async (credentials) => {
    try {
      console.log("AuthContext: Starting login...");
      const response = await apiService.login(credentials);
      console.log("AuthContext: Login response:", response);

      if (response.accessToken) {
        console.log("AuthContext: Login successful, token received");

        // If user object is provided, use it
        if (response.user) {
          console.log("AuthContext: Setting user from response");
          setUser(response.user);
          setIsAuthenticated(true);
        } else {
          // If no user object, create a minimal user object based on credentials
          console.log("AuthContext: Creating minimal user object");
          const minimalUser = {
            email: credentials.email,
            // Add any other basic info if needed
          };
          setUser(minimalUser);
          setIsAuthenticated(true);
        }
      } else {
        console.warn("AuthContext: No access token in response");
      }

      return response;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      console.log("🏭 AuthContext: Starting registration with data:", userData);
      const response = await apiService.register(userData);
      console.log("🏭 AuthContext: Registration response received:", response);
      return response;
    } catch (error) {
      console.error("🏭 AuthContext: Registration error:", error);
      throw error;
    }
  };

  const verifyOtp = async (otpData) => {
    try {
      const response = await apiService.verifyOtp(otpData);
      return response;
    } catch (error) {
      console.error("OTP verification error:", error);
      throw error;
    }
  };

  const resendOtp = async (uniqueKey) => {
    try {
      const response = await apiService.resendOtp(uniqueKey);
      return response;
    } catch (error) {
      console.error("Resend OTP error:", error);
      throw error;
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await apiService.forgotPassword(email);
      return response;
    } catch (error) {
      console.error("Forgot password error:", error);
      throw error;
    }
  };

  const resetPassword = async (resetData) => {
    try {
      const response = await apiService.resetPassword(resetData);
      return response;
    } catch (error) {
      console.error("Reset password error:", error);
      throw error;
    }
  };

  const resendPasswordOtp = async (email) => {
    try {
      const response = await apiService.resendPasswordOtp(email);
      return response;
    } catch (error) {
      console.error("Resend password OTP error:", error);
      throw error;
    }
  };

  const logout = () => {
    apiService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const refreshToken = async () => {
    try {
      const response = await apiService.refreshToken();
      return response;
    } catch (error) {
      console.error("Token refresh error:", error);
      // If refresh fails, logout user
      logout();
      throw error;
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    verifyOtp,
    resendOtp,
    forgotPassword,
    resetPassword,
    resendPasswordOtp,
    logout,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
