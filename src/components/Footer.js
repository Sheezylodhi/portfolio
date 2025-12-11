"use client";
import { useTheme } from "@/context/ThemeContext";

export default function Footer() {
  const { darkMode } = useTheme();

  return (
    <footer className={`w-full text-center py-6 shadow-inner border-t transition-colors duration-500 ${darkMode ? "bg-[#0a0a0a] border-gray-800 text-gray-400" : "bg-white border-gray-200 text-gray-700"}`}>
      <p className="text-sm md:text-base">
        © {new Date().getFullYear()} <span className="font-semibold text-blue-400">Shahzaib Lodhi</span>. All rights reserved.
      </p>
    </footer>
  );
}
