"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { SiNextdotjs, SiMongodb, SiReact, SiTailwindcss, SiJavascript } from "react-icons/si";

export default function About() {
  const skills = [
    { name: "React", icon: <SiReact className="text-blue-400 text-3xl" />, level: 90 },
    { name: "Next.js", icon: <SiNextdotjs className="text-white text-3xl" />, level: 85 },
    { name: "MongoDB", icon: <SiMongodb className="text-green-500 text-3xl" />, level: 80 },
    { name: "TailwindCSS", icon: <SiTailwindcss className="text-sky-400 text-3xl" />, level: 90 },
    { name: "JavaScript", icon: <SiJavascript className="text-yellow-400 text-3xl" />, level: 95 },
  ];

  return (
    <section className="min-h-screen bg-slate-950 text-gray-300 flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <div className="relative w-60 h-60 md:w-72 md:h-72 rounded-full overflow-hidden shadow-[0_0_40px_rgba(59,130,246,0.7)] border-4 border-blue-500/20">
            <Image
              src="/me.jpg" // 👈 apni image ka path
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
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            About <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">Me</span>
          </h1>
          <p className="text-lg leading-relaxed text-gray-400 mb-4">
            I’m a passionate <span className="text-blue-400 font-semibold">Full-Stack Developer</span> skilled in{" "}
            <span className="font-medium">Next.js, MongoDB, React, TailwindCSS</span> and building scalable applications.  
            I love solving <span className="text-indigo-400">real-world problems</span> with clean and efficient code.
          </p>
          <p className="text-lg leading-relaxed text-gray-400">
            Always eager to learn, improve and collaborate on exciting projects that make an impact. 🚀
          </p>
        </motion.div>
      </div>

      {/* Skills Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-16 max-w-4xl w-full"
      >
        <h2 className="text-3xl font-bold text-center mb-10">
          My <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">Skills</span>
        </h2>
        
        <div className="space-y-6">
          {skills.map((skill, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  {skill.icon}
                  <span className="font-medium">{skill.name}</span>
                </div>
                <span className="text-sm text-gray-400">{skill.level}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.3 }}
                  className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
