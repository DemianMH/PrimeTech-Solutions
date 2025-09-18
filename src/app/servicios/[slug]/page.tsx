"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { servicesData } from "@/lib/data";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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
    },
  },
};

type ServicePageProps = {
  params: {
    slug: keyof typeof servicesData;
  };
};

const ServicePage = ({ params }: ServicePageProps) => {
  const { slug } = params;
  const service = servicesData[slug];

  if (!service) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <h1 className="text-4xl font-bold">Servicio no encontrado</h1>
      </div>
    );
  }

  return (
    <div className="bg-black text-white">
      <motion.section 
        className="relative h-[70vh] min-h-[600px] flex items-center justify-center text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 z-0">
          <Image
            src={service.hero.imageUrl}
            alt={`Imagen de fondo para ${service.hero.title}`}
            layout="fill"
            objectFit="cover"
            className="opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>
        <motion.div 
          className="relative z-10 px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
            style={{ textShadow: "0 0 20px rgba(59, 130, 246, 0.6)" }}
            variants={itemVariants}
          >
            {service.hero.title}
          </motion.h1>
          <motion.p 
            className="mt-6 max-w-2xl mx-auto text-xl text-gray-300"
            variants={itemVariants}
          >
            {service.hero.tagline}
          </motion.p>
          <motion.div variants={itemVariants}>
            <Button asChild size="lg" className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-8 py-6 rounded-xl hover:scale-105 transition-transform">
              <a href="/contacto">
                Solicitar Cotización
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </motion.section>

      <section className="py-20 lg:py-28 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-300">{service.introduction.title}</h2>
          <p className="mt-4 text-lg text-gray-400">{service.introduction.content}</p>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {service.features.map((feature, index) => (
              <motion.div 
                key={index}
                className="p-8 bg-gray-900/50 rounded-xl border border-gray-800"
                variants={itemVariants}
              >
                <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                <p className="mt-3 text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-28 container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">{service.process.title}</h2>
        <motion.div 
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-gray-800" />
          {service.process.steps.map((step, index) => (
            <motion.div 
              key={index}
              className="relative mb-12 flex items-center"
              variants={itemVariants}
            >
              <div className={`w-1/2 pr-8 text-right ${index % 2 !== 0 && 'order-2 ml-auto'}`}>
                <h3 className="text-xl font-bold text-blue-500">{`Paso 0${index + 1}`}</h3>
                <h4 className="text-2xl font-semibold text-white mt-1">{step.name}</h4>
                <p className="mt-2 text-gray-400">{step.description}</p>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-blue-600 border-4 border-black flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white"/>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
      
      <section className="bg-blue-600 text-white text-center py-20">
         <div className="container mx-auto px-4">
             <h2 className="text-3xl md:text-4xl font-bold">¿Listo para llevar tu negocio al siguiente nivel?</h2>
             <p className="mt-4 text-lg max-w-2xl mx-auto">Hablemos de tu proyecto. Contáctanos hoy para una consulta gratuita.</p>
             <Button asChild size="lg" className="mt-8 bg-white text-blue-600 hover:bg-gray-200 font-bold text-lg px-10 py-6 rounded-xl hover:scale-105 transition-transform">
                <a href="/contacto">
                    Empezar Ahora <ArrowRight className="ml-2"/>
                </a>
             </Button>
         </div>
      </section>

    </div>
  );
};

export default ServicePage;