import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineUser,
  AiOutlinePhone,
  AiOutlineArrowLeft,
  AiOutlineCheckCircle,
  AiOutlineGoogle,
  AiOutlineWarning,
  AiOutlineLogin,
} from "react-icons/ai";
import { FiLoader, FiAlertCircle } from "react-icons/fi";
import logo from "../../media/Design a modern, fut.png";

// Enhanced Input Field with better styling and animations
const InputField = ({
  icon: Icon,
  type,
  placeholder,
  name,
  value,
  onChange,
  required = false,
  maxLength,
  errors,
}) => (
  <div className="relative group">
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
      <Icon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
    </div>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      maxLength={maxLength}
      className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-gray-50/50 backdrop-blur-sm text-gray-800 placeholder-gray-400 text-sm font-medium shadow-sm hover:shadow-md group ${
        errors[name]
          ? "border-red-400 bg-red-50/50 focus:border-red-500 focus:ring-red-500/20"
          : "border-gray-200 hover:border-gray-300 focus:bg-white"
      }`}
    />
    {errors[name] && (
      <div className="mt-2 flex items-center">
        <FiAlertCircle className="h-4 w-4 text-red-500 mr-1" />
        <p className="text-xs text-red-600 font-medium">{errors[name]}</p>
      </div>
    )}
  </div>
);

// Enhanced Password Field with better security indicators
const PasswordField = ({
  name,
  placeholder,
  value,
  onChange,
  show,
  setShow,
  required = false,
  errors,
}) => (
  <div className="relative group">
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
      <AiOutlineLock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
    </div>
    <input
      type={show ? "text" : "password"}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`w-full pl-12 pr-14 py-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-gray-50/50 backdrop-blur-sm text-gray-800 placeholder-gray-400 text-sm font-medium shadow-sm hover:shadow-md group ${
        errors[name]
          ? "border-red-400 bg-red-50/50 focus:border-red-500 focus:ring-red-500/20"
          : "border-gray-200 hover:border-gray-300 focus:bg-white"
      }`}
    />
    <button
      type="button"
      onClick={() => setShow(!show)}
      className="absolute inset-y-0 right-0 pr-4 flex items-center z-10 rounded-r-xl transition-colors duration-200"
    >
      {show ? (
        <AiOutlineEyeInvisible className="h-5 w-5 text-gray-400 hover:text-gray-600" />
      ) : (
        <AiOutlineEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
      )}
    </button>
    {errors[name] && (
      <div className="mt-2 flex items-center">
        <FiAlertCircle className="h-4 w-4 text-red-500 mr-1" />
        <p className="text-xs text-red-600 font-medium">{errors[name]}</p>
      </div>
    )}
  </div>
);

const AuthForm = () => {
  const [authMode, setAuthMode] = useState("login"); // 'login', 'register', 'verify-otp', 'forgot-password', 'reset-password'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [uniqueKey, setUniqueKey] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    countryCode: "+91",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    tnc: false,
    otp: "",
    resetEmail: "",
    resetOtp: "",
    newPassword: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const from = location.state?.from?.pathname || "/dashboard";

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log("📝 Input change:", { name, value, type, checked });

    setFormData((prev) => {
      const newData = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
      console.log("📝 Updated form data:", newData);
      return newData;
    });

    // Clear field-specific error
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (successMessage) setSuccessMessage("");
  };

  const displayErrors = (error) => {
    if (error.errors && Array.isArray(error.errors)) {
      const fieldErrors = {};
      error.errors.forEach((err) => {
        if (err.path) {
          fieldErrors[err.path] = err.message;
        }
      });
      setErrors(fieldErrors);
    } else if (error.message) {
      setErrors({ general: error.message });
    } else {
      setErrors({ general: "An unexpected error occurred" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccessMessage("");

    try {
      switch (authMode) {
        case "login":
          await handleLogin();
          break;
        case "register":
          await handleRegister();
          break;
        case "verify-otp":
          await handleVerifyOtp();
          break;
        case "forgot-password":
          await handleForgotPassword();
          break;
        case "reset-password":
          await handleResetPassword();
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("🔥 Submit error:", error);
      displayErrors(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    const response = await auth.login({
      email: formData.email,
      password: formData.password,
    });

    console.log("Login successful:", response);
    console.log("Navigating to:", from);

    // Check if login was successful and navigate
    if (response && (response.accessToken || response.user)) {
      console.log("Navigation should happen now");
      // Use window.location if navigate doesn't work
      window.location.href = "/dashboard";
    } else {
      console.error("Login response missing expected data:", response);
      setErrors({ general: "Login failed. Please try again." });
    }
  };

  const handleRegister = async () => {
    console.log("🚀 Starting registration process...");

    // Validate required fields
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.tnc) {
      newErrors.tnc = "You must agree to the terms and conditions";
    }

    console.log("📝 Form validation errors:", newErrors);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const registrationData = {
      fullName: formData.fullName,
      countryCode: formData.countryCode,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      password: formData.password,
      tnc: formData.tnc,
    };

    console.log("📤 Sending registration data:", registrationData);

    try {
      const response = await auth.register(registrationData);
      console.log("✅ Registration response:", response);

      setUniqueKey(response.uniqueKey);
      setAuthMode("verify-otp");
      setSuccessMessage(
        response.message ||
          "Registration successful! Please check your email for OTP."
      );
    } catch (error) {
      console.error("❌ Registration error:", error);
      throw error;
    }
  };

  const handleVerifyOtp = async () => {
    const response = await auth.verifyOtp({
      otp: formData.otp,
      uniqueKey: uniqueKey,
    });

    setSuccessMessage(response.message || "Account verified successfully!");

    setTimeout(() => {
      setAuthMode("login");
      resetForm();
      setSuccessMessage(
        "Registration completed! Please login with your credentials."
      );
    }, 2000);
  };

  const handleForgotPassword = async () => {
    const response = await auth.forgotPassword(formData.resetEmail);
    setSuccessMessage(
      response.message || "Password reset OTP sent to your email!"
    );
    setAuthMode("reset-password");
  };

  const handleResetPassword = async () => {
    const response = await auth.resetPassword({
      email: formData.resetEmail,
      otp: formData.resetOtp,
      newPassword: formData.newPassword,
    });

    setSuccessMessage(response.message || "Password reset successfully!");

    setTimeout(() => {
      setAuthMode("login");
      resetForm();
      setSuccessMessage(
        "Password updated! Please login with your new password."
      );
    }, 2000);
  };

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      const response = await auth.resendOtp(uniqueKey);
      setSuccessMessage(response.message || "OTP resent successfully!");
    } catch (error) {
      displayErrors(error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendPasswordOtp = async () => {
    setLoading(true);
    try {
      const response = await auth.resendPasswordOtp(formData.resetEmail);
      setSuccessMessage(response.message || "OTP resent successfully!");
    } catch (error) {
      displayErrors(error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      countryCode: "+91",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      tnc: false,
      otp: "",
      resetEmail: "",
      resetOtp: "",
      newPassword: "",
    });
    setErrors({});
    setSuccessMessage("");
    setUniqueKey("");
  };

  const getTitle = () => {
    switch (authMode) {
      case "login":
        return "Welcome Back";
      case "register":
        return "Create Account";
      case "verify-otp":
        return "Verify Your Email";
      case "forgot-password":
        return "Reset Password";
      case "reset-password":
        return "Set New Password";
      default:
        return "Authentication";
    }
  };

  const getSubtitle = () => {
    switch (authMode) {
      case "login":
        return "Sign in to your account to continue";
      case "register":
        return "Join us today and get started";
      case "verify-otp":
        return `Enter the verification code sent to ${formData.email}`;
      case "forgot-password":
        return "Enter your email to receive a reset code";
      case "reset-password":
        return "Enter the code and your new password";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 rounded-3xl"></div>

          {/* Content */}
          <div className="relative z-10">
            {/* Header with enhanced design */}
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/25">
                <img src={logo} className="rounded-xl" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">
                {authMode === "login" ? "Welcome Back" : getTitle()}
              </h1>
              <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">
                {authMode === "login"
                  ? "Sign in to access your account and continue your journey with us."
                  : getSubtitle()}
              </p>
            </div>

            {/* Messages with enhanced styling */}
            {errors.general && (
              <div className="mb-6 p-4 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-xl shadow-sm">
                <div className="flex items-center">
                  <FiAlertCircle className="h-5 w-5 text-red-500 mr-2" />
                  <p className="text-red-700 text-sm font-medium">
                    {errors.general}
                  </p>
                </div>
              </div>
            )}

            {successMessage && (
              <div className="mb-6 p-4 bg-green-50/80 backdrop-blur-sm border border-green-200 rounded-xl shadow-sm">
                <div className="flex items-center">
                  <AiOutlineCheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <p className="text-green-700 text-sm font-medium">
                    {successMessage}
                  </p>
                </div>
              </div>
            )}

            {/* Enhanced Form with better spacing and animations */}
            <form onSubmit={handleSubmit} className="space-y-1">
              {authMode === "login" && (
                <>
                  <div className="mb-6">
                    <InputField
                      icon={AiOutlineMail}
                      type="email"
                      placeholder="Email address"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      errors={errors}
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <PasswordField
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      errors={errors}
                      show={showPassword}
                      setShow={setShowPassword}
                      required
                    />
                  </div>
                  <div className="text-right mb-6">
                    <button
                      type="button"
                      onClick={() => setAuthMode("forgot-password")}
                      className="text-sm text-gray-400 hover:text-blue-600 hover:underline transition-all duration-200 font-medium"
                    >
                      Forgot password?
                    </button>
                  </div>
                </>
              )}

              {authMode === "register" && (
                <>
                  <div className="mb-6">
                    <InputField
                      icon={AiOutlineUser}
                      type="text"
                      placeholder="Full Name"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      errors={errors}
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <InputField
                      icon={AiOutlineMail}
                      type="email"
                      placeholder="Email address"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      errors={errors}
                      required
                    />
                  </div>
                  <div className="flex gap-4 mb-6">
                    {}
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleInputChange}
                      className="w-24 h-[55px] py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50/50 text-gray-800 font-medium transition-all duration-300"
                    >
                      <option value="+91">+91</option>
                    </select>
                    <div className="flex-1">
                      <InputField
                        icon={AiOutlinePhone}
                        type="tel"
                        placeholder="Phone Number"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        errors={errors}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <PasswordField
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      errors={errors}
                      show={showPassword}
                      setShow={setShowPassword}
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <PasswordField
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      errors={errors}
                      show={showConfirmPassword}
                      setShow={setShowConfirmPassword}
                      required
                    />
                  </div>
                  <div className="flex items-start mb-6">
                    <input
                      type="checkbox"
                      name="tnc"
                      checked={formData.tnc}
                      onChange={handleInputChange}
                      required
                      className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label className="ml-2 text-sm text-gray-700">
                      I agree to the{" "}
                      <a href="#" className="text-blue-600 hover:underline">
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </>
              )}

              {authMode === "verify-otp" && (
                <div className="space-y-6">
                  <InputField
                    icon={AiOutlineMail}
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    name="otp"
                    value={formData.otp}
                    onChange={handleInputChange}
                    errors={errors}
                    maxLength={6}
                  />
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={loading}
                      className="px-4 py-2 text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Resend OTP
                    </button>
                  </div>
                </div>
              )}

              {authMode === "forgot-password" && (
                <InputField
                  icon={AiOutlineMail}
                  type="email"
                  placeholder="Enter your email"
                  name="resetEmail"
                  value={formData.resetEmail}
                  onChange={handleInputChange}
                  errors={errors}
                />
              )}

              {authMode === "reset-password" && (
                <>
                  <InputField
                    icon={AiOutlineMail}
                    type="text"
                    placeholder="Enter OTP from email"
                    name="resetOtp"
                    value={formData.resetOtp}
                    onChange={handleInputChange}
                    errors={errors}
                    maxLength={6}
                  />
                  <PasswordField
                    name="newPassword"
                    placeholder="New Password"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    errors={errors}
                    show={showPassword}
                    setShow={setShowPassword}
                  />
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleResendPasswordOtp}
                      disabled={loading}
                      className="px-4 py-2 text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Resend OTP
                    </button>
                  </div>
                </>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm relative overflow-hidden group"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <FiLoader className="animate-spin h-5 w-5 mr-2" />
                    Processing...
                  </div>
                ) : authMode === "login" ? (
                  "Get Started"
                ) : (
                  (() => {
                    switch (authMode) {
                      case "register":
                        return "Create Account";
                      case "verify-otp":
                        return "Verify Email";
                      case "forgot-password":
                        return "Send Reset Code";
                      case "reset-password":
                        return "Reset Password";
                      default:
                        return "Submit";
                    }
                  })()
                )}
              </button>
            </form>

            {/* Social Login Buttons - Only show on login */}
            {authMode === "login" && (
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-white px-4 text-gray-500 font-medium">
                      Or continue with
                    </span>
                  </div>
                </div>
                <div className="flex justify-center space-x-3">
                  <button
                    type="button"
                    className="w-10 h-10 bg-transparent border border-gray-200 rounded-md flex items-center justify-center hover:bg-transparent hover:border-blue-500 transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="hover:border-blue-500 w-10 h-10 bg-white border border-gray-200 rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="hover:border-blue-500 w-10 h-10 bg-white border border-gray-200 rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="#000000" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Footer Links */}
            <div className="mt-6 text-center space-y-3">
              {authMode === "login" && (
                <p className="text-gray-600 text-xs">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setAuthMode("register")}
                    className="text-gray-900 font-medium hover:underline transition-all"
                  >
                    Sign up
                  </button>
                </p>
              )}

              {authMode === "register" && (
                <p className="text-gray-600 text-xs">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setAuthMode("login")}
                    className="text-gray-900 font-medium hover:underline transition-all"
                  >
                    Sign in
                  </button>
                </p>
              )}

              {(authMode === "verify-otp" ||
                authMode === "forgot-password" ||
                authMode === "reset-password") && (
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("login");
                    resetForm();
                  }}
                  className="inline-flex items-center justify-center text-gray-600 hover:text-gray-800 text-xs font-medium hover:underline transition-all"
                >
                  <AiOutlineArrowLeft className="h-4 w-4 mr-1" />
                  Back to Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
