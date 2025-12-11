"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState(false);
  const { darkMode } = useTheme(); // ✅ Here is the key: use ThemeContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      if (result.success) {
        setSuccess(true);
        setForm({ name: "", email: "", message: "" });
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Server error, please try again later.");
    }
  };

  return (
    <section
      className={`relative min-h-screen overflow-hidden flex items-center justify-center px-6 py-16 transition-colors duration-500 ${
        darkMode ? "bg-[#020014] text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Floating gradient blobs */}
      <div
        aria-hidden
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-3xl opacity-40"
        style={{
          background: "radial-gradient(circle at 30% 30%, #7a3cff, transparent 40%)",
          animation: "float1 15s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden
        className="absolute bottom-[-120px] right-[-100px] w-[500px] h-[500px] rounded-full blur-2xl opacity-30"
        style={{
          background: "radial-gradient(circle at 70% 70%, #00e6ff, transparent 40%)",
          animation: "float2 18s ease-in-out infinite",
        }}
      />
      <style>{`
        @keyframes float1 {
          0% { transform: translateY(0) translateX(0) }
          50% { transform: translateY(20px) translateX(10px) }
          100% { transform: translateY(0) translateX(0) }
        }
        @keyframes float2 {
          0% { transform: translateY(0) translateX(0) }
          50% { transform: translateY(-20px) translateX(-15px) }
          100% { transform: translateY(0) translateX(0) }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`relative w-full max-w-2xl p-8 rounded-3xl transition-colors duration-500 shadow-[0_0_40px_rgba(0,0,0,0.25)] ${
          darkMode
            ? "bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-[12px] border border-white/10"
            : "bg-white/80 backdrop-blur-lg border border-gray-200"
        }`}
      >
        <h1
          className={`text-4xl font-extrabold mb-6 text-center bg-clip-text text-transparent ${
            darkMode ? "bg-gradient-to-r from-purple-300 to-cyan-200" : "bg-gradient-to-r from-purple-600 to-blue-500"
          }`}
        >
          Contact Me
        </h1>
        <p className={`text-center mb-8 transition-colors duration-500 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Let’s build something amazing together 🚀
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Your Name"
            className={`w-full p-4 rounded-xl transition-colors duration-500 border focus:ring-2 outline-none ${
              darkMode
                ? "bg-white/5 border-white/20 focus:ring-purple-400 text-white placeholder-white/60"
                : "bg-white border-gray-300 focus:ring-blue-400 text-gray-900 placeholder-gray-400"
            }`}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className={`w-full p-4 rounded-xl transition-colors duration-500 border focus:ring-2 outline-none ${
              darkMode
                ? "bg-white/5 border-white/20 focus:ring-purple-400 text-white placeholder-white/60"
                : "bg-white border-gray-300 focus:ring-blue-400 text-gray-900 placeholder-gray-400"
            }`}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <textarea
            placeholder="Message"
            rows="5"
            className={`w-full p-4 rounded-xl transition-colors duration-500 border focus:ring-2 outline-none resize-none ${
              darkMode
                ? "bg-white/5 border-white/20 focus:ring-purple-400 text-white placeholder-white/60"
                : "bg-white border-gray-300 focus:ring-blue-400 text-gray-900 placeholder-gray-400"
            }`}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full py-3 rounded-xl font-semibold shadow-lg transition-colors duration-500 ${
              darkMode
                ? "bg-gradient-to-r from-purple-500 to-cyan-400 text-white shadow-purple-600/30"
                : "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-blue-400/30"
            }`}
          >
            Send Message
          </motion.button>
          {success && (
            <p className={`text-center mt-4 font-medium transition-colors duration-500 ${darkMode ? "text-green-400" : "text-green-600"}`}>
              ✅ Message sent successfully!
            </p>
          )}
        </form>

        <div className="mt-10 flex justify-center gap-6 text-3xl transition-colors duration-500">
          <motion.a
            href="https://github.com/Sheezylodhi"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            className={`transition-colors ${darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"}`}
          >
            <FaGithub />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            className={`transition-colors ${darkMode ? "text-gray-400 hover:text-blue-400" : "text-gray-600 hover:text-blue-500"}`}
          >
            <FaLinkedin />
          </motion.a>
          <motion.a
            href="mailto:muhammadshahzaiblodhi@gmail.com"
            whileHover={{ scale: 1.2 }}
            className={`transition-colors ${darkMode ? "text-gray-400 hover:text-red-400" : "text-gray-600 hover:text-red-500"}`}
          >
            <FaEnvelope />
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
