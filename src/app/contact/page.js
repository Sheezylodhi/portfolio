"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState(false);

  const handleSubmit = async e => {
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
    <section className="min-h-screen bg-slate-950 text-gray-200 flex items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl bg-slate-900 p-8 rounded-2xl shadow-[0_0_40px_rgba(59,130,246,0.3)]"
      >
        {/* Heading */}
        <h1 className="text-4xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
          Contact Me
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Let’s build something amazing together 🚀  
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
          <textarea
            placeholder="Message"
            rows="5"
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            required
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg font-semibold text-white"
          >
            Send Message
          </motion.button>
          {success && (
            <p className="text-green-400 text-center mt-4">
              ✅ Message sent successfully!
            </p>
          )}
        </form>

        {/* Social Icons */}
        <div className="mt-10 flex justify-center gap-6 text-2xl">
          <motion.a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            className="text-gray-400 hover:text-white transition"
          >
            <FaGithub />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            className="text-gray-400 hover:text-blue-400 transition"
          >
            <FaLinkedin />
          </motion.a>
          <motion.a
            href="mailto:your@email.com"
            whileHover={{ scale: 1.2 }}
            className="text-gray-400 hover:text-red-400 transition"
          >
            <FaEnvelope />
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
