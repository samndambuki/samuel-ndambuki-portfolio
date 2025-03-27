"use client";

import { useEffect, useRef } from "react";
import Particles from "../ui/Particles";
import Typewriter from "../ui/Typewriter";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { left, top, width, height } =
        heroRef.current.getBoundingClientRect();

      const x = (clientX - left) / width;
      const y = (clientY - top) / height;

      heroRef.current.style.setProperty("--mouse-x", x.toString());
      heroRef.current.style.setProperty("--mouse-y", y.toString());
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden bg-gray-950 flex items-center justify-center"
      style={{
        background:
          "radial-gradient(circle at calc(var(--mouse-x, 0.5) * 100%) calc(var(--mouse-y, 0.5) * 100%), rgba(79, 70, 229, 0.1), rgba(15, 23, 42, 1))",
      }}
    >
      <Particles count={500} />

      <div className="relative z-10 text-center px-4">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
          SAMUEL NDAMBUKI
        </h1>

        <div className="text-2xl md:text-4xl font-medium mb-8">
          <Typewriter
            texts={[
              "Frontend Engineer",
              "JavaScript Developer",
              "TypeScript Expert",
              "Angular Specialist",
              "React Developer",
              "Next.js Engineer",
            ]}
            delay={100}
          />
        </div>

        <button className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold text-lg shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 animate-glow">
          Let's Build Something Amazing
        </button>
      </div>
    </section>
  );
}
