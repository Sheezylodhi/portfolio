"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function About() {
  const { darkMode } = useTheme();

  return (
    <section
      className={`relative min-h-screen flex flex-col items-center justify-center px-6 sm:px-8 md:px-12 py-16 ${
        darkMode ? "text-white" : "text-black"
      }`}
    >
      <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row items-center gap-10 md:gap-16">
        {/* Profile Image */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex-shrink-0"
        >
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-2 border-blue-500/20">
            <Image src="/me.jpg" alt="Shahzaib" fill className="object-cover" priority />
          </div>
        </motion.div>

        {/* About Text */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex-1 space-y-4 text-center md:text-left"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
            About{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              Me
            </span>
          </h1>
          <p className={`${darkMode ? "text-gray-300" : "text-gray-700"} text-base sm:text-lg md:text-lg`}>
            I am a Full-Stack Developer specializing in <span className="font-semibold text-blue-400">Next.js, React, Node.js, MongoDB</span>.
          </p>
          <p className={`${darkMode ? "text-gray-300" : "text-gray-700"} text-base sm:text-lg md:text-lg`}>
            I build scalable and efficient web applications, focusing on performance and user experience.
          </p>
          <p className={`${darkMode ? "text-gray-300" : "text-gray-700"} text-base sm:text-lg md:text-lg`}>
            Always learning new technologies and creating solutions that make an impact.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
