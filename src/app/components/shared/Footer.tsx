"use client";

import { motion } from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiArrowUp,
} from "react-icons/fi";
import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative bg-gray-900 border-t border-gray-800">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -left-40 -top-40 w-80 h-80 rounded-full bg-blue-500 filter blur-3xl opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-base font-bold font-orbitron text-white">
              Samuel Ndambuki
            </h3>
            <p className="text-sm text-gray-400">
              Frontend Engineer specializing in JavaScript, TypeScript, and
              modern web frameworks.
            </p>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ y: -3 }}
                href="https://github.com/sanmdambuki"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="GitHub"
              >
                <FiGithub className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ y: -3 }}
                href="https://www.linkedin.com/in/samuel-ndambuki-40026b1a0/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="LinkedIn"
              >
                <FiLinkedin className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-base font-bold font-orbitron text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="#about">
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-400 mr-2"></span>
                    About
                  </motion.div>
                </Link>
              </li>
              <li>
                <Link href="#experience">
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-400 mr-2"></span>
                    Experience
                  </motion.div>
                </Link>
              </li>
              <li>
                <Link href="#projects">
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-400 mr-2"></span>
                    Projects
                  </motion.div>
                </Link>
              </li>
              <li>
                <Link href="#contact">
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-400 mr-2"></span>
                    Contact
                  </motion.div>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-base font-bold font-orbitron text-white">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FiMail className="text-blue-400 mt-1 mr-3 flex-shrink-0" />
                <a
                  href="mailto:samuelndambuki401@gmail.com"
                  className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
                >
                  samuelndambuki401@gmail.com
                </a>
              </li>
              <li className="flex items-start">
                <FiPhone className="text-blue-400 mt-1 mr-3 flex-shrink-0" />
                <a
                  href="tel:+254797334258"
                  className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
                >
                  +254 797 334 258
                </a>
              </li>
            </ul>
          </div>

          {/* Back to top */}
          <div className="md:flex md:justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-700 flex items-center justify-center text-blue-400 transition-all"
              aria-label="Back to top"
            >
              <FiArrowUp className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Samuel Ndambuki. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 mt-4 md:mt-0">
            Built with Next.js, Tailwind CSS, and ❤️
          </p>
        </div>
      </div>
    </footer>
  );
}
