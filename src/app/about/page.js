"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { SiNextdotjs, SiMongodb, SiReact, SiTailwindcss, SiJavascript, SiFigma } from "react-icons/si";
import { useTheme } from "@/context/ThemeContext";

export default function About() {
  const { darkMode } = useTheme();

  const skills = [
    { name: "React", icon: <SiReact className="text-blue-400 text-3xl" />, level: 90 },
    { name: "Next.js", icon: <SiNextdotjs className="text-white text-3xl" />, level: 85 },
    { name: "MongoDB", icon: <SiMongodb className="text-green-500 text-3xl" />, level: 80 },
    { name: "TailwindCSS", icon: <SiTailwindcss className="text-sky-400 text-3xl" />, level: 90 },
    { name: "JavaScript", icon: <SiJavascript className="text-yellow-400 text-3xl" />, level: 95 },
    { name: "Figma", icon: <SiFigma className="text-pink-500 text-3xl" />, level: 75 },
  ];

  const floatingIcons = [SiReact, SiNextdotjs, SiMongodb, SiTailwindcss, SiJavascript, SiFigma];

  return (
    <section
      className={`relative min-h-screen flex flex-col items-center justify-center px-6 py-16 transition-colors duration-500 ${
        darkMode ? "bg-[#050506] text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Floating Neon Tech Icons */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {floatingIcons.map((Icon, i) => (
          <motion.div
            key={i}
            className="absolute w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-md"
            style={{
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 90}%`,
              opacity: 0.25, // opacity kam
            }}
            animate={{
              y: ["0%", "-15%", "0%"],
              x: ["0%", "10%", "0%"],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          >
            <Icon
              size={28}
              color={
                Icon === SiReact
                  ? "#61dafb"
                  : Icon === SiNextdotjs
                  ? "#fff"
                  : Icon === SiMongodb
                  ? "#4DB33D"
                  : Icon === SiTailwindcss
                  ? "#0ea5e9"
                  : Icon === SiJavascript
                  ? "#facc15"
                  : "#F24E1E"
              }
            />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center"
        >
          <div className="relative w-60 h-60 md:w-72 md:h-72 rounded-full overflow-hidden shadow-[0_0_60px_rgba(59,130,246,0.7)] border-4 border-blue-500/20 hover:scale-105 transition-transform duration-500">
            <Image
              src="/me.jpg"
              alt="Shahzaib"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* About Text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold">
            About{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              Me
            </span>
          </h1>
          <p className={`text-lg leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            I’m a passionate <span className="text-blue-400 font-semibold">Full-Stack Developer</span> skilled in{" "}
            <span className="font-medium">Next.js, MongoDB, React, TailwindCSS</span> and building scalable applications.  
            I love solving <span className="text-indigo-400 font-semibold">real-world problems</span> with clean and efficient code.
          </p>
          <p className={`text-lg leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            Always eager to learn, improve and collaborate on exciting projects that make an impact. 🚀
          </p>
        </motion.div>
      </div>

      {/* Skills Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="mt-16 max-w-4xl w-full relative z-10"
      >
        <h2 className="text-3xl font-bold text-center mb-10">
          My{" "}
          <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Skills
          </span>
        </h2>
        
        <div className="space-y-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  {skill.icon}
                  <span className="font-medium">{skill.name}</span>
                </div>
                <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{skill.level}%</span>
              </div>
              <div className={`w-full h-3 rounded-full overflow-hidden ${darkMode ? "bg-slate-800" : "bg-gray-200"}`}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.3 }}
                  className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-md"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
