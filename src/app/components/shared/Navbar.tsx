"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiMoon, FiSun } from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setDarkMode(true);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gray-900/90 backdrop-blur-md border-b border-gray-800"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="#home" className="flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center"
            >
              <span className="text-lg font-bold font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Samuel Ndambuki
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-xs font-medium transition-colors"
                  >
                    {item.name}
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-blue-400 focus:outline-none p-2"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <FiX className="w-5 h-5" />
              ) : (
                <FiMenu className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-2 pt-2 pb-4 space-y-2 bg-gray-900 border-t border-gray-800">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href}>
                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(false)}
                    className="text-gray-300 hover:bg-gray-800 hover:text-blue-400 block px-3 py-3 rounded-md text-sm font-medium transition-colors"
                  >
                    {item.name}
                  </motion.div>
                </Link>
              ))}

              <div className="pt-2 border-t border-gray-800">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleDarkMode}
                  className="flex items-center text-gray-300 hover:text-blue-400 px-3 py-3 rounded-md text-sm font-medium w-full"
                >
                  {darkMode ? (
                    <>
                      <FiSun className="w-4 h-4 mr-3" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <FiMoon className="w-4 h-4 mr-3" />
                      Dark Mode
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
