"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useAnimation,
  AnimatePresence,
} from "framer-motion";
import { PROJECTS } from "@/lib/constants";
import { FiGithub, FiExternalLink } from "react-icons/fi";

type Project = (typeof PROJECTS)[0];
type Filter = "all" | "react" | "angular" | "typescript";

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(PROJECTS);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: isMobile ? 0.1 : 0.3 });
  const controls = useAnimation();

  // Check for mobile on mount and resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  useEffect(() => {
    if (filter === "all") {
      setFilteredProjects(PROJECTS);
    } else {
      setFilteredProjects(
        PROJECTS.filter((project) =>
          project.technologies.map((t) => t.toLowerCase()).includes(filter)
        )
      );
    }
  }, [filter]);

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "angular", label: "Angular" },
    { id: "react", label: "React" },
    { id: "typescript", label: "TS" },
  ];

  return (
    <section
      ref={ref}
      className="relative py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-950 overflow-hidden"
      id="projects"
    >
      {/* Decorative elements - reduced opacity for better mobile visibility */}
      <div className="absolute inset-0 overflow-hidden opacity-5 md:opacity-10">
        <div className="absolute -left-40 -top-40 w-80 h-80 rounded-full bg-purple-500 filter blur-3xl opacity-10" />
        <div className="absolute -right-40 -bottom-40 w-80 h-80 rounded-full bg-blue-500 filter blur-3xl opacity-10" />
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
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 mb-3 md:mb-4">
            My Projects
          </h2>
          <div className="w-16 md:w-24 h-0.5 md:h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
        </motion.div>

        {/* Filter buttons - made more compact for mobile */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12 px-2"
        >
          {filters.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
                filter === id
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {label}
            </button>
          ))}
        </motion.div>

        {/* Projects grid - adjusted for mobile */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative group"
                onMouseEnter={() =>
                  !isMobile && setHoveredProject(project.id.toString())
                }
                onMouseLeave={() => !isMobile && setHoveredProject(null)}
                onTouchStart={() =>
                  isMobile && setHoveredProject(project.id.toString())
                }
                onTouchEnd={() => isMobile && setHoveredProject(null)}
              >
                <div className="absolute inset-0 rounded-lg md:rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-600/10 border border-blue-500/20 shadow-lg shadow-blue-500/10 group-hover:shadow-xl group-hover:shadow-blue-500/20 transition-all" />

                <div className="relative h-full bg-gray-800/50 backdrop-blur-sm rounded-lg md:rounded-xl border border-gray-700/50 overflow-hidden transition-all group-hover:border-blue-500/50">
                  {/* Project image - adjusted height for mobile */}
                  <div className="h-40 sm:h-44 md:h-48 bg-gray-700 relative overflow-hidden">
                    <div
                      className="absolute inset-0 bg-[url('/images/project-placeholder.jpg')] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                      style={{ backgroundSize: "cover" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-gray-900/20" />

                    {/* Tech badges - smaller on mobile */}
                    <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 flex flex-wrap gap-1 md:gap-2">
                      {project.technologies
                        .slice(0, isMobile ? 2 : 3)
                        .map((tech) => (
                          <span
                            key={tech}
                            className="px-1.5 py-0.5 md:px-2 md:py-1 text-[10px] md:text-xs font-medium rounded bg-gray-800/90 text-blue-400"
                          >
                            {isMobile ? tech.substring(0, 4) : tech}
                          </span>
                        ))}
                      {isMobile && project.technologies.length > 2 && (
                        <span className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-gray-800/90 text-blue-400">
                          +{project.technologies.length - 2}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Project content - adjusted padding for mobile */}
                  <div className="p-4 md:p-6">
                    <h3 className="text-base md:text-lg font-bold text-white mb-1 md:mb-2 line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-300 mb-3 md:mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Links - adjusted size for mobile */}
                    <div className="flex items-center gap-3 md:gap-4 mt-4 md:mt-6">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 md:gap-2 text-xs md:text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiGithub className="text-sm md:text-base" />
                        <span>Code</span>
                      </a>
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 md:gap-2 text-xs md:text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FiExternalLink className="text-sm md:text-base" />
                          <span>Demo</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Hover overlay - only shows on mobile when tapped */}
                  <AnimatePresence>
                    {hoveredProject === project.id.toString() && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm flex items-center justify-center"
                      >
                        <motion.div
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          className="text-white text-sm md:text-base font-bold"
                        >
                          View Details
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 md:py-12"
          >
            <div className="text-lg md:text-xl text-gray-400 mb-3 md:mb-4">
              No projects found
            </div>
            <button
              onClick={() => setFilter("all")}
              className="px-4 py-1.5 md:px-6 md:py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-xs md:text-sm text-white font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all"
            >
              Show All Projects
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
