"use client";
import { useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { SiReact, SiNextdotjs, SiMongodb, SiTailwindcss, SiJavascript, SiFigma } from "react-icons/si";
import { useTheme } from "@/context/ThemeContext";

const skills = [
  { name: "React", icon: <SiReact className="text-blue-400 text-3xl" />, level: 90 },
  { name: "Next.js", icon: <SiNextdotjs className="text-white text-3xl" />, level: 85 },
  { name: "MongoDB", icon: <SiMongodb className="text-green-500 text-3xl" />, level: 80 },
  { name: "TailwindCSS", icon: <SiTailwindcss className="text-sky-400 text-3xl" />, level: 90 },
  { name: "JavaScript", icon: <SiJavascript className="text-yellow-400 text-3xl" />, level: 95 },
  { name: "Figma", icon: <SiFigma className="text-pink-500 text-3xl" />, level: 75 },
];

export default function Skills() {
  const { darkMode } = useTheme();
  const controls = useAnimation();
  const ref = useInView({ once: true, margin: "-100px" });

  useEffect(() => {
    if (ref) controls.start("visible");
  }, [ref, controls]);

  return (
    <section className={`relative w-full max-w-6xl mx-auto py-20 px-6 sm:px-8 md:px-12`}>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-16 bg-clip-text text-transparent ${
          darkMode ? "bg-gradient-to-r from-purple-300 to-cyan-200" : "bg-gradient-to-r from-purple-600 to-blue-400"
        }`}
      >
        My Skills
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 sm:gap-10">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.8 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-4">
              {skill.icon}
              <span className="font-medium text-lg">{skill.name}</span>
              <span className={`ml-auto text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{skill.level}%</span>
            </div>
            <div className={`w-full h-3 rounded-full overflow-hidden ${darkMode ? "bg-slate-800" : "bg-gray-200"}`}>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-sm"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
