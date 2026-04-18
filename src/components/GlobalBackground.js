"use client";
import { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

// ---------- Particle Canvas ----------
function ParticleCanvas({ density = 0.001, bgColor }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const count = Math.max(30, Math.floor(w * density));
    let particles = [];

    function init() {
      particles = Array.from({ length: count }).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: 0.8 + Math.random() * 1.8,
        a: 0.15 + Math.random() * 0.4,
      }));
    }

    let raf;
    function draw() {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${p.a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      init();
    }

    init();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [density, bgColor]);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

// ---------- Parallax Glow ----------
function ParallaxBg({ darkMode }) {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden w-full">
      {/* Top-left circle */}
      <div
        className={`absolute -top-[10vw] -left-[10vw] w-[60vw] max-w-[400px] h-[60vw] max-h-[400px] rounded-full blur-3xl opacity-40 ${
          darkMode ? "bg-purple-600/40" : "bg-purple-300/40"
        } animate-pulse`}
      />

      {/* Bottom-right circle */}
      <div
        className={`absolute top-[50%] right-0 translate-x-1/4 w-[45vw] max-w-[350px] h-[45vw] max-h-[350px] rounded-full blur-3xl opacity-30 ${
          darkMode ? "bg-cyan-500/40" : "bg-cyan-300/40"
        } animate-pulse`}
      />
    </div>
  );
}

// ---------- Global Background ----------
export default function GlobalBackground() {
  const { darkMode } = useTheme();
  const bgColor = darkMode ? "rgba(0,0,0,1)" : "rgba(255,255,255,1)";

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden w-full">
      <ParallaxBg darkMode={darkMode} />
      <ParticleCanvas density={0.001} bgColor={bgColor} />
    </div>
  );
}
