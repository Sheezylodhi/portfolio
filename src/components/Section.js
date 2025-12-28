"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Section({ id, title, children, fullScreen }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, -20]);

  return (
    <section
      ref={ref}
      id={id}
      className={`
        relative w-full flex flex-col justify-center
        scroll-mt-24 px-4
        ${fullScreen ? "min-h-screen py-16 md:py-24" : "py-12 md:py-16"}
      `}
    >
      {title && (
        <motion.h2
          style={{ y }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="
            text-3xl sm:text-4xl md:text-5xl font-extrabold
            text-center mb-12 sm:mb-16
            bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500
            text-transparent bg-clip-text
          "
        >
          {title}
        </motion.h2>
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto w-full"
      >
        {children}
      </motion.div>
    </section>
  );
}
