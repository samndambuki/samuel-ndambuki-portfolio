"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useAnimation,
  AnimatePresence,
} from "framer-motion";
import { EXPERIENCE } from "@/lib/constants";
import { FiChevronDown } from "react-icons/fi";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiAngular,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiGit,
} from "react-icons/si";
import { MdOutlineDesignServices } from "react-icons/md";

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section
      ref={ref}
      className="relative py-12 px-4 sm:px-6 bg-gradient-to-b from-gray-950 to-gray-900 overflow-hidden"
      id="experience"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -left-40 -top-40 w-80 h-80 rounded-full bg-blue-500 filter blur-3xl opacity-10" />
        <div className="absolute -right-40 -bottom-40 w-80 h-80 rounded-full bg-purple-500 filter blur-3xl opacity-10" />
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
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 mb-3">
            Professional Journey
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500/20 via-purple-500/50 to-blue-500/20" />

          {/* Experience items */}
          <div className="space-y-8">
            {EXPERIENCE.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial="hidden"
                animate={controls}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div
                  className={`absolute top-6 left-4 w-3 h-3 rounded-full border-3 border-blue-500 bg-gray-900 z-10 transform -translate-x-1/2 md:left-1/2 md:-translate-x-1/2 ${
                    index === expandedIndex ? "ring-3 ring-blue-500/30" : ""
                  }`}
                />

                <div
                  className={`ml-8 md:ml-0 md:w-1/2 ${
                    index % 2 === 0
                      ? "md:mr-auto md:pr-8 md:pl-0"
                      : "md:ml-auto md:pl-8 md:pr-0"
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className={`bg-gray-800/50 backdrop-blur-sm rounded-lg border ${
                      index === expandedIndex
                        ? "border-blue-500/50 shadow-md shadow-blue-500/10"
                        : "border-gray-700/50"
                    } overflow-hidden transition-all cursor-pointer`}
                    onClick={() => toggleExpand(index)}
                  >
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold text-white">
                            {exp.role}
                          </h3>
                          <p className="text-sm text-blue-400">{exp.company}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-xs text-gray-400 bg-gray-700/50 px-2 py-0.5 rounded">
                            {exp.period}
                          </span>
                          <motion.span
                            animate={{
                              rotate: expandedIndex === index ? 180 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <FiChevronDown className="text-gray-400 text-sm" />
                          </motion.span>
                        </div>
                      </div>

                      <AnimatePresence>
                        {expandedIndex === index && (
                          <motion.div
                            initial="collapsed"
                            animate="open"
                            exit="collapsed"
                            variants={{
                              open: { opacity: 1, height: "auto" },
                              collapsed: { opacity: 0, height: 0 },
                            }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="mt-3"
                          >
                            <div className="space-y-3">
                              <ul className="list-disc pl-4 space-y-1 text-sm text-gray-300">
                                {exp.description.map((item, i) => (
                                  <li key={i}>{item}</li>
                                ))}
                              </ul>

                              <div className="pt-1">
                                <div className="flex flex-wrap gap-1">
                                  {exp.technologies.map((tech, i) => (
                                    <span
                                      key={i}
                                      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skills visualization */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12"
        >
          <h3 className="text-xl sm:text-2xl font-bold font-rajdhani text-center text-blue-400 mb-6">
            Technologies I've Worked With
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {[
              {
                name: "JavaScript",
                icon: <SiJavascript className="text-yellow-400 text-xl" />,
              },
              {
                name: "TypeScript",
                icon: <SiTypescript className="text-blue-500 text-xl" />,
              },
              {
                name: "React",
                icon: <SiReact className="text-blue-400 text-xl" />,
              },
              {
                name: "Next.js",
                icon: (
                  <SiNextdotjs className="text-black dark:text-white text-xl" />
                ),
              },
              {
                name: "Angular",
                icon: <SiAngular className="text-red-500 text-xl" />,
              },
              {
                name: "Tailwind CSS",
                icon: <SiTailwindcss className="text-cyan-400 text-xl" />,
              },
              {
                name: "Node.js",
                icon: <SiNodedotjs className="text-green-500 text-xl" />,
              },
              {
                name: "Express.js",
                icon: (
                  <SiExpress className="text-gray-800 dark:text-gray-200 text-xl" />
                ),
              },
              {
                name: "SQL",
                icon: <SiPostgresql className="text-blue-600 text-xl" />,
              },
              {
                name: "Git",
                icon: <SiGit className="text-orange-500 text-xl" />,
              },
              {
                name: "Angular Material",
                icon: (
                  <MdOutlineDesignServices className="text-blue-400 text-xl" />
                ),
              },
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-md p-3 border border-gray-700/50 flex flex-col items-center hover:border-blue-500/30 transition-all"
              >
                <div className="w-8 h-8 mb-2 text-xl flex items-center justify-center">
                  {tech.icon}
                </div>
                <span className="text-xs font-medium text-white text-center">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
