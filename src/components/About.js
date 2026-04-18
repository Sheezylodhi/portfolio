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
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-blue-500/10 shadow-2xl">
            <Image 
              src="/me.jpg" 
              alt="Shahzaib" 
              fill 
              className="object-cover hover:scale-105 transition-transform duration-500" 
              priority 
            />
          </div>
        </motion.div>

        {/* About Text */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex-1 space-y-6 text-center md:text-left"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
            About{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              Me
            </span>
          </h1>

          <div className="space-y-4">
            <p className={`${darkMode ? "text-gray-300" : "text-gray-700"} text-lg md:text-xl font-medium`}>
              I am a dedicated <span className="text-blue-400">Full-Stack Developer</span> & <span className="text-indigo-400">WordPress Specialist</span> with a passion for building high-end digital solutions.
            </p>

            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} text-base sm:text-lg leading-relaxed`}>
              My expertise spans across the modern web ecosystem, including <span className="font-semibold text-blue-400">Next.js, React, and Node.js</span> for custom applications, as well as complex <span className="font-semibold text-indigo-400">WordPress</span> development for scalable business solutions.
            </p>

            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} text-base sm:text-lg leading-relaxed`}>
              Whether it's designing a pixel-perfect UI in <span className="font-semibold italic">Figma</span>, optimizing <span className="font-semibold text-emerald-500">MongoDB</span> databases, or crafting seamless user experiences, I focus on delivering clean code and exceptional performance.
            </p>

            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} text-base sm:text-lg leading-relaxed`}>
              I don’t just build websites; I create digital experiences that help brands grow and succeed in the modern world.
            </p>
          </div>

          {/* Optional: Brief Skill Tags */}
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-6">
            {["Next.js", "WordPress", "React", "MongoDB", "Tailwind"].map((skill) => (
              <span key={skill} className={`px-4 py-1 rounded-full text-sm font-medium border ${darkMode ? "border-white/10 bg-white/5" : "border-black/10 bg-black/5"}`}>
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}