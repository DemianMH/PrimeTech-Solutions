"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { shopProducts } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";

const TiendaPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const categories = useMemo(() => {
    const allCategories = shopProducts.map(p => p.category);
    return ["Todos", ...Array.from(new Set(allCategories))];
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "Todos") {
      return shopProducts;
    }
    return shopProducts.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="text-center mb-16"
        >
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight"
            style={{ textShadow: "0 0 12px rgba(59, 130, 246, 0.5)" }}
          >
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-400 bg-clip-text text-transparent">
              Catálogo
            </span>
            <span className="block mt-2">de Soluciones Tecnológicas</span>
          </h1>
          <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
            Explora nuestro hardware seleccionado y consúltanos directamente por WhatsApp para obtener una cotización personalizada.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(category => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`rounded-full transition-colors duration-300 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'text-gray-300 border-gray-700 hover:bg-gray-800 hover:text-white'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence>
            {filteredProducts.map(product => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="group relative flex flex-col bg-gray-900/50 rounded-xl border border-gray-800 overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={500}
                    height={400}
                    className="object-cover w-full h-56 transition-transform duration-500 group-hover:scale-105"
                  />
                  <Badge variant="secondary" className="absolute top-3 right-3 bg-black/70 text-white border-gray-700">
                    {product.category}
                  </Badge>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-white">{product.name}</h3>
                  <p className="mt-2 text-sm text-blue-400 font-semibold">
                    Ideal para: <span className="text-gray-400 font-normal">{product.idealFor}</span>
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-gray-400 flex-grow">
                    {product.features.map(feature => (
                      <li key={feature} className="flex items-start">
                        <span className="text-blue-500 mr-2 mt-1">&#8227;</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="mt-6 w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold">
                    <a href={product.whatsappUrl} target="_blank" rel="noopener noreferrer">
                      <FaWhatsapp className="mr-2 h-5 w-5"/>
                      Consultar por WhatsApp
                    </a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default TiendaPage;