"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Calendar, Users } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
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

const ContactoPage = () => {
  const [formStatus, setFormStatus] = useState("Enviar Mensaje");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("Enviando...");
    
    setTimeout(() => {
      setFormStatus("Mensaje Enviado");
    }, 2000);
  };
    
  return (
    <div className="bg-black text-white min-h-screen">
      <motion.section 
        className="relative min-h-[50vh] flex items-center justify-center text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 z-0 bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="absolute inset-0 z-1 bg-gradient-to-b from-black/50 via-black to-black" />
        
        <motion.div 
          className="relative z-20 px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
            style={{ textShadow: "0 0 20px rgba(59, 130, 246, 0.6)" }}
            variants={itemVariants}
          >
            Hablemos de tu Próximo
            <span className="block mt-2 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Gran Proyecto
            </span>
          </motion.h1>
          <motion.p 
            className="mt-6 max-w-2xl mx-auto text-lg text-gray-300"
            variants={itemVariants}
          >
            Estamos listos para escucharte. Completa el formulario o contáctanos directamente para empezar a construir el futuro.
          </motion.p>
        </motion.div>
      </motion.section>

      <section className="py-20 lg:py-24 container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className="p-8 bg-gray-900/50 rounded-xl border border-gray-800 text-center" variants={itemVariants}>
            <Calendar className="h-10 w-10 mx-auto text-blue-500" />
            <h3 className="text-2xl font-bold mt-4">Agendar una Cita</h3>
            <p className="mt-2 text-gray-400">¿Prefieres conversar? Podemos reunirnos por videoconferencia, en tus oficinas o en un café en la ciudad.</p>
          </motion.div>
          
          <motion.div className="p-8 bg-gray-900/50 rounded-xl border border-gray-800 text-center" variants={itemVariants}>
            <Mail className="h-10 w-10 mx-auto text-blue-500" />
            <h3 className="text-2xl font-bold mt-4">Vía Correo Electrónico</h3>
            <a href="mailto:contacto@primetechsolutions.com.mx" className="mt-2 text-gray-400 hover:text-blue-400 transition-colors break-all">contacto@primetechsolutions.com.mx</a>
          </motion.div>

          <motion.div className="p-8 bg-gray-900/50 rounded-xl border border-gray-800 text-center" variants={itemVariants}>
            <Phone className="h-10 w-10 mx-auto text-blue-500" />
            <h3 className="text-2xl font-bold mt-4">Vía Telefónica</h3>
            <a href="tel:+523330620287" className="mt-2 text-gray-400 hover:text-blue-400 transition-colors">33 3062 0287</a>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-20 lg:py-24 bg-[#0a0a0a]">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
                 <h2 className="text-3xl md:text-4xl font-bold text-white">Envíanos un Mensaje Directo</h2>
                 <p className="mt-4 text-lg text-gray-400">
                    Completa el siguiente formulario y nos pondremos en contacto contigo a la brevedad para discutir tu proyecto.
                 </p>
                 <div className="mt-8 flex items-center gap-4 text-gray-400">
                    <Users className="h-6 w-6 text-blue-500"/>
                    <span>Atención a Domicilio para Empresas</span>
                 </div>
                 <div className="mt-4 flex items-center gap-4 text-gray-400">
                    <MapPin className="h-6 w-6 text-blue-500"/>
                    <span>Servicio en Zapopan y Guadalajara</span>
                 </div>
            </div>
            
            <motion.form 
                onSubmit={handleSubmit}
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <motion.div variants={itemVariants}>
                    <Input type="text" placeholder="Nombre Completo" required className="bg-gray-900 border-gray-800 h-12"/>
                </motion.div>
                <motion.div variants={itemVariants}>
                    <Input type="email" placeholder="Correo Electrónico" required className="bg-gray-900 border-gray-800 h-12"/>
                </motion.div>
                <motion.div variants={itemVariants}>
                    <Textarea placeholder="¿En qué podemos ayudarte?" required rows={5} className="bg-gray-900 border-gray-800"/>
                </motion.div>
                <motion.div variants={itemVariants}>
                    <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-14 text-lg"
                        disabled={formStatus !== "Enviar Mensaje"}
                    >
                        {formStatus}
                        {formStatus === "Enviar Mensaje" && <Send className="ml-2 h-5 w-5"/>}
                    </Button>
                </motion.div>
            </motion.form>
        </div>
      </section>
    </div>
  );
};

export default ContactoPage;