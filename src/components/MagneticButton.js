"use client";
import { motion } from "framer-motion";
import { useRef } from "react";

export default function MagneticButton({ children }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => (ref.current.style.transform = "translate(0,0)")}
      whileHover={{ scale: 1.1 }}
      className="px-8 py-4 rounded-full font-bold bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-xl"
    >
      {children}
    </motion.button>
  );
}
