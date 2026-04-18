"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaReact, FaWordpress } from "react-icons/fa";
import { SiNextdotjs, SiMongodb, SiFigma, SiTailwindcss, SiJavascript, SiReact } from "react-icons/si";
import { useTheme } from "@/context/ThemeContext";

const roles = [
  "Full-Stack Developer",
  "Next.js Specialist",
  "WordPress Expert",
  "Frontend Engineer",
  "Backend Developer",
  "UI/UX Focused Developer",
];

export default function Hero() {
  const { darkMode } = useTheme();
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter Effect
  useEffect(() => {
    const currentRole = roles[index];
    let timer;
    const typingSpeed = 80;
    const deletingSpeed = 50;

    if (!isDeleting) {
      if (charIndex < currentRole.length) {
        timer = setTimeout(() => {
          setText((prev) => prev + currentRole[charIndex]);
          setCharIndex((c) => c + 1);
        }, typingSpeed);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 1200);
      }
    } else {
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setText(currentRole.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setIndex((i) => (i + 1) % roles.length);
      }
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, index]);

  return (
    <section
      className={`relative min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden ${
        darkMode ? "bg-[#020617] text-white" : "bg-gray-50 text-black"
      }`}
    >
      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-5xl text-center md:text-left">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <motion.div
            initial={{ rotateX: 12, opacity: 0, translateY: 20 }}
            animate={{ rotateX: 0, opacity: 1, translateY: 0 }}
            transition={{ duration: 1 }}
            className="transform-gpu perspective-1000"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              <span className="block">I’m a Professional</span>
            </h1>

            {/* Typewriter Chip */}
            <div className={`inline-flex items-center gap-4 px-6 md:px-8 py-3 rounded-3xl backdrop-blur-xl shadow-[0_8px_40px_rgba(2,6,23,0.3)] mx-auto md:mx-0 ${
              darkMode ? "bg-white/5" : "bg-black/5"
            }`}>
              <span className="text-2xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
                {text}
              </span>
              <span className="text-3xl text-blue-500 animate-pulse">|</span>
            </div>

            <motion.p
              className={`mt-8 max-w-2xl text-lg md:text-xl font-medium leading-relaxed mx-auto md:mx-0 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              I architect high-performance digital experiences using{" "}
              <span className="text-blue-500 font-bold">Next.js</span>,{" "}
              <span className="text-indigo-500 font-bold">WordPress</span>, &{" "}
              <span className="text-emerald-500 font-bold">MongoDB</span>. From pixel-perfect 
              frontends to robust backend systems, I build solutions that scale.
            </motion.p>

            {/* CTA */}
            <motion.div
              className="mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 px-10 py-4 rounded-full text-white font-bold shadow-xl hover:shadow-blue-500/20 transform hover:scale-105 transition-all duration-300"
              >
                Explore My Work
              </a>
            </motion.div>

            {/* Floating Side Icons */}
            <div className="absolute hidden lg:flex flex-col gap-6 top-1/4 -left-20">
              <HoverIcon icon={<FaReact size={30} color="#61dafb" />} />
              <HoverIcon icon={<SiNextdotjs size={28} className={darkMode ? "text-white" : "text-black"} />} />
              <HoverIcon icon={<FaWordpress size={30} color="#21759b" />} />
            </div>
            <div className="absolute hidden lg:flex flex-col gap-6 top-1/3 -right-20">
              <HoverIcon icon={<SiMongodb size={28} color="#4DB33D" />} />
              <HoverIcon icon={<SiFigma size={28} color="#F24E1E" />} />
              <HoverIcon icon={<SiTailwindcss size={28} color="#06B6D4" />} />
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom Gradient Fade */}
      <div className={`absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t pointer-events-none ${
        darkMode ? "from-black to-transparent" : "from-gray-100 to-transparent"
      }`} />
    </section>
  );
}

function HoverIcon({ icon }) {
  return (
    <div className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-xl hover:scale-110 hover:bg-white/10 transition-all duration-300 cursor-pointer">
      {icon}
    </div>
  );
}