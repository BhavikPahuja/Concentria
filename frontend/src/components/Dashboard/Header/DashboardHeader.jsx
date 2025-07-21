import React from "react";
import { AiOutlineReload } from "react-icons/ai";
import { FiTrash2, FiMenu } from "react-icons/fi";

const DashboardHeader = ({
  activeTab,
  onRefresh,
  onDeleteAllLogs,
  showDeleteButton = false,
  onMenuClick,
}) => {
  const getTabInfo = () => {
    switch (activeTab) {
      case "overview":
        return {
          title: "Dashboard Overview",
          subtitle: "Monitor your privacy and security metrics",
        };
      case "logs":
        return {
          title: "Activity Logs",
          subtitle: "View and manage your activity logs",
        };
      case "analytics":
        return {
          title: "Analytics",
          subtitle: "Analyze your privacy patterns",
        };
      case "profile":
        return {
          title: "Profile Settings",
          subtitle: "Manage your account settings",
        };
      default:
        return {
          title: "Dashboard",
          subtitle: "Welcome to your dashboard",
        };
    }
  };

  const { title, subtitle } = getTabInfo();

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-4 md:p-6 mb-6">
      <div className="flex items-center justify-between">
        {/* Mobile menu button */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-600 rounded-xl transition-all duration-200"
          >
            <FiMenu className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-1 md:mb-2">
              {title}
            </h1>
            <p className="text-sm md:text-base text-gray-600 hidden sm:block">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex space-x-2 md:space-x-3">
          <button
            onClick={onRefresh}
            className="px-3 py-2 md:px-4 md:py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-600 rounded-xl transition-all duration-200 flex items-center space-x-1 md:space-x-2"
          >
            <AiOutlineReload className="h-4 w-4" />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          {showDeleteButton && (
            <button
              onClick={onDeleteAllLogs}
              className="px-3 py-2 md:px-4 md:py-2 bg-red-500/20 hover:bg-red-500/30 text-red-600 rounded-xl transition-all duration-200 flex items-center space-x-1 md:space-x-2"
            >
              <FiTrash2 className="h-4 w-4" />
              <span className="hidden sm:inline">Clear All</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
