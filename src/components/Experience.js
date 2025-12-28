"use client";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const experiences = [
  {
    year: "2024",
    role: "Full Stack Developer Intern",
    company: "Supersoft Technologies",
    details: "Worked on full-stack .NET Framework projects, handling both backend and frontend development, implementing responsive user interfaces, and optimizing application performance",
  },
  {
    year: "2025",
    role: "Full Stack Developer",
    company: "Freelance",
    details: "Built multiple full-stack web apps using Next.js, Node.js,  MongoDB, TailwindCSS with API integrations.",
  },
];

function useTilt(strength = 15) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, (v) => `${(-v / strength).toFixed(2)}deg`);
  const rotateY = useTransform(x, (v) => `${(v / strength).toFixed(2)}deg`);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    function handleMove(e) {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - rect.left;
      const dy = e.clientY - rect.top;
      x.set(dx - rect.width / 2);
      y.set(dy - rect.height / 2);
    }
    function handleLeave() {
      x.set(0);
      y.set(0);
    }
    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerleave", handleLeave);
    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", handleLeave);
    };
  }, [x, y]);

  return { ref, rotateX, rotateY };
}

export default function Experience() {
  const { darkMode } = useTheme();

  return (
    <section className="relative w-full max-w-5xl mx-auto py-20 px-6 sm:px-8 md:px-12">
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
        Experience
      </motion.h2>

      <div className="relative">
        <div className="absolute left-6 top-0 w-1 h-full bg-gradient-to-b from-purple-400 to-blue-400 rounded-full hidden sm:block" />
        <div className="space-y-10 ml-0 sm:ml-12">
          {experiences.map((exp, i) => {
            const { ref, rotateX, rotateY } = useTilt(18);
            return (
              <motion.div
                key={i}
                ref={ref}
                style={{ rotateX, rotateY }}
                initial={{ opacity: 0, y: 50, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.7, ease: "easeOut" }}
                className={`relative rounded-2xl p-6 sm:p-8 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer ${
                  darkMode
                    ? "bg-gradient-to-br from-white/5 via-white/10 to-white/5 border border-white/10 backdrop-blur-lg"
                    : "bg-white border border-gray-200"
                }`}
              >
                {/* Dot */}
                <motion.div
                  className={`absolute -left-7 top-6 w-4 h-4 rounded-full border-2 ${
                    darkMode ? "border-purple-300 bg-purple-500" : "border-blue-500 bg-blue-500"
                  }`}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                />

                {/* Year */}
                <p className={`text-sm font-semibold mb-1 ${darkMode ? "text-purple-300" : "text-blue-500"}`}>
                  {exp.year}
                </p>

                {/* Role & Company */}
                <h3 className={`text-lg sm:text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-black"}`}>
                  {exp.role} @ {exp.company}
                </h3>

                {/* Details */}
                <p className={`text-sm sm:text-base leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  {exp.details}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
