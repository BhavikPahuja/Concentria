import { useEffect, useState } from "react";

type Props = {
  text: string;
  speed?: number;
  pause?: number;
};

const TypewriterHeading = ({ text, speed = 40, pause = 1200 }: Props) => {
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (typing) {
      if (displayed.length < text.length) {
        timeout = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 1)), speed);
      } else {
        timeout = setTimeout(() => setTyping(false), pause);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(text.slice(0, displayed.length - 1)), speed / 2);
      } else {
        timeout = setTimeout(() => setTyping(true), speed);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, text, speed, pause]);

  return (
    <h2 className="mb-6 font-mono text-base text-cyan-300 bg-black/60 rounded px-3 py-2 tracking-widest shadow-inner border-l-4 border-cyan-400 animate-fadeIn">
      {displayed}
      <span className="animate-blink">|</span>
    </h2>
  );
};

export default TypewriterHeading;