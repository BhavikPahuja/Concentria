import React from "react";
import { AiOutlineSafety, AiOutlineEye, AiOutlineUser } from "react-icons/ai";
import { FiActivity } from "react-icons/fi";

const StatsCard = ({
  icon: Icon,
  title,
  value,
  description,
  color = "blue",
}) => {
  const colorClasses = {
    blue: "bg-blue-500/20 text-blue-600",
    green: "bg-green-500/20 text-green-600",
    orange: "bg-orange-500/20 text-orange-600",
    purple: "bg-purple-500/20 text-purple-600",
  };

  return (
    <div className="h-auto bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-4 md:p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105">
      <div className="flex items-center space-x-3 md:space-x-4">
        <div className={`p-2 md:p-3 rounded-xl ${colorClasses[color]}`}>
          <Icon className="h-5 w-5 md:h-6 md:w-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base md:text-lg font-semibold text-gray-800 truncate">
            {title}
          </h3>
          <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
            {value}
          </p>
          <p className="text-xs md:text-sm text-gray-600 mt-1 truncate">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const StatsCards = ({ logs = [] }) => {
  const stats = React.useMemo(() => {
    const totalLogs = logs.length;
    const todayLogs = logs.filter((log) => {
      const logDate = new Date(log.timestamp);
      const today = new Date();
      return logDate.toDateString() === today.toDateString();
    }).length;

    const privacyLogs = logs.filter(
      (log) =>
        log.action?.toLowerCase().includes("privacy") ||
        log.action?.toLowerCase().includes("data")
    ).length;

    const securityLogs = logs.filter(
      (log) =>
        log.action?.toLowerCase().includes("security") ||
        log.action?.toLowerCase().includes("login") ||
        log.action?.toLowerCase().includes("auth")
    ).length;

    return {
      total: totalLogs,
      today: todayLogs,
      privacy: privacyLogs,
      security: securityLogs,
    };
  }, [logs]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mb-6">
      <StatsCard
        icon={FiActivity}
        title="Total Activities"
        value={stats.total}
        description="All time activity count"
        color="blue"
      />
      <StatsCard
        icon={AiOutlineEye}
        title="Today's Activities"
        value={stats.today}
        description="Activities from today"
        color="green"
      />
      <StatsCard
        icon={AiOutlineSafety}
        title="Privacy Events"
        value={stats.privacy}
        description="Privacy-related activities"
        color="purple"
      />
      <StatsCard
        icon={AiOutlineUser}
        title="Security Events"
        value={stats.security}
        description="Security-related activities"
        color="orange"
      />
    </div>
  );
};

export default StatsCards;
