"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaReact } from "react-icons/fa";
import { SiNextdotjs, SiMongodb, SiFigma, SiTailwindcss, SiJavascript, SiReact } from "react-icons/si";
import { useTheme } from "@/context/ThemeContext";

const roles = [
  "Frontend Developer",
  "Backend Developer",
  "Full-Stack Developer",
  "Next.js Expert",
  "React.js Expert",
  "Node.js Expert",
  "UI/UX Focused Engineer",
];

// Background icons (static)
const floatingIcons = [SiReact, SiNextdotjs, SiMongodb, SiTailwindcss, SiJavascript, SiFigma];

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
    darkMode ? "text-white" : "text-black"
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
          <span className="block">I’m a</span>
        </h1>

        {/* Typewriter Chip */}
        <div className="inline-flex items-center gap-4 px-6 md:px-8 py-3 rounded-3xl backdrop-blur-xl  shadow-[0_8px_40px_rgba(2,6,23,0.6)] mx-auto md:mx-0">
          <span className="text-2xl md:text-3xl font-semibold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
            {text}
          </span>
          <span className="text-3xl text-blue-400 animate-pulse">|</span>
        </div>

        <motion.p
          className={`mt-6 max-w-2xl text-lg md:text-xl leading-relaxed mx-auto md:mx-0 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          I build modern, scalable, and stunning web applications using{" "}
          <span className="text-blue-400 font-semibold">Next.js</span> &{" "}
          <span className="text-indigo-400 font-semibold">MongoDB</span>. I focus on
          performance, accessibility, and neat architecture.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 rounded-full text-white font-semibold shadow-lg transform hover:scale-105 transition"
          >
             View Projects
          </a>
        </motion.div>

        {/* Floating Side Icons (optional, still static hover) */}
        <div className="absolute flex flex-col gap-4 md:gap-6 top-1/4 left-2 md:left-6">
          <HoverIcon icon={<FaReact size={30} color="#61dafb" />} />
          <HoverIcon icon={<SiNextdotjs size={28} color="#fff" />} />
        </div>
        <div className="absolute flex flex-col gap-4 md:gap-6 top-1/3 right-2 md:right-6">
          <HoverIcon icon={<SiMongodb size={28} color="#4DB33D" />} />
          <HoverIcon icon={<SiFigma size={28} color="#F24E1E" />} />
        </div>
      </motion.div>
    </div>
  </div>
  <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />

</section>

  );
}

// Hover effect only
function HoverIcon({ icon }) {
  return (
    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-md hover:scale-125 transition-transform duration-300">
      {icon}
    </div>
  );
}
