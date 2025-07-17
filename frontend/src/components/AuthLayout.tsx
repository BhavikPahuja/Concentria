import ParallaxBackground from "./ParallaxBackground";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AuthLayout = ({ children }: Props) => (
  <div className="relative min-h-screen w-screen flex items-center justify-center font-orbitron bg-black">
    <ParallaxBackground />
    <main className="relative z-10 flex items-center justify-center w-full min-h-screen">
      {children}
    </main>
  </div>
);

export default AuthLayout;