import React, { useState, useEffect } from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineExclamationCircle,
  AiOutlineClose,
} from "react-icons/ai";

const Notification = ({ message, type = "info", onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose?.(), 300);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: "bg-green-500/20 text-green-600 border-green-500/30",
    error: "bg-red-500/20 text-red-600 border-red-500/30",
    info: "bg-blue-500/20 text-blue-600 border-blue-500/30",
  };

  const icons = {
    success: AiOutlineCheckCircle,
    error: AiOutlineExclamationCircle,
    info: AiOutlineCheckCircle,
  };

  const Icon = icons[type];

  if (!isVisible) return null;

  return (
    <div
      className={`
      fixed top-4 right-4 z-50 flex items-center space-x-3 p-4 rounded-xl 
      backdrop-blur-xl border shadow-xl max-w-md transform transition-all duration-300
      ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}
      ${colors[type]}
    `}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      <p className="text-sm font-medium flex-1">{message}</p>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => onClose?.(), 300);
        }}
        className="p-1 hover:bg-white/20 rounded-lg transition-colors"
      >
        <AiOutlineClose className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Notification;
