"use client";
import { motion } from "framer-motion";
import { SiReact, SiNextdotjs, SiMongodb, SiTailwindcss, SiJavascript, SiFigma } from "react-icons/si";
import { FaWordpress } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";

export default function Skills() {
  const { darkMode } = useTheme();

  // Skills array ko component ke andar rakha taake darkMode access ho sake
  const skills = [
    { name: "JavaScript", icon: <SiJavascript className="text-yellow-400 text-3xl" />, level: 95 },
    { 
      name: "React / Next.js", 
      icon: <SiNextdotjs className={`${darkMode ? "text-white" : "text-black"} text-3xl`} />, 
      level: 90 
    },
    { name: "WordPress", icon: <FaWordpress className="text-blue-500 text-3xl" />, level: 85 },
    { name: "TailwindCSS", icon: <SiTailwindcss className="text-sky-400 text-3xl" />, level: 90 },
    { name: "MongoDB", icon: <SiMongodb className="text-green-500 text-3xl" />, level: 80 },
    { name: "UI Design (Figma)", icon: <SiFigma className="text-pink-500 text-3xl" />, level: 75 },
  ];

  return (
    <section className="relative w-full max-w-6xl mx-auto py-20 px-6 sm:px-8 md:px-12">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-16 bg-clip-text text-transparent ${
          darkMode ? "bg-gradient-to-r from-purple-300 to-cyan-200" : "bg-gradient-to-r from-purple-600 to-blue-400"
        }`}
      >
        Technical Expertise
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-x-12 gap-y-10">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
            className="group space-y-3"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                {skill.icon}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight">{skill.name}</span>
                <span className={`text-xs uppercase tracking-widest font-semibold ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                  Proficiency
                </span>
              </div>
              <span className={`ml-auto font-mono text-lg ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                {skill.level}%
              </span>
            </div>

            <div className={`w-full h-2.5 rounded-full overflow-hidden ${darkMode ? "bg-slate-800" : "bg-gray-200"}`}>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                transition={{ duration: 1.2, delay: 0.3, ease: "circOut" }}
                className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}