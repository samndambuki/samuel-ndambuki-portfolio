"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { FiSend, FiMail, FiLinkedin, FiGithub, FiPhone } from "react-icons/fi";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Replace with your form submission logic
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  return (
    <section
      ref={ref}
      className="relative py-12 px-4 sm:px-6 bg-gradient-to-b from-gray-950 to-gray-900 overflow-hidden"
      id="contact"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-blue-500 filter blur-3xl opacity-20" />
        <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-purple-500 filter blur-3xl opacity-20" />
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
            Get In Touch
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Contact Form - Always appears first on mobile */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/2 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 shadow-lg"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label
                  htmlFor="name"
                  className="block text-xs font-medium text-gray-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 text-sm bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Your name"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-gray-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 text-sm bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="message"
                  className="block text-xs font-medium text-gray-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 text-sm bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Your message here..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full mt-4 py-2 rounded-lg text-sm font-medium text-white transition-all ${
                  isSubmitting
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-md hover:shadow-blue-500/20"
                }`}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <span className="flex items-center justify-center">
                    <FiSend className="mr-2" /> Send Message
                  </span>
                )}
              </button>

              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-xs text-green-400 text-center"
                >
                  Message sent successfully!
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-400 text-center"
                >
                  Something went wrong. Please try again.
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Contact Info - Appears second on mobile */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full lg:w-1/2 space-y-6"
          >
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 shadow-lg">
              <h3 className="text-lg font-bold font-rajdhani text-blue-400 mb-4">
                Contact Information
              </h3>

              <div className="space-y-4">
                {/* Email */}
                <motion.a
                  whileHover={{ x: 3 }}
                  href="mailto:samuelndambuki401@gmail.com"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 transition-all">
                    <FiMail />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Email</p>
                    <p className="text-sm text-white font-medium group-hover:text-blue-400 transition-all">
                      samuelndambuki401@gmail.com
                    </p>
                  </div>
                </motion.a>

                {/* LinkedIn */}
                <motion.a
                  whileHover={{ x: 3 }}
                  href="https://www.linkedin.com/in/samuel-ndambuki-40026b1a0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 transition-all">
                    <FiLinkedin />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">LinkedIn</p>
                    <p className="text-sm text-white font-medium group-hover:text-blue-400 transition-all">
                      Samuel Ndambuki
                    </p>
                  </div>
                </motion.a>

                {/* GitHub */}
                <motion.a
                  whileHover={{ x: 3 }}
                  href="https://github.com/sanmdambuki"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 transition-all">
                    <FiGithub />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">GitHub</p>
                    <p className="text-sm text-white font-medium group-hover:text-blue-400 transition-all">
                      @samndambuki
                    </p>
                  </div>
                </motion.a>

                {/* Phone */}
                <motion.a
                  whileHover={{ x: 3 }}
                  href="tel:+254797334258"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 transition-all">
                    <FiPhone />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Phone</p>
                    <p className="text-sm text-white font-medium group-hover:text-blue-400 transition-all">
                      +254 797 334 258
                    </p>
                  </div>
                </motion.a>
              </div>

              {/* Location - Only shown on larger screens */}
              <div className="mt-8 hidden sm:block">
                <h4 className="text-sm font-semibold text-white mb-3">
                  Based in
                </h4>
                <div className="relative h-36 rounded-lg overflow-hidden border border-gray-700/50">
                  <div className="absolute inset-0 bg-[url('/images/world-map.svg')] bg-center bg-no-repeat opacity-30" />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative">
                      <div className="w-6 h-6 rounded-full bg-blue-500/80 border-2 border-white animate-ping" />
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-500 border border-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-0 right-0 text-center">
                    <p className="inline-block px-3 py-1 bg-gray-800/80 backdrop-blur-sm rounded-lg text-xs text-white font-medium">
                      Nairobi, Kenya
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile-only location */}
            <div className="sm:hidden bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 shadow-lg">
              <h4 className="text-sm font-semibold text-white mb-2">
                Based in
              </h4>
              <div className="relative h-28 rounded-lg overflow-hidden border border-gray-700/50">
                <div className="absolute inset-0 bg-[url('/images/world-map.svg')] bg-center bg-no-repeat opacity-30" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-5 h-5 rounded-full bg-blue-500/80 border border-white animate-ping" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-blue-500 border border-white" />
                  </div>
                </div>
                <div className="absolute bottom-2 left-0 right-0 text-center">
                  <p className="inline-block px-2 py-1 bg-gray-800/80 backdrop-blur-sm rounded text-xs text-white font-medium">
                    Nairobi, Kenya
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
