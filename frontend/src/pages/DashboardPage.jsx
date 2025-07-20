import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { logsApiService } from "../services/logsApi.js";
import { FiActivity, FiAlertTriangle } from "react-icons/fi";

// Import our new modular components
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import DashboardHeader from "../components/Dashboard/Header/DashboardHeader";
import MainContent from "../components/Dashboard/MainContent/MainContent";
import UserProfile from "../components/Dashboard/UserProfile/UserProfile";

function DashboardPage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const allLogs = await logsApiService.getAllLogs();
      setLogs(Array.isArray(allLogs) ? allLogs : []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError("Failed to load dashboard data. Please try again.");
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
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={handleLogout}
          user={user}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <DashboardHeader
            activeTab={activeTab}
            onRefresh={fetchDashboardData}
            onDeleteAllLogs={handleDeleteAllLogs}
            showDeleteButton={activeTab === "logs" && logs.length > 0}
          />

          {/* Error Message */}
          {error && (
            <div className="mx-6 mb-6 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-xl p-4">
              <div className="flex items-center">
                <FiAlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                <p className="text-red-700 font-medium">{error}</p>
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
    </div>
  );
}

export default DashboardPage;
