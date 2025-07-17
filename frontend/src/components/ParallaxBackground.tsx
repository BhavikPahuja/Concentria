import { useEffect, useRef } from "react";

const STAR_COUNT = 80;

function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const ParallaxBackground = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stars = ref.current?.querySelectorAll<HTMLDivElement>(".star");
    const handleMove = (e: MouseEvent) => {
      if (!stars) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      stars.forEach((star, i) => {
        const depth = (i % 10) + 1;
        star.style.transform = `translate(${x * depth * 4}px, ${y * depth * 4}px)`;
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-0 overflow-hidden bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#232526] animate-bgMove"
    >
      {[...Array(STAR_COUNT)].map((_, i) => (
        <div
          key={i}
          className="star absolute rounded-full bg-white opacity-40"
          style={{
            width: `${random(1, 2.5)}px`,
            height: `${random(1, 2.5)}px`,
            top: `${random(0, 100)}%`,
            left: `${random(0, 100)}%`,
            filter: `blur(${random(0, 1.5)}px)`,
            animation: `twinkle ${2 + random(0, 3)}s infinite alternate`,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(0,255,255,0.10)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_70%,rgba(255,0,255,0.08)_0%,transparent_70%)] pointer-events-none" />
    </div>
  );
};

export default ParallaxBackground;