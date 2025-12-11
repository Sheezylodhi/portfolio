"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { darkMode, setDarkMode } = useTheme();
  const [scroll, setScroll] = useState(0);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md transition-all duration-500 shadow-lg border-b ${
        darkMode
          ? scroll > 10
            ? "bg-black/90 border-gray-700 shadow-black/60"
            : "bg-black/80 border-gray-800 shadow-black/40"
          : scroll > 10
          ? "bg-white/90 border-gray-200 shadow-gray-400/60"
          : "bg-white/80 border-gray-200 shadow-gray-400/30"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className={`text-2xl font-bold transition-colors duration-500 ${darkMode ? "text-white" : "text-black"}`}>
          Shahzaib
        </h1>

        {/* Desktop Links */}
        <div className="space-x-8 hidden md:flex">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="relative group">
              <span
                className={`transition-colors duration-300 ${
                  darkMode
                    ? "text-white group-hover:text-blue-400"
                    : "text-black group-hover:text-blue-600"
                }`}
              >
                {link.name}
              </span>
              <span
                className={`absolute left-0 -bottom-1 w-0 h-[2px] transition-all duration-300 ${
                  darkMode ? "bg-blue-400" : "bg-blue-600"
                } group-hover:w-full`}
              ></span>
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Dark/Light Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full transition-colors hover:bg-blue-500/20"
          >
            {darkMode ? <Sun size={20} className="text-white" /> : <Moon size={20} className="text-black" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-blue-500/20 transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <X size={28} className={`${darkMode ? "text-white" : "text-black"}`} />
            ) : (
              <Menu size={28} className={`${darkMode ? "text-white" : "text-black"}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div
          className={`flex flex-col px-6 pb-4 space-y-4 transition-colors duration-500 ${
            darkMode ? "bg-black" : "bg-white"
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block relative group"
              onClick={() => setOpen(false)} // close menu on link click
            >
              <span
                className={`transition-colors duration-300 ${
                  darkMode
                    ? "text-white group-hover:text-blue-400"
                    : "text-black group-hover:text-blue-600"
                }`}
              >
                {link.name}
              </span>
              <span
                className={`absolute left-0 bottom-0 w-0 h-[2px] transition-all duration-300 ${
                  darkMode ? "bg-blue-400" : "bg-blue-600"
                } group-hover:w-full`}
              ></span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
