"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("/api/projects")
      .then(res => res.json())
      .then(data => setProjects(data.result));
  }, []);

  return (
    <section className="min-h-screen bg-slate-950 text-gray-200 px-6 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent"
        >
          My Projects
        </motion.h1>

        {/* Projects Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, index) => (
            <motion.div
              key={p._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="bg-slate-900/60 backdrop-blur-md rounded-xl shadow-lg border border-slate-800 overflow-hidden flex flex-col"
            >
              {/* Project Image */}
              {p.image && (
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-blue-400 mb-3">
                    {p.title}
                  </h2>
                  <p className="text-gray-400 mb-4">{p.description}</p>
                </div>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg shadow-md text-center hover:from-blue-600 hover:to-indigo-700 transition"
                >
                  View Project 🚀
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
