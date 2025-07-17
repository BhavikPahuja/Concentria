import React, { useState } from 'react';
import '@fontsource/orbitron';
import AuthLayout from '../components/AuthLayout';
import TypewriterHeading from '../components/TypewriterHeading';
import AuthForm from '../components/AuthForm';

type AuthType = "login" | "register";
type AuthPageProps = {
  setIsLoggedIn: (value: boolean) => void;
};

const AuthPage: React.FC<AuthPageProps> = ({ setIsLoggedIn }) => {
  const [type, setType] = useState<AuthType>("login");

  const cardBase = "w-full max-w-md px-8 bg-white/10 backdrop-blur-xl rounded-2xl border-2 border-cyan-400 shadow-[0_0_32px_8px_#00fff7] animate-fadeIn transition-all duration-500";
  const cardPadding = type === "register" ? "py-14" : "py-10";

  return (
    <AuthLayout>
      <div className={`${cardBase} ${cardPadding}`}>
        <h1 className="text-3xl font-extrabold font-orbitron text-center bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-500 bg-clip-text text-transparent animate-gradientFlicker tracking-widest drop-shadow-[0_0_8px_#00fff7] mb-5">
          Welcome to <span className="text-cyan-300">CONCENTRIA</span>
        </h1>
        <TypewriterHeading text="We Are Here To Secure..." />
        <AuthForm type={type} setIsLoggedIn={setIsLoggedIn} />
        <div className="flex justify-center mt-4 space-x-2">
          <button
            className={`px-4 py-1 rounded-full font-orbitron text-xs tracking-widest transition-all duration-300 ${
              type === "login"
                ? "bg-cyan-400 text-black shadow-[0_0_8px_2px_#00fff7]"
                : "bg-transparent text-cyan-300 border border-cyan-400"
            }`}
            onClick={() => setType("login")}
          >
            Login
          </button>
          <button
            className={`px-4 py-1 rounded-full font-orbitron text-xs tracking-widest transition-all duration-300 ${
              type === "register"
                ? "bg-cyan-400 text-black shadow-[0_0_8px_2px_#00fff7]"
                : "bg-transparent text-cyan-300 border border-cyan-400"
            }`}
            onClick={() => setType("register")}
          >
            Register
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default AuthPage;