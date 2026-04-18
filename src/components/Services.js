"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  FaCode,
  FaPaintBrush,
  FaMobileAlt,
  FaServer,
  FaDatabase,
  FaRocket,
} from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";

const services = [
  {
    title: "Web Development",
    icon: <FaCode className="text-blue-400 text-3xl" />,
    description:
      "Building responsive, high-performance websites using React, Next.js, TailwindCSS.",
  },
  {
    title: "UI/UX Design",
    icon: <FaPaintBrush className="text-pink-400 text-3xl" />,
    description:
      "Creating user-friendly, modern, and visually appealing interfaces.",
  },
  {
    title: "Mobile Development",
    icon: <FaMobileAlt className="text-green-400 text-3xl" />,
    description: "Developing cross-platform mobile apps with smooth performance.",
  },
  {
    title: "API Integration",
    icon: <FaServer className="text-purple-400 text-3xl" />,
    description: "Integrating REST and GraphQL APIs for seamless data flow.",
  },
  {
    title: "Database Management",
    icon: <FaDatabase className="text-yellow-400 text-3xl" />,
    description: "Designing and managing MongoDB and SQL databases efficiently.",
  },
  {
    title: "Optimization & Deployment",
    icon: <FaRocket className="text-indigo-400 text-3xl" />,
    description:
      "Optimizing web apps for speed, SEO, and deploying on cloud platforms.",
  },
];

function useTilt(strength = 15) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, (v) => `${(-v / strength).toFixed(2)}deg`);
  const rotateY = useTransform(x, (v) => `${(v / strength).toFixed(2)}deg`);

  function handleMove(e, ref) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - rect.left;
    const dy = e.clientY - rect.top;
    x.set(dx - rect.width / 2);
    y.set(dy - rect.height / 2);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return { x, y, rotateX, rotateY, handleMove, handleLeave };
}

export default function Services() {
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
        Services
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {services.map((service, i) => {
          const ref = { current: null };
          const { rotateX, rotateY, handleMove, handleLeave } = useTilt(20);
          return (
            <motion.div
              key={i}
              ref={ref}
              style={{ rotateX, rotateY }}
              initial={{ opacity: 0, y: 50, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8, ease: "easeOut" }}
              className={`relative rounded-2xl p-6 sm:p-8 text-center shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer ${
                darkMode
                  ? "bg-white/5 border border-white/10 backdrop-blur-lg"
                  : "bg-white border border-gray-200"
              }`}
              onPointerMove={(e) => handleMove(e, ref)}
              onPointerLeave={handleLeave}
            >
              <div className="flex justify-center mb-4">{service.icon}</div>
              <h3
                className={`text-lg sm:text-xl font-bold mb-2 ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                {service.title}
              </h3>
              <p
                className={`text-sm sm:text-base leading-relaxed ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {service.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
