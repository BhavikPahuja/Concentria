import React, { ButtonHTMLAttributes } from "react";

const GlowButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
  <button
    className="relative w-full py-2 mt-2 font-bold tracking-widest text-black uppercase bg-cyan-300 rounded-lg shadow-lg transition-all duration-300 hover:bg-cyan-400 hover:shadow-[0_0_16px_4px_#00fff7] focus:outline-none focus:ring-2 focus:ring-cyan-400"
    {...props}
  >
    <span className="relative z-10">{children}</span>
    <span className="absolute inset-0 rounded-lg pointer-events-none animate-pulse bg-cyan-300 opacity-10" />
  </button>
);

export default GlowButton;