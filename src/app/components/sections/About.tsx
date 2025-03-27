"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { SKILLS } from "@/lib/constants";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section
      ref={ref}
      className="relative py-8 px-4 sm:px-6 bg-gradient-to-b from-gray-900 to-gray-950 overflow-hidden"
      id="about"
    >
      {/* Holographic grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-[length:30px_30px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-bold font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 mb-2">
            About Me
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          {/* Avatar Image */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-56 lg:h-72 flex items-center justify-center"
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-400/30 shadow-md shadow-blue-500/10" />
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <img
                src="/images/samndambuki.jpeg"
                alt="Samuel Ndambuki"
                className="w-40 h-40 lg:w-48 lg:h-48 object-cover rounded-full border-2 border-blue-400/30"
              />
              <div className="absolute -inset-4 rounded-full border border-dashed border-blue-400/30 animate-spin-slow" />
            </div>
          </motion.div>

          {/* Bio and Skills */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <h3 className="text-lg font-bold font-rajdhani text-blue-400">
                Professional Summary
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                I'm a front-end engineer specializing in JavaScript, TypeScript,
                Angular, React, Next.js, Tailwind CSS, and Angular Material.
              </p>
              <p className="text-sm text-gray-300 leading-relaxed">
                My work emphasizes clean, maintainable code and seamless user
                experiences.
              </p>
            </div>

            {/* Education */}
            <div className="space-y-2">
              <h3 className="text-lg font-bold font-rajdhani text-blue-400">
                Education
              </h3>
              <div className="p-4 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 shadow">
                <h4 className="text-sm font-semibold text-white">
                  Bachelor of Science in Information Technology
                </h4>
                <p className="text-xs text-gray-400 mt-1">
                  Dedan Kimathi University of Science and Technology
                </p>
                <p className="text-xs text-purple-300 mt-1">
                  May 2019 - April 2023
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Skills Galaxy */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8"
        >
          <h3 className="text-lg font-bold font-rajdhani text-center text-blue-400 mb-4">
            My Skills Galaxy
          </h3>

          <div className="relative h-[250px] w-full max-w-xs mx-auto">
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                   w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-700
                   flex items-center justify-center text-white font-bold shadow z-0 text-xs"
            >
              SKILLS
            </div>
            {SKILLS.map((skill, index) => {
              const angle = (index * (2 * Math.PI)) / SKILLS.length;
              const radius = 80;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              const size = 6 + (skill.level / 100) * 20;

              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: x,
                    y: y,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.8 + index * 0.05,
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{ scale: 1.15 }}
                  className={`absolute top-1/2 left-1/2 rounded-full bg-gradient-to-br
                     from-blue-500 to-purple-600 flex items-center justify-center
                     text-white font-medium shadow-sm cursor-pointer group z-10`}
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                  }}
                >
                  <div className="absolute -inset-0.5 rounded-full bg-blue-500/20 group-hover:animate-ping" />
                  <span
                    className="absolute -bottom-6 whitespace-nowrap text-[9px] opacity-0
                         group-hover:opacity-100 transition-opacity duration-300
                         bg-gray-900/90 px-1 py-0.5 rounded"
                  >
                    {skill.name} ({skill.level}%)
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
