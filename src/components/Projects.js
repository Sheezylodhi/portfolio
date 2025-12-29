"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

/* ---------------------------
  Ultra Premium Projects Page
   - Particles canvas
   - Parallax gradient layers
   - Scroll reveal (inView)
   - Magnetic 3D tilt cards
   - Slider per card (autoplay + buttons)
   - Sheen, neon, glows
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
      for (let i = 0; i < 60 && i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < i + 6 && j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 80) {
            ctx.strokeStyle = `rgba(120,120,255,${0.02 * (80 - d)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(frame);
    }

    function onResize() {
      w = canvas.width = innerWidth;
      h = canvas.height = innerHeight;
      init();
    }

    init();
    frame();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [density]);

  return (
    <canvas
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        mixBlendMode: "screen",
      }}
    />
  );
}

// ---------- Parallax Layers ----------
function ParallaxBg() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <div
        className="absolute -left-20 -top-40 w-[1000px] h-[1000px] rounded-full blur-3xl opacity-60"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(122,60,255,0.45), transparent 30%)",
          transform: "translateZ(0)",
          animation: "float1 12s ease-in-out infinite",
        }}
      />
      <div
        className="absolute right-[-120px] top-10 w-[800px] h-[800px] rounded-full blur-2xl opacity-50"
        style={{
          background:
            "radial-gradient(circle at 80% 70%, rgba(0,230,255,0.35), transparent 30%)",
          animation: "float2 18s ease-in-out infinite",
        }}
      />
      <style>{`
        @keyframes float1 {
          0% { transform: translateY(0) translateX(0) }
          50% { transform: translateY(18px) translateX(8px) }
          100% { transform: translateY(0) translateX(0) }
        }
        @keyframes float2 {
          0% { transform: translateY(0) translateX(0) }
          50% { transform: translateY(-18px) translateX(-12px) }
          100% { transform: translateY(0) translateX(0) }
        }
      `}</style>
    </div>
  );
}

// ---------- Magnetic Tilt ----------
function useMagneticTilt(containerRef, strength = 18) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rX = useTransform(my, (v) => `${(v / strength).toFixed(2)}deg`);
  const rY = useTransform(mx, (v) => `${(-v / strength).toFixed(2)}deg`);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    function onMove(e) {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      mx.set((x - cx) / cx * 100);
      my.set((y - cy) / cy * 100);
    }
    function onLeave() {
      mx.set(0);
      my.set(0);
    }
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [containerRef, mx, my]);
  return { rX, rY, mx, my };
}

// ---------- Project Card VIP ----------
function ProjectCardVIP({ project, index }) {
  const images = project.images || [];
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const { darkMode } = useTheme(); // use darkMode for card theme

  // slider autoplay
  useEffect(() => {
    if (!images.length) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % images.length), 3500);
    return () => clearInterval(t);
  }, [images]);

  const next = () => setCurrent((c) => (c + 1) % images.length);
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);

  const { rX, rY } = useMagneticTilt(ref, 16);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.08, duration: 0.6, ease: "easeOut" }}
      style={{ rotateX: rX, rotateY: rY, transformStyle: "preserve-3d" }}
      className="relative rounded-2xl p-0 overflow-hidden"
    >
      <div
        className={`relative rounded-2xl shadow-xl p-0 overflow-hidden ${
          darkMode
            ? "bg-gradient-to-br from-white/3 to-white/2 border border-white/6 backdrop-blur-[10px] shadow-black/60"
            : "bg-white/80 border border-gray-200 backdrop-blur-[6px] shadow-gray-300/50"
        }`}
      >
        <div className="relative h-64 bg-black/10 flex items-center justify-center overflow-hidden">
          {images.length > 0 ? (
            <img
              src={images[current]}
              alt={project.title}
              className="w-full h-full object-contain transition-transform duration-700"
              draggable={false}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}

          <div
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              boxShadow: darkMode
                ? "0 0 40px rgba(120,80,255,0.12), 0 0 100px rgba(0,200,255,0.06)"
                : "0 0 30px rgba(100,100,255,0.08), 0 0 70px rgba(0,150,255,0.05)",
              mixBlendMode: "screen",
            }}
          />

          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="previous"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white p-2 rounded-full hover:scale-105 transition"
                style={{ backdropFilter: "blur(6px)" }}
              >
                ❮
              </button>
              <button
                onClick={next}
                aria-label="next"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white p-2 rounded-full hover:scale-105 transition"
                style={{ backdropFilter: "blur(6px)" }}
              >
                ❯
              </button>
            </>
          )}
        </div>

        <div className="p-6">
          <h3 className={`text-2xl font-bold mb-2 drop-shadow-md ${darkMode ? "text-white/95" : "text-black/90"}`}>
            {project.title}
          </h3>
          <p className={`text-sm mb-4 leading-relaxed ${darkMode ? "text-gray-300/90" : "text-gray-700/90"}`}>
            {project.description}
          </p>

          <div className="flex items-center gap-3">
            <a
              href={project.link || "#"}
              target="_blank"
              rel="noreferrer"
              className={`relative inline-flex items-center gap-3 px-5 py-2 rounded-lg text-white font-medium shadow-lg hover:scale-105 transition transform-gpu ${
                darkMode ? "bg-gradient-to-r from-purple-500 to-cyan-400 shadow-purple-700/20" : "bg-gradient-to-r from-purple-600 to-blue-500 shadow-blue-400/20"
              }`}
            >
              <span className="text-sm">View Project</span>
              <span className="inline-block w-3 h-3 rounded-full bg-white/90" />
            </a>

            <div className="ml-auto flex items-center gap-1">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`go to slide ${i + 1}`}
                  className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-white" : "bg-white/30"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ---------------------- Main Page Component ----------------------
export default function PremiumProjects() {
  const [projects, setProjects] = useState([]);
  const { darkMode } = useTheme(); // use darkMode for page

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        if (data?.success) setProjects(data.result || []);
      } catch (err) {
        console.error("fetch projects:", err);
      }
    }
    load();
  }, []);

  return (
   <section className="relative min-h-screen">

        <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="relative z-20 max-w-7xl mx-auto px-6 py-20 sm:px-6 lg:px-8"
  >
    

      <div className="relative z-20 max-w-7xl mx-auto px-6 py-20 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className={`text-center text-5xl font-extrabold mb-12 bg-clip-text text-transparent ${
            darkMode ? "bg-gradient-to-r from-purple-300 to-cyan-200" : "bg-gradient-to-r from-purple-600 to-blue-400"
          }`}
        >
          PortFolio Project
        </motion.h1>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCardVIP project={p} index={i} key={p._id} />
          ))}
        </div>
      </div>
    </motion.div>
    </section>
  );
}


