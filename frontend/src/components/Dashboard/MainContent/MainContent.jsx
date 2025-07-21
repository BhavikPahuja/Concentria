import React from "react";
import StatsCards from "../Stats/StatsCards";
import LogsTable from "../Logs/LogsTable.jsx";

const MainContent = ({ activeTab, logs = [], logsLoading = false }) => {
  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div>
            <StatsCards logs={logs} />
          </div>
        );

      case "logs":
        return (
          <div>
            <LogsTable logs={logs} loading={logsLoading} />
          </div>
        );

      case "analytics":
        return (
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
              Analytics Dashboard
            </h2>
            <div className="text-center py-8 md:py-12">
              <p className="text-gray-600">Analytics features coming soon...</p>
            </div>
          </div>
        );

      case "profile":
        return (
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
              Profile Settings
            </h2>
            <div className="text-center py-8 md:py-12">
              <p className="text-gray-600">Profile settings coming soon...</p>
            </div>
          </div>
        );

      default:
        return (
          <div>
            <StatsCards logs={logs} />
            <LogsTable logs={logs.slice(0, 5)} loading={logsLoading} />
          </div>
        );
    }
  };

  return <div className="flex-1 p-4 md:p-6">{renderTabContent()}</div>;
};

export default MainContent;
