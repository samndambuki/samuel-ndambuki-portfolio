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
type Filter = "all" | "react" | "angular" | "typescript" | "nextjs";

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(PROJECTS);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

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
    { id: "all", label: "All Projects" },
    { id: "react", label: "React" },
    { id: "angular", label: "Angular" },
    { id: "typescript", label: "TypeScript" },
    { id: "nextjs", label: "Next.js" },
  ];

  return (
    <section
      ref={ref}
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-950 overflow-hidden"
      id="projects"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
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
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 mb-4">
            My Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === id
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {label}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                onMouseEnter={() => setHoveredProject(project.id.toString())}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-600/10 border border-blue-500/20 shadow-lg shadow-blue-500/10 group-hover:shadow-xl group-hover:shadow-blue-500/20 transition-all" />

                <div className="relative h-full bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden transition-all group-hover:border-blue-500/50">
                  {/* Project image */}
                  <div className="h-48 bg-gray-700 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/images/project-placeholder.jpg')] bg-cover bg-center group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-gray-900/20" />

                    {/* Tech badges */}
                    <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs font-medium rounded bg-gray-800/90 text-blue-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mb-4">{project.description}</p>

                    {/* Links */}
                    <div className="flex items-center gap-4 mt-6">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiGithub className="text-lg" />
                        <span>View Code</span>
                      </a>
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FiExternalLink className="text-lg" />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Hover overlay */}
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
                          className="text-white text-lg font-bold"
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
            className="text-center py-12"
          >
            <div className="text-2xl text-gray-400 mb-4">No projects found</div>
            <button
              onClick={() => setFilter("all")}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all"
            >
              Show All Projects
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
