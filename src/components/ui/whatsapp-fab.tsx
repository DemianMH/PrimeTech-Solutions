"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa"; // 1. Importamos el ícono correcto

export const WhatsAppFAB = () => {
  return (
    <motion.a
      href="https://wa.me/523330620287"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >

      <FaWhatsapp className="h-9 w-9 text-white" />
    </motion.a>
  );
};