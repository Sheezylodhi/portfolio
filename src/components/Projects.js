"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

// ---------- Clean Glass Card ----------
function ProjectCard({ project, index }) {
  const { darkMode } = useTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative flex-shrink-0 w-[300px] md:w-[400px] rounded-2xl overflow-hidden transition-all duration-300 ${
        darkMode 
          ? "bg-[#111] border border-white/10 hover:border-purple-500/50" 
          : "bg-white border border-gray-200 shadow-lg"
      }`}
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={project.images?.[0] || "/placeholder.jpg"}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
           <span className="text-white text-sm font-medium">View Details →</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
          {project.title}
        </h3>
        <p className={`text-sm line-clamp-2 mb-5 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          {project.description}
        </p>
        
        <a
          href={project.link || "#"}
          target="_blank"
          className="inline-block w-full text-center py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:opacity-90 transition"
        >
          Explore Project
        </a>
      </div>
    </motion.article>
  );
}

export default function PremiumProjects() {
  const [projects, setProjects] = useState([]);
  const { darkMode } = useTheme();
  const scrollRef = useRef(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        if (data?.success) setProjects(data.result || []);
      } catch (err) {
        console.error("fetch projects error:", err);
      }
    }
    load();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className={`py-20 overflow-hidden ${darkMode ? "bg-black" : "bg-gray-50"}`}>
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className={`text-4xl md:text-5xl font-black mb-4 ${darkMode ? "text-white" : "text-black"}`}>
              Featured <span className="text-purple-500">Works</span>
            </h2>
            <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
              A collection of my recent projects and experiments.
            </p>
          </div>
          
          {/* Custom Arrows */}
          <div className="hidden md:flex gap-3">
            <button 
              onClick={() => scroll('left')}
              className={`p-3 rounded-full border ${darkMode ? "border-white/10 hover:bg-white/10" : "border-black/10 hover:bg-black/5"}`}
            >
              ❮
            </button>
            <button 
              onClick={() => scroll('right')}
              className={`p-3 rounded-full border ${darkMode ? "border-white/10 hover:bg-white/10" : "border-black/10 hover:bg-black/5"}`}
            >
              ❯
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-10"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.length > 0 ? (
            projects.map((p, i) => (
              <div key={p._id} className="snap-center">
                <ProjectCard project={p} index={i} />
              </div>
            ))
          ) : (
            <p className="text-gray-500">Loading projects...</p>
          )}
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}