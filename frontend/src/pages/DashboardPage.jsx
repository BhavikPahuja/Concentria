import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { logsApiService } from "../services/logsApi.js";
import { FiActivity, FiAlertTriangle } from "react-icons/fi";

// Import our new modular components
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import DashboardHeader from "../components/Dashboard/Header/DashboardHeader";
import MainContent from "../components/Dashboard/MainContent/MainContent";
import UserProfile from "../components/Dashboard/UserProfile/UserProfile";
import Notification from "../components/Common/Notification";

function DashboardPage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [demoMode, setDemoMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchDashboardData();

    // Listen for token refresh events
    const handleTokenRefreshed = () => {
      setNotification({
        message: "Session renewed automatically",
        type: "success",
      });
    };

    const handleTokenExpired = () => {
      setNotification({
        message: "Session expired. Please login again.",
        type: "error",
      });
    };

    window.addEventListener("auth:token-refreshed", handleTokenRefreshed);
    window.addEventListener("auth:token-expired", handleTokenExpired);

    return () => {
      window.removeEventListener("auth:token-refreshed", handleTokenRefreshed);
      window.removeEventListener("auth:token-expired", handleTokenExpired);
    };
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      if (demoMode) {
        // Demo data for testing
        const demoLogs = [
          {
            id: 1,
            timestamp: new Date().toISOString(),
            action: "User Login",
            details: "Successful login from dashboard",
            type: "auth",
          },
          {
            id: 2,
            timestamp: new Date(Date.now() - 86400000).toISOString(), // Yesterday
            action: "Data Privacy Check",
            details: "Privacy settings reviewed",
            type: "privacy",
          },
          {
            id: 3,
            timestamp: new Date().toISOString(),
            action: "Security Scan",
            details: "System security validation",
            type: "security",
          },
        ];

        setTimeout(() => {
          setLogs(demoLogs);
          setLoading(false);
        }, 1000);
        return;
      }

      console.log("🔍 Starting dashboard data fetch...");
      console.log("🔍 Current user:", user);
      const storedToken = localStorage.getItem("accessToken");
      console.log("🔍 Stored token:", storedToken ? "Present" : "Missing");
      if (storedToken) {
        console.log("🔍 Token length:", storedToken.length);
        console.log("🔍 Token preview:", storedToken.substring(0, 50) + "...");
      }

      const allLogs = await logsApiService.getAllLogs();
      console.log("🔍 Dashboard: Received logs:", allLogs);
      console.log("🔍 Dashboard: Logs is array:", Array.isArray(allLogs));
      console.log("🔍 Dashboard: Logs length:", allLogs?.length || 0);

      setLogs(Array.isArray(allLogs) ? allLogs : []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);

      if (error.status === 401) {
        setError(
          "Backend authentication issue detected. This is likely due to the database changes."
        );
      } else {
        setError("Failed to load dashboard data. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAllLogs = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete all logs? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      await logsApiService.deleteAllLogs();
      await fetchDashboardData(); // Refresh data
    } catch (error) {
      console.error("Error deleting logs:", error);
      setError("Failed to delete logs. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Temporary debug function to clear auth data
  const handleClearAuth = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    console.log("🧹 All auth data cleared");
    setError("Authentication cleared. You will be redirected to login.");

    // Small delay to show the message, then redirect
    setTimeout(() => {
      window.location.href = "/auth";
    }, 1500);
  };

  // Test token refresh functionality
  const testTokenRefresh = async () => {
    try {
      setNotification({
        message: "Testing token refresh...",
        type: "info"
      });

      // First, try to make a request that might trigger refresh
      const logs = await logsApiService.getAllLogs();
      
      setNotification({
        message: "Token refresh test completed successfully",
        type: "success"
      });
      
      console.log("🔄 Token refresh test successful. Logs received:", logs?.length || 0);
    } catch (error) {
      console.error("🔄 Token refresh test failed:", error);
      setNotification({
        message: `Token refresh test failed: ${error.message || 'Unknown error'}`,
        type: "error"
      });
    }
  };

  // Test backend connectivity
  const testBackendConnection = async () => {
    try {
      console.log("🔍 Testing backend connectivity...");
      const response = await fetch(
        "https://concentria-fh4s.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "test@test.com",
            password: "wrongpassword",
          }),
        }
      );

      const data = await response.json();
      console.log("🔍 Backend response:", response.status, data);

      if (response.status === 400 || response.status === 401) {
        setError(
          `Backend is responding (${response.status}). The authentication issue is specific to your user account or token.`
        );
      } else {
        setError(
          `Backend connectivity test: ${response.status} - ${
            data.message || "Unknown response"
          }`
        );
      }
    } catch (err) {
      console.error("🔍 Backend test failed:", err);
      setError("Backend server appears to be down or unreachable.");
    }
  };

  // Debug function to check current auth state
  const debugAuthState = () => {
    const token = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const storedUser = localStorage.getItem("user");

    console.log("🔍 DEBUG AUTH STATE:");
    console.log(
      "🔍 Access Token:",
      token ? `Present (${token.length} chars)` : "Missing"
    );
    console.log(
      "🔍 Refresh Token:",
      refreshToken ? `Present (${refreshToken.length} chars)` : "Missing"
    );
    console.log(
      "🔍 Stored User:",
      storedUser ? JSON.parse(storedUser) : "Missing"
    );
    console.log("🔍 Auth Context User:", user);

    // Try to decode JWT token to show it's valid structure
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        console.log("🔍 Token Payload:", payload);
        console.log("🔍 Token Expires:", new Date(payload.exp * 1000));
        console.log(
          "🔍 Token Valid Until:",
          payload.exp > Date.now() / 1000 ? "Not Expired" : "EXPIRED"
        );
      } catch (e) {
        console.log("🔍 Token Decode Error:", e.message);
      }
    }

    setError(
      `Auth Debug: Token=${token ? "Present" : "Missing"}, User=${
        user ? "Present" : "Missing"
      }. Backend auth middleware appears broken - rejecting ALL tokens.`
    );
  };

  // Test the actual logs API call with manual headers
  const testLogsApiCall = async () => {
    const token = localStorage.getItem("accessToken");
    console.log("🧪 MANUAL LOGS API TEST:");
    console.log(
      "🧪 Token:",
      token ? `${token.substring(0, 20)}...` : "Missing"
    );

    try {
      const response = await fetch(
        "https://concentria-fh4s.onrender.com/api/logs",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      console.log("🧪 Manual API Response:", response.status, data);
      console.log("🧪 Response Headers:", [...response.headers.entries()]);

      if (response.ok) {
        setError(
          `Manual API Test: SUCCESS! Got ${
            Array.isArray(data) ? data.length : 0
          } logs`
        );
      } else {
        setError(
          `BACKEND AUTH BROKEN: Even fresh tokens get 401. Status: ${
            response.status
          } - ${data.message || "Unknown error"}`
        );
      }
    } catch (err) {
      console.error("🧪 Manual API Test Error:", err);
      setError(`Manual API Test: ERROR - ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
          <div className="flex items-center space-x-3">
            <FiActivity className="animate-spin h-6 w-6 text-blue-600" />
            <span className="text-gray-700 font-medium">
              Loading dashboard...
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`
          fixed lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-50
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }
        `}
        >
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onLogout={handleLogout}
            user={user}
            onClose={() => setSidebarOpen(false)}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <DashboardHeader
            activeTab={activeTab}
            onRefresh={fetchDashboardData}
            onDeleteAllLogs={handleDeleteAllLogs}
            showDeleteButton={activeTab === "logs" && logs.length > 0}
            onMenuClick={() => setSidebarOpen(true)}
          />

          {/* Error Message */}
          {error && (
            <div className="mx-4 lg:mx-6 mb-4 lg:mb-6 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-xl p-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-3 lg:space-y-0">
                <div className="flex items-start lg:items-center">
                  <FiAlertTriangle className="h-5 w-5 text-red-500 mr-2 mt-0.5 lg:mt-0 flex-shrink-0" />
                  <div>
                    <p className="text-red-700 font-medium text-sm lg:text-base">
                      {error}
                    </p>
                    {error.includes("Authentication") && (
                      <p className="text-red-600 text-xs lg:text-sm mt-1">
                        This might be due to recent database changes. Try
                        logging out and back in.
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {error.includes("Backend authentication") && (
                    <>
                      <button
                        onClick={() => {
                          setDemoMode(true);
                          setError("");
                          fetchDashboardData();
                        }}
                        className="px-2 lg:px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-xs lg:text-sm"
                      >
                        Demo Mode
                      </button>
                      <button
                        onClick={debugAuthState}
                        className="px-2 lg:px-3 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-xs lg:text-sm"
                      >
                        Debug
                      </button>
                      <button
                        onClick={testLogsApiCall}
                        className="px-2 lg:px-3 py-1 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors text-xs lg:text-sm"
                      >
                        Test API
                      </button>
                      <button
                        onClick={testBackendConnection}
                        className="px-2 lg:px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-xs lg:text-sm"
                      >
                        Test Backend
                      </button>
                      <button
                        onClick={handleClearAuth}
                        className="px-2 lg:px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-xs lg:text-sm"
                      >
                        Clear Auth
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => setError("")}
                    className="px-2 lg:px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-xs lg:text-sm"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <MainContent
            activeTab={activeTab}
            logs={logs}
            logsLoading={loading}
          />
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}

export default DashboardPage;
