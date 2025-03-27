"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useAnimation,
  AnimatePresence,
} from "framer-motion";
import { EXPERIENCE } from "@/lib/constants";
import { FiChevronDown, FiExternalLink } from "react-icons/fi";

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
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 to-gray-900 overflow-hidden"
      id="experience"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -left-40 -top-40 w-80 h-80 rounded-full bg-blue-500 filter blur-3xl opacity-10" />
        <div className="absolute -right-40 -bottom-40 w-80 h-80 rounded-full bg-purple-500 filter blur-3xl opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 mb-4">
            Professional Journey
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500/20 via-purple-500/50 to-blue-500/20" />

          {/* Experience items */}
          <div className="space-y-12">
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
                  className={`absolute top-6 left-4 w-4 h-4 rounded-full border-4 border-blue-500 bg-gray-900 z-10 transform -translate-x-1/2 md:left-1/2 md:-translate-x-1/2 ${
                    index === expandedIndex ? "ring-4 ring-blue-500/30" : ""
                  }`}
                />

                <div
                  className={`ml-10 md:ml-0 md:w-1/2 ${
                    index % 2 === 0
                      ? "md:mr-auto md:pr-10 md:pl-0"
                      : "md:ml-auto md:pl-10 md:pr-0"
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`bg-gray-800/50 backdrop-blur-sm rounded-xl border ${
                      index === expandedIndex
                        ? "border-blue-500/50 shadow-lg shadow-blue-500/10"
                        : "border-gray-700/50"
                    } overflow-hidden transition-all cursor-pointer`}
                    onClick={() => toggleExpand(index)}
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-white">
                            {exp.role}
                          </h3>
                          <p className="text-blue-400">{exp.company}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-400 bg-gray-700/50 px-2 py-1 rounded">
                            {exp.period}
                          </span>
                          <motion.span
                            animate={{
                              rotate: expandedIndex === index ? 180 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <FiChevronDown className="text-gray-400" />
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
                            className="mt-4"
                          >
                            <div className="space-y-4">
                              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                                {exp.description.map((item, i) => (
                                  <li key={i}>{item}</li>
                                ))}
                              </ul>

                              <div className="pt-2">
                                <div className="flex flex-wrap gap-2">
                                  {exp.technologies.map((tech, i) => (
                                    <span
                                      key={i}
                                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20"
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
          className="mt-20"
        >
          <h3 className="text-2xl md:text-3xl font-bold font-rajdhani text-center text-blue-400 mb-8">
            Technologies I've Worked With
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[
              { name: "JavaScript", icon: "js" },
              { name: "TypeScript", icon: "ts" },
              { name: "React", icon: "react" },
              { name: "Next.js", icon: "next" },
              { name: "Angular", icon: "angular" },
              { name: "Tailwind CSS", icon: "tailwind" },
              { name: "Node.js", icon: "node" },
              { name: "Express.js", icon: "express" },
              { name: "SQL", icon: "sql" },
              { name: "Git", icon: "git" },
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50 flex flex-col items-center hover:border-blue-500/30 transition-all"
              >
                <div className="w-12 h-12 mb-3 flex items-center justify-center">
                  <div
                    className={`w-10 h-10 bg-[url('/images/tech-icons/${tech.icon}.svg')] bg-contain bg-no-repeat bg-center`}
                  />
                </div>
                <span className="text-sm font-medium text-white">
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
