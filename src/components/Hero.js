// components/Hero.js
"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col md:flex-row justify-center items-center text-center md:text-left bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a] px-6">
      {/* Left Side - Text */}
      <div className="flex-1 space-y-6">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Hi, I’m{" "}
          <span className="text-blue-500">Shahzaib Lodhi</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          A passionate{" "}
          <span className="font-semibold text-blue-400">Full-Stack Developer</span> specializing in{" "}
          <span className="font-semibold text-indigo-400">Next.js & MongoDB</span>.  
          I build modern, responsive, and scalable web apps.
        </motion.p>

        <motion.a
          href="/projects"
          className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-blue-600/40 hover:scale-105 transition transform"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          🚀 View My Work
        </motion.a>
      </div>

      {/* Right Side - Circle Image */}
      <motion.div
        className="flex-1 flex justify-center mt-10 md:mt-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-blue-500">
          <img
            src="/me.jpg"
            alt="Shahzaib"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </section>
  );
}
