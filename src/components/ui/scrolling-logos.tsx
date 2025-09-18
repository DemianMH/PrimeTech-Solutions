"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { logos } from "@/lib/data";

export const ScrollingLogos = () => {
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="py-12 bg-black">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-8">
          Empresas que confían en nosotros
        </h3>
        <div className="relative w-full overflow-hidden mask-gradient">
          <motion.div
            className="flex"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              ease: "linear",
              duration: 25,
              repeat: Infinity,
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 mx-8 flex items-center"
                style={{ minWidth: "120px" }}
                whileHover={{ scale: 1.1 }}
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={120}
                  height={40}
                  className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};