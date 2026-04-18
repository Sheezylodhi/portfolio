"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

/* ---------------------------
  Ultra Premium Projects Page
----------------------------*/

// ---------- Particle Canvas ----------
function ParticleCanvas({ density = 0.001 }) {
  const ref = useRef();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = innerWidth);
    let h = (canvas.height = innerHeight);
    let particles = [];
    const count = Math.max(30, Math.floor(w * density));

    function init() {
      particles = Array.from({ length: count }).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: 0.5 + Math.random() * 2.2,
        alpha: 0.2 + Math.random() * 0.6,
      }));
    }

    let raf;
    function frame() {
      ctx.clearRect(0, 0, w, h);
      for (let p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    }

    init();
    frame();

    return () => cancelAnimationFrame(raf);
  }, [density]);

  return (
    <canvas
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

// ---------- Project Card ----------
function ProjectCardVIP({ project, index }) {
  const images = project.images || [];
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const { darkMode } = useTheme();

  useEffect(() => {
    if (!images.length) return;
    const t = setInterval(
      () => setCurrent((c) => (c + 1) % images.length),
      3500
    );
    return () => clearInterval(t);
  }, [images]);

  const next = () => setCurrent((c) => (c + 1) % images.length);
  const prev = () =>
    setCurrent((c) => (c - 1 + images.length) % images.length);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      className="min-w-[85%] sm:min-w-[60%] md:min-w-[45%] lg:min-w-[32%] flex-shrink-0"
    >
      <div
        className={`rounded-2xl overflow-hidden shadow-xl ${
          darkMode ? "bg-black/40 text-white" : "bg-white text-black"
        }`}
      >
        <div className="h-64 flex items-center justify-center bg-black/10">
          {images.length > 0 ? (
            <img
              src={images[current]}
              className="w-full h-full object-contain"
            />
          ) : (
            <div>No Image</div>
          )}

          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 bg-black/50 text-white p-2 rounded-full"
              >
                ❮
              </button>
              <button
                onClick={next}
                className="absolute right-3 bg-black/50 text-white p-2 rounded-full"
              >
                ❯
              </button>
            </>
          )}
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold">{project.title}</h3>
          <p className="text-sm mt-2">{project.description}</p>

          <a
            href={project.link}
            target="_blank"
            className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            View Project
          </a>
        </div>
      </div>
    </motion.article>
  );
}

// ---------- MAIN ----------
export default function PremiumProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (data?.success) setProjects(data.result || []);
    }
    load();
  }, []);

  return (
    <section className="relative min-h-screen">

      <ParticleCanvas />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">

        <motion.h1
          className="text-4xl font-bold text-center mb-10"
        >
          Portfolio Projects
        </motion.h1>

        {/* ✅ HORIZONTAL SLIDER FIX */}
        <div className="relative">
          
          {/* LEFT ARROW */}
          {projects.length > 3 && (
            <button
              onClick={() =>
                document
                  .getElementById("slider")
                  .scrollBy({ left: -400, behavior: "smooth" })
              }
              className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-black/50 text-white p-3 rounded-full"
            >
              ❮
            </button>
          )}

          {/* SLIDER */}
          <div
            id="slider"
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar py-4"
          >
            {projects.map((p, i) => (
              <ProjectCardVIP key={p._id} project={p} index={i} />
            ))}
          </div>

          {/* RIGHT ARROW */}
          {projects.length > 3 && (
            <button
              onClick={() =>
                document
                  .getElementById("slider")
                  .scrollBy({ left: 400, behavior: "smooth" })
              }
              className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-black/50 text-white p-3 rounded-full"
            >
              ❯
            </button>
          )}
        </div>

      </div>
    </section>
  );
}