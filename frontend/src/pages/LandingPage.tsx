import { Link } from "react-router-dom";
import ParallaxBackground from "../components/ParallaxBackground";

const LandingPage = () => (
  <div className="relative min-h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#232526]">
    <ParallaxBackground />
    <h1 className="text-5xl md:text-6xl font-orbitron font-extrabold text-center bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_16px_#00fff7] mb-6 z-10 animate-gradientFlicker">
      Welcome to <span className="text-cyan-300">CONCENTRIA</span>
    </h1>
    <p className="text-lg md:text-2xl text-cyan-100 mb-10 text-center z-10 max-w-2xl px-4">
        “Watch the watchers.<br />
        Take back control of your digital presence.”
    </p>
    <Link
      to="/dashboard"
      className="px-8 py-3 rounded-lg bg-cyan-400 text-black font-bold text-lg shadow-lg hover:bg-cyan-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 z-10 hover:shadow-[0_0_16px_4px_#00fff7] focus:shadow-[0_0_16px_4px_#00fff7] active:scale-95 transition-all duration-700"
    >
      Get Started
    </Link>
  </div>
);

export default LandingPage;