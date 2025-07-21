import React from "react";
import {
  AiOutlineCalendar,
  AiOutlineUser,
  AiOutlineFileText,
} from "react-icons/ai";

const LogItem = ({ log }) => {
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const getLogIcon = (action) => {
    if (
      action?.toLowerCase().includes("login") ||
      action?.toLowerCase().includes("auth")
    ) {
      return <AiOutlineUser className="h-4 w-4" />;
    }
    return <AiOutlineFileText className="h-4 w-4" />;
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 p-3 md:p-4 bg-white/50 rounded-lg border border-white/20 hover:bg-white/70 transition-all duration-200">
      <div className="p-2 bg-blue-500/20 text-blue-600 rounded-lg shrink-0">
        {getLogIcon(log.action)}
      </div>
      <div className="flex-1 min-w-0 w-full sm:w-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-1 sm:space-y-0">
          <h4 className="font-medium text-gray-800 text-sm md:text-base truncate">
            {log.action || "Unknown Action"}
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
