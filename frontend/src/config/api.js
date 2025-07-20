// API Configuration
const API_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.DEV ? "http://localhost:5000" : "https://concentria-fh4s.onrender.com");

export const config = {
  API_URL,
  endpoints: {
    auth: {
      register: "/auth/register",
      verifyOtp: "/auth/verify-otp",
      resendOtp: "/auth/resend-otp",
      login: "/auth/login",
      refreshToken: "/auth/refresh-token",
      forgotPassword: "/auth/forgot-password",
      resetPassword: "/auth/reset-password",
      resendPasswordOtp: "/auth/resend-password-otp",
    },
    logs: {
      create: "/api/logs",
      getAll: "/api/logs",
      deleteAll: "/api/logs",
    },
  },
};

export default config;
