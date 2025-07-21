import React from "react";
import {
  AiOutlineCalendar,
  AiOutlineUser,
  AiOutlineFileText,
  AiOutlineSafety,
  AiOutlineEye,
  AiOutlineWarning,
  AiOutlineInfoCircle,
  AiOutlineApi,
} from "react-icons/ai";
import { FiActivity, FiShield, FiLock } from "react-icons/fi";

const LogItem = ({ log }) => {
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const getLogIcon = (action, type) => {
    // Check by type first (more reliable)
    if (type) {
      switch (type.toLowerCase()) {
        case "auth":
        case "authentication":
        case "login":
        case "logout":
          return <AiOutlineUser className="h-4 w-4" />;
        case "security":
          return <FiShield className="h-4 w-4" />;
        case "privacy":
          return <FiLock className="h-4 w-4" />;
        case "data":
          return <AiOutlineEye className="h-4 w-4" />;
        case "consent":
          return <AiOutlineSafety className="h-4 w-4" />;
        case "api":
          return <AiOutlineApi className="h-4 w-4" />;
        case "error":
          return <AiOutlineWarning className="h-4 w-4" />;
        case "warning":
          return <AiOutlineWarning className="h-4 w-4" />;
        case "info":
          return <AiOutlineInfoCircle className="h-4 w-4" />;
        case "session":
          return <FiActivity className="h-4 w-4" />;
        default:
          return <AiOutlineFileText className="h-4 w-4" />;
      }
    }

    // Fallback to action-based detection
    if (
      action?.toLowerCase().includes("login") ||
      action?.toLowerCase().includes("auth")
    ) {
      return <AiOutlineUser className="h-4 w-4" />;
    }

    if (action?.toLowerCase().includes("security")) {
      return <FiShield className="h-4 w-4" />;
    }

    if (action?.toLowerCase().includes("privacy")) {
      return <FiLock className="h-4 w-4" />;
    }

    return <AiOutlineFileText className="h-4 w-4" />;
  };

  // Function to generate proper activity name based on log data
  const getActivityName = (log) => {
    // If action exists and is meaningful, use it
    if (
      log.action &&
      log.action.toLowerCase() !== "unknown action" &&
      log.action.trim() !== ""
    ) {
      return log.action;
    }

    // Generate name based on log type
    if (log.type) {
      switch (log.type.toLowerCase()) {
        case "auth":
        case "authentication":
          return "User Authentication";
        case "login":
          return "User Login";
        case "logout":
          return "User Logout";
        case "privacy":
          return "Privacy Check";
        case "security":
          return "Security Scan";
        case "data":
          return "Data Access";
        case "consent":
          return "Consent Management";
        case "session":
          return "Session Activity";
        case "api":
          return "API Request";
        case "error":
          return "Error Event";
        case "warning":
          return "Warning Event";
        case "info":
          return "Information Event";
        default:
          return `${
            log.type.charAt(0).toUpperCase() + log.type.slice(1)
          } Activity`;
      }
    }

    // Fallback to details if available
    if (log.details && log.details.trim() !== "") {
      // Take first part of details as activity name (up to 50 chars)
      const shortDetails =
        log.details.length > 50
          ? log.details.substring(0, 50) + "..."
          : log.details;
      return shortDetails;
    }

    // Last resort fallback
    return "System Activity";
  };

  // Function to get icon color based on log type
  const getIconColor = (action, type) => {
    if (type) {
      switch (type.toLowerCase()) {
        case "auth":
        case "authentication":
        case "login":
        case "logout":
          return "bg-blue-500/20 text-blue-600";
        case "security":
          return "bg-green-500/20 text-green-600";
        case "privacy":
          return "bg-purple-500/20 text-purple-600";
        case "data":
          return "bg-indigo-500/20 text-indigo-600";
        case "consent":
          return "bg-teal-500/20 text-teal-600";
        case "api":
          return "bg-cyan-500/20 text-cyan-600";
        case "error":
          return "bg-red-500/20 text-red-600";
        case "warning":
          return "bg-orange-500/20 text-orange-600";
        case "info":
          return "bg-blue-500/20 text-blue-600";
        case "session":
          return "bg-gray-500/20 text-gray-600";
        default:
          return "bg-blue-500/20 text-blue-600";
      }
    }

    // Fallback based on action keywords
    if (action?.toLowerCase().includes("error")) {
      return "bg-red-500/20 text-red-600";
    }
    if (action?.toLowerCase().includes("security")) {
      return "bg-green-500/20 text-green-600";
    }
    if (action?.toLowerCase().includes("privacy")) {
      return "bg-purple-500/20 text-purple-600";
    }

    return "bg-blue-500/20 text-blue-600";
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 p-3 md:p-4 bg-white/50 rounded-lg border border-white/20 hover:bg-white/70 transition-all duration-200">
      <div
        className={`p-2 rounded-lg shrink-0 ${getIconColor(
          log.action,
          log.type
        )}`}
      >
        {getLogIcon(log.action, log.type)}
      </div>
      <div className="flex-1 min-w-0 w-full sm:w-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-1 sm:space-y-0">
          <h4 className="font-medium text-gray-800 text-sm md:text-base truncate">
            {getActivityName(log)}
          </h4>
          <div className="flex items-center space-x-1 text-gray-500 text-xs md:text-sm shrink-0">
            <AiOutlineCalendar className="h-3 w-3" />
            <span className="truncate">{formatTimestamp(log.timestamp)}</span>
          </div>
        </div>
        {log.details && (
          <p className="text-xs md:text-sm text-gray-600 mt-1 line-clamp-2">
            {log.details}
          </p>
        )}
        {log.ip && (
          <p className="text-xs text-gray-500 mt-1 truncate">IP: {log.ip}</p>
        )}
      </div>
    </div>
  );
};

const LogsTable = ({ logs = [], loading = false }) => {
  if (loading) {
    return (
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-4 md:p-6">
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (!logs || logs.length === 0) {
    return (
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-4 md:p-6">
        <div className="text-center py-8">
          <AiOutlineFileText className="h-8 w-8 md:h-12 md:w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-base md:text-lg font-medium text-gray-800 mb-2">
            No Activity Logs
          </h3>
          <p className="text-sm md:text-base text-gray-600">
            Your activity logs will appear here once you start using the
            platform.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-4 md:p-6">
      <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
        Recent Activity
      </h2>
      <div className="space-y-3 max-h-64 md:max-h-96 overflow-y-auto">
        {logs.map((log, index) => (
          <LogItem key={log.id || index} log={log} />
        ))}
      </div>
    </div>
  );
};

export default LogsTable;
