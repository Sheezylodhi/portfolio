"use client";
import { motion } from "framer-motion";

export default function Loader({ onFinish }) {
  return (
    <motion.div
      className="fixed inset-0 z-[999] bg-black flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 1.6, duration: 0.6 }}
      onAnimationComplete={onFinish}
    >
      <motion.h1
        initial={{ scale: 0.8 }}
        animate={{ scale: 1.2 }}
        transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
        className="text-white text-4xl font-extrabold tracking-widest"
      >
        SHAHZAIB
      </motion.h1>
    </motion.div>
  );
}
