import React, { useState, useEffect } from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineExclamationCircle,
  AiOutlineInfoCircle,
  AiOutlineClose,
} from "react-icons/ai";

const Toast = ({ message, type = "info", duration = 5000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose?.(), 300); // Allow fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: AiOutlineCheckCircle,
    error: AiOutlineExclamationCircle,
    info: AiOutlineInfoCircle,
  };

  const colors = {
    success: "bg-green-500/20 text-green-600 border-green-500/30",
    error: "bg-red-500/20 text-red-600 border-red-500/30",
    info: "bg-blue-500/20 text-blue-600 border-blue-500/30",
  };

  const Icon = icons[type];

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-50 transform transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
      }`}
    >
      <div
        className={`
        flex items-center space-x-3 p-4 rounded-xl backdrop-blur-xl border shadow-xl max-w-md
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
    </div>
  );
};

export default Toast;
