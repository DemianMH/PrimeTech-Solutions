"use client";
import React from "react";
import { motion } from "framer-motion";
import { services } from "@/lib/data";

const containerVariants = {
  offscreen: { opacity: 0 },
  onscreen: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  offscreen: {
    y: 50,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

export const FeaturesSection = () => {
  return (
    <div id="servicios" className="w-full py-20 lg:py-28 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Un Universo de Soluciones a tu Alcance
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Explora nuestros servicios clave diseñados para ofrecerte una ventaja competitiva en el mundo digital.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              className="relative overflow-hidden rounded-xl p-px bg-gradient-to-b from-gray-800 to-transparent"
              variants={cardVariants}
            >
              <div className="rounded-xl h-full bg-gray-900/80 p-6 backdrop-blur-sm" style={{textShadow: `0 0 8px ${getShadowColor(service.title)}`}}>
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-gray-400">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const getShadowColor = (title: string) => {
    if (title.includes("Software")) return "rgba(59, 130, 246, 0.5)";
    if (title.includes("Ciberseguridad")) return "rgba(34, 197, 94, 0.5)";
    if (title.includes("Soporte")) return "rgba(239, 68, 68, 0.5)";
    if (title.includes("Diseño")) return "rgba(168, 85, 247, 0.5)";
    return "rgba(255, 255, 255, 0.1)";
}