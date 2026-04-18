"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { darkMode, setDarkMode } = useTheme();
  const [scroll, setScroll] = useState(0);
  const [active, setActive] = useState("hero");

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Why Hire Me", href: "#whyhireme" },
    { name: "Contact", href: "#contact" },
  ];

  // body scroll lock
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md transition-all duration-500 border-b ${
          darkMode
            ? scroll > 10
              ? "bg-black/90 border-gray-700"
              : "bg-black/70 border-gray-800"
            : scroll > 10
            ? "bg-white/90 border-gray-200"
            : "bg-white/70 border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className={`text-2xl font-extrabold ${darkMode ? "text-white" : "text-black"}`}>
            Shahzaib
          </h1>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex gap-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="relative">
                <span
                  className={`font-medium transition ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                >
                  {link.name}
                </span>
                {active === link.href.replace("#", "") && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-0 -bottom-1 h-[2px] w-full bg-blue-500"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-blue-500/20 transition"
            >
              {darkMode ? <Sun size={20} className="text-white" /> : <Moon size={20} />}
            </button>

            {/* MOBILE BUTTON */}
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden p-2 rounded-full hover:bg-blue-500/20"
            >
              <Menu size={28} className={darkMode ? "text-white" : "text-black"} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {open && (
          <>
            {/* OVERLAY */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
              onClick={() => setOpen(false)}
            />

            {/* DRAWER */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 120 }}
              className={`fixed top-0 left-0 h-screen w-[80%] max-w-sm z-[9999] ${
                darkMode ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              <div className="flex justify-between items-center px-6 py-5 border-b">
                <h2 className="text-xl font-bold">Menu</h2>
                <button onClick={() => setOpen(false)}>
                  <X size={26} />
                </button>
              </div>

              <div className="flex flex-col gap-6 px-6 py-8">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="text-lg font-medium hover:text-blue-500 transition"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
