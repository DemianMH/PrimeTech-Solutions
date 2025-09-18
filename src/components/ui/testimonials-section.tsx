"use client";
import React from "react";
import { motion } from "framer-motion";
import { CheckCheck } from "lucide-react";
import { testimonials } from "@/lib/data";

export const TestimonialsSection = () => {
  return (
    <div className="py-20 lg:py-28 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Lo que dicen nuestros clientes
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Opiniones reales de empresas que han transformado su negocio con nosotros.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-[#054740] rounded-lg p-4 max-w-lg">
                <p className="text-sm font-bold text-[#38A884]">
                  {testimonial.name}
                </p>
                <p className="text-gray-200">
                  {testimonial.message}
                </p>
                <div className="flex justify-end items-center mt-2">
                  <span className="text-xs text-gray-400 mr-1">
                    {testimonial.time}
                  </span>
                  <CheckCheck className="h-4 w-4 text-blue-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};