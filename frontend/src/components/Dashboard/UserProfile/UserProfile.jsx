import React from "react";
import { useAuth } from "../../../contexts/AuthContext.jsx";
import { AiOutlineUser, AiOutlineLogout } from "react-icons/ai";

const UserProfile = ({ onLogout }) => {
  const { user } = useAuth();

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-4">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-blue-500/20 text-blue-600 rounded-lg">
          <AiOutlineUser className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-800">
            {user?.fullName || user?.name || "User"}
          </h3>
          <p className="text-sm text-gray-600">{user?.email || "No email"}</p>
        </div>
        <button
          onClick={onLogout}
          className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-all duration-200"
          title="Logout"
        >
          <AiOutlineLogout className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
