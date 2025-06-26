import React, { InputHTMLAttributes } from "react";

type Props = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const NeonInput: React.FC<Props> = ({ label, ...props }) => (
  <div className="mb-5">
    <label className="block mb-2 text-xs font-semibold tracking-widest text-cyan-300 uppercase">{label}</label>
    <input
      className="w-full px-4 py-2 bg-transparent border-2 border-cyan-400 rounded-lg outline-none text-cyan-100 font-orbitron focus:ring-2 focus:ring-cyan-400 focus:shadow-[0_0_12px_2px_#00fff7] transition-all duration-300 placeholder-cyan-500"
      {...props}
    />
  </div>
);

export default NeonInput;