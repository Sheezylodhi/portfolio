"use client";
import { motion } from "framer-motion";

export default function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        animate={{ x: [0, 200, 0], y: [0, -200, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/30 blur-[120px] rounded-full"
      />
      <motion.div
        animate={{ x: [0, -200, 0], y: [0, 200, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
        className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-400/30 blur-[120px] rounded-full"
      />
    </div>
  );
}
