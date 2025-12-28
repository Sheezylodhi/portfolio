"use client";
import { motion } from "framer-motion";

export default function Stats() {
  return (
    <div className="grid grid-cols-3 gap-8 text-center mt-16">
      {[
        ["20+", "Projects"],
        ["100%", "Client Satisfaction"],
        ["24/7", "Support"],
      ].map(([num, label]) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-4xl font-bold text-blue-500">{num}</h3>
          <p>{label}</p>
        </motion.div>
      ))}
    </div>
  );
}
