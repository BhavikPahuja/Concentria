import React from "react";
import {
  AiOutlineHome,
  AiOutlineFileText,
  AiOutlineBarChart,
  AiOutlineUser,
  AiOutlineLogout,
} from "react-icons/ai";
import logo from "../../../media/Design a modern, fut.png";

const Sidebar = ({ activeTab, setActiveTab, user, onLogout }) => {
  const navigationItems = [
    { id: "overview", label: "Overview", icon: AiOutlineHome },
    { id: "logs", label: "Activity Logs", icon: AiOutlineFileText },
    { id: "analytics", label: "Analytics", icon: AiOutlineBarChart },
    { id: "profile", label: "Profile", icon: AiOutlineUser },
  ];

  const userEmail = user?.email || "";
  const userName = userEmail.substring(0, userEmail.indexOf("@")) || "User";

  return (
    <div className="w-64 bg-white/30 backdrop-blur-xl border-r border-white/20 p-6">
      {/* Logo */}
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
          <img src={logo} className="w-8 h-8 rounded-lg" alt="Logo" />
        </div>
        <span className="text-xl font-bold text-gray-800">Concentria</span>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === item.id
                ? "bg-white/50 text-blue-600 shadow-lg backdrop-blur-sm"
                : "text-gray-600 hover:bg-white/30 hover:text-gray-800"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* User Info & Logout */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-white/40 backdrop-blur-sm rounded-xl p-4 mb-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <AiOutlineUser className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800 flex justify-center items-center">
                {userName}
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-red-600 hover:bg-red-50/50 rounded-xl transition-all duration-200"
        >
          <AiOutlineLogout className="h-5 w-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
