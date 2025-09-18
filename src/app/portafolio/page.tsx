"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { portfolioProjects } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const PortfolioPage = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="text-center mb-20"
        >
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight"
            style={{ textShadow: "0 0 12px rgba(59, 130, 246, 0.5)" }}
          >
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-400 bg-clip-text text-transparent">
              Proyectos
            </span>
            <span className="block mt-2">que Impulsan el Futuro</span>
          </h1>
          <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
            Cada proyecto es una colaboración única, diseñada para resolver desafíos y crear valor duradero.
          </p>
        </motion.div>

        <motion.div
          className="space-y-28"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {portfolioProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
              variants={itemVariants}
            >
              <div className={`overflow-hidden rounded-xl ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                <Image
                  src={project.imageUrl}
                  alt={`Imagen del proyecto ${project.title}`}
                  width={1280}
                  height={800}
                  className="object-cover w-full h-full transform transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
              </div>
              
              <div className={`${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                <span 
                  className="text-6xl font-black text-gray-800"
                  style={{ WebkitTextStroke: '1px rgba(59, 130, 246, 0.6)' }}
                >
                  {project.number}
                </span>
                <h2 className="text-3xl font-bold mt-2 text-white">{project.title}</h2>
                <p className="mt-4 text-gray-400">{project.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-gray-800 text-gray-300 border-gray-700">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button asChild className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold group/btn">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    Visitar Sitio
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default PortfolioPage;