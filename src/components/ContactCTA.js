"use client";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { SiFiverr } from "react-icons/si";
import { motion } from "framer-motion";

export default function ContactCTA() {
  const whatsappNumber = "923053062245"; // apna number
  const whatsappMsg = "Hello Shahzaib! I want to hire you.";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMsg
  )}`;

  const email = "muhammadshahzaiblodhi@gmail.com"; // apna email
  const emailLink = `mailto:${email}?subject=Hiring%20Inquiry`;

  const fiverrLink = "https://www.fiverr.com/shahzaib_devlop"; // apna Fiverr profile

  const buttons = [
    { icon: <FaWhatsapp />, link: whatsappLink, color: "bg-green-500 hover:bg-green-600", label: "WhatsApp" },
    { icon: <FaEnvelope />, link: emailLink, color: "bg-blue-500 hover:bg-blue-600", label: "Email" },
    { icon: <SiFiverr />, link: fiverrLink, color: "bg-black hover:bg-gray-800", label: "Fiverr" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 15 }}
      className="fixed bottom-6 right-6 flex flex-col gap-4 z-50"
    >
      {buttons.map((btn, idx) => (
        <motion.a
          key={idx}
          href={btn.link}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2 text-white px-4 py-3 rounded-full shadow-lg transition-transform transform ${btn.color}`}
        >
          {btn.icon}
          <span className="hidden md:inline">{btn.label}</span>
        </motion.a>
      ))}
    </motion.div>
  );
}
