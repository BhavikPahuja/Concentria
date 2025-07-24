import React from "react";
import {
  AiOutlineCalendar,
  AiOutlineFileText,
  AiOutlineCompass,
  AiOutlineCopy,
  AiOutlineCamera,
  AiOutlineAudio,
  AiOutlineSafety,
} from "react-icons/ai";
import { FiClipboard, FiRotateCcw, FiDownload } from "react-icons/fi";

const LogItem = ({ log }) => {
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const getLogIcon = (type) => {
    // Only the 10 specific log types from browser extension
    switch (type?.toLowerCase()) {
      case "geolocation":
        return <AiOutlineCompass className="h-4 w-4" />;
      case "clipboard":
        return <FiClipboard className="h-4 w-4" />;
      case "deviceorientation":
        return <FiRotateCcw className="h-4 w-4" />;
      case "permissions":
        return <AiOutlineSafety className="h-4 w-4" />;
      case "cut":
      case "copy":
      case "paste":
        return <AiOutlineCopy className="h-4 w-4" />;
      case "microphone":
        return <AiOutlineAudio className="h-4 w-4" />;
      case "camera":
        return <AiOutlineCamera className="h-4 w-4" />;
      case "download":
        return <FiDownload className="h-4 w-4" />;
      default:
        return <AiOutlineFileText className="h-4 w-4" />;
    }
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

    // Generate name based on the 10 specific log types only
    switch (log.type?.toLowerCase()) {
      case "geolocation":
        return "Location API Access";
      case "clipboard":
        return "Clipboard API Usage";
      case "deviceorientation":
        return "Device Orientation Listeners";
      case "permissions":
        return "Permission API Queries";
      case "cut":
        return "Cut Operations";
      case "copy":
        return "Copy Operations";
      case "paste":
        return "Paste Operations";
      case "microphone":
        return "Microphone Access";
      case "camera":
        return "Camera Access";
      case "download":
        return "File Download";
      default:
        return log.type
          ? `${log.type.charAt(0).toUpperCase() + log.type.slice(1)} Activity`
          : "System Activity";
    }
  };

  // Function to get icon color based on log type
  const getIconColor = (type) => {
    switch (type?.toLowerCase()) {
      case "geolocation":
        return "bg-orange-500/20 text-orange-600";
      case "clipboard":
        return "bg-purple-500/20 text-purple-600";
      case "deviceorientation":
        return "bg-indigo-500/20 text-indigo-600";
      case "permissions":
        return "bg-yellow-500/20 text-yellow-600";
      case "cut":
      case "copy":
      case "paste":
        return "bg-cyan-500/20 text-cyan-600";
      case "microphone":
        return "bg-red-500/20 text-red-600";
      case "camera":
        return "bg-pink-500/20 text-pink-600";
      case "download":
        return "bg-green-500/20 text-green-600";
      default:
        return "bg-blue-500/20 text-blue-600";
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 p-3 md:p-4 bg-white/50 rounded-lg border border-white/20 hover:bg-white/70 transition-all duration-200">
      <div className={`p-2 rounded-lg shrink-0 ${getIconColor(log.type)}`}>
        {getLogIcon(log.type)}
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
        {log.userEmail && (
          <p className="text-xs md:text-sm text-gray-600 mt-1">
            User: {log.userEmail}
          </p>
        )}
        {log.url && (
          <p className="text-xs text-gray-500 mt-1 truncate">
            🌐 <span className="text-blue-600">{log.url}</span>
          </p>
        )}
        {log.filename && (
          <p className="text-xs text-gray-500 mt-1 truncate">
            📁 <span className="text-green-600">{log.filename}</span>
          </p>
        )}
      </div>
    </div>
  );
};

const LogsTable = ({ logs = [], loading = false }) => {
  // Add debugging for the 10 specific log types
  console.log("🔍 LogsTable: Received logs:", logs);

  if (logs && logs.length > 0) {
    const logsByType = logs.reduce((acc, log) => {
      acc[log.type] = (acc[log.type] || 0) + 1;
      return acc;
    }, {});
    console.log("📊 LogsTable: Privacy logs by type:", logsByType);
  }

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
            No Privacy Logs
          </h3>
          <p className="text-sm md:text-base text-gray-600">
            Privacy activity logs from your browser extension will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-4 md:p-6">
      <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
        Privacy Activity
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Showing {logs.length} privacy log{logs.length !== 1 ? "s" : ""} from
        your browser extension
      </p>
      <div className="space-y-3 max-h-64 md:max-h-96 overflow-y-auto">
        {logs.map((log, index) => (
          <LogItem key={log._id || log.id || index} log={log} />
        ))}
      </div>
    </div>
  );
};

export default LogsTable;
