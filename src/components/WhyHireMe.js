"use client";
import { motion } from "framer-motion";
import { FaLaptopCode, FaLightbulb, FaClock, FaUsers } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";

const points = [
  {
    icon: <FaLaptopCode className="text-blue-400 text-3xl" />,
    title: "Expertise",
    description:
      "Strong expertise in Full-Stack development with modern technologies like Next.js, React, Node.js, MongoDB, and TailwindCSS.",
  },
  {
    icon: <FaLightbulb className="text-yellow-400 text-3xl" />,
    title: "Creativity",
    description:
      "Efficient, innovative, and always ready to learn new skills and implement creative solutions.",
  },
  {
    icon: <FaClock className="text-purple-400 text-3xl" />,
    title: "Reliability",
    description:
      "Reliable and timely delivery with attention to detail and high-quality standards.",
  },
  {
    icon: <FaUsers className="text-green-400 text-3xl" />,
    title: "Collaboration",
    description:
      "Collaborative and communicative in team projects, ensuring smooth workflow and excellent coordination.",
  },
];

export default function WhyHireMe() {
  const { darkMode } = useTheme();

  return (
    <section className="relative w-full max-w-7xl mx-auto py-20 px-6 sm:px-8 md:px-12">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-16 bg-clip-text text-transparent ${
          darkMode
            ? "bg-gradient-to-r from-purple-300 to-cyan-200"
            : "bg-gradient-to-r from-purple-600 to-blue-400"
        }`}
      >
        Why Hire Me
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
        {points.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.8, ease: "easeOut" }}
            className={`relative rounded-2xl p-6 sm:p-8 text-center shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer ${
              darkMode
                ? "bg-white/5 border border-white/10 backdrop-blur-lg"
                : "bg-white border border-gray-200"
            }`}
          >
            <div className="flex justify-center mb-4">{p.icon}</div>
            <h3
              className={`text-lg sm:text-xl font-bold mb-2 ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              {p.title}
            </h3>
            <p
              className={`text-sm sm:text-base leading-relaxed ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {p.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
