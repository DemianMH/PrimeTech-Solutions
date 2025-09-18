"use client";
import React, { useState, useMemo, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { printProducts, socialMediaPlans, designPortfolio } from "@/lib/designData";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";
import { Check, Compass } from "lucide-react";

const ThemedNavbar = () => {
    const navLinks = [
        { name: "La Misión", href: "#mission" },
        { name: "Recompensas", href: "#rewards" },
        { name: "El Tesoro", href: "#treasure" },
        { name: "Bitácora", href: "#logbook" },
    ];
    return (
        <motion.nav 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 h-20 flex items-center justify-center" 
        >
            <div className="flex items-center gap-4 md:gap-8 bg-[#F8F3E9]/90 backdrop-blur-sm px-6 py-3 rounded-md shadow-lg border border-[#D1B58A]">
                <Link href="/" className="flex items-center gap-2 text-sm md:text-lg font-bold text-[#5C4033] hover:text-blue-600 transition-colors pr-4 md:pr-8 border-r-2 border-[#D1B58A]">
                    <Compass size={18} />
                    <span style={{ fontFamily: "'IM Fell English SC', serif" }}>Inicio</span>
                </Link>
                {navLinks.map(link => (
                    <a key={link.name} href={link.href} className="text-sm md:text-lg font-bold text-[#5C4033] hover:text-blue-600 transition-colors" style={{ fontFamily: "'IM Fell English SC', serif" }}>
                        {link.name}
                    </a>
                ))}
            </div>
        </motion.nav>
    );
};

const DisenoGraficoPage = () => {
    const [filter, setFilter] = useState('Todos');
    
    const categories = useMemo(() => ["Todos", ...Array.from(new Set(printProducts.map(p => p.category)))], []);
    const filteredProducts = useMemo(() => filter === 'Todos' ? printProducts : printProducts.filter(p => p.category === filter), [filter]);

    const portfolioRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: portfolioRef, offset: ["start end", "end start"] });
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

    return (
        <div className="bg-[#F8F3E9] text-gray-800 font-sans" >
            <ThemedNavbar />
            
            <header className="relative min-h-screen flex items-center justify-center overflow-hidden text-center p-4">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="relative z-10"
                >
                    <Image src="/logo-color.png" width={120} height={120} alt="PrimeTech Jolly Roger" className="mx-auto" />
                    <h1 className="text-5xl md:text-8xl font-black text-gray-900 mt-4" style={{ fontFamily: "'IM Fell English SC', serif" }}>
                        La Gran Era del <span className="text-blue-600">Diseño</span>
                    </h1>
                    <div className="mt-4 text-xl text-black max-w-2xl mx-auto">
                        Zarpamos juntos en busca de los tesoros más grandes: una marca memorable, publicidad impactante y redes sociales que conquisten los siete mares.
                    </div>
                    <Button asChild size="lg" className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-8 py-6 rounded-full hover:scale-105 transition-transform">
                        <a href="#treasure">Descubrir Tesoros</a>
                    </Button>
                </motion.div>
            </header>

            <section id="mission" className="py-24">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-5xl font-bold mb-12" style={{ fontFamily: "'IM Fell English SC', serif" }}>La Misión de tu Marca</h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                            <Image src="/diseño-grafico/tripulacion.png" width={600} height={400} alt="Branding" className="rounded-lg shadow-xl border-4 border-[#D1B58A]" />
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-left p-6 bg-black/5 rounded-lg">
                            <h3 className="text-3xl font-bold text-blue-600">Branding: Tu Propio Jolly Roger</h3>
                            <p className="mt-4 text-gray-700">Tu marca es tu bandera. Diseñamos un logo y una identidad visual que infunda respeto en tus rivales y lealtad en tu tripulación. Haremos que tu nombre sea una leyenda en todos los mares.</p>
                            <Button asChild className="mt-6 bg-gray-800 hover:bg-gray-900 text-white">
                                <a href="/contacto">Solicitar Diseño de Marca</a>
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </section>
            
            <section id="rewards" className="py-24">
                 <div className="container mx-auto px-4">
                    <h2 className="text-5xl font-bold text-center mb-12" style={{ fontFamily: "'IM Fell English SC', serif" }}>Carteles de Recompensa (Redes Sociales)</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {socialMediaPlans.map(plan => (
                             <motion.div key={plan.name} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-[#FFFDF7] border-4 border-[#D1B58A] p-6 rounded-lg shadow-lg text-center flex flex-col" style={{ backgroundImage: "url('/cartel.png')", backgroundSize: 'cover' }}>
                                 <Image src={plan.wantedImage} width={150} height={150} alt={plan.name} className=" mx-auto " />
                                 <h3 className="text-3xl font-black mt-4 uppercase" style={{ fontFamily: "'IM Fell English SC', serif" }}>{plan.name}</h3>
                                 <div className="text-4xl font-black my-2 text-gray-800">
                                    <span>${plan.price}</span>
                                    <span className="text-xl"> Berries</span>
                                 </div>
                                 <p className="text-gray-700 flex-grow mb-4">{plan.description}</p>
                                 <ul className="my-6 space-y-2 text-left">
                                     {plan.features.map(feat => <li key={feat} className="flex items-center"><Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" /> {feat}</li>)}
                                 </ul>
                                 <Button asChild className="w-full mt-auto bg-gray-800 hover:bg-black text-white font-bold">
                                    <a href="/contacto">Contratar Plan</a>
                                 </Button>
                             </motion.div>
                        ))}
                    </div>
                 </div>
            </section>
            
            <section id="treasure" className="py-24">
                <div className="container mx-auto px-4">
                    <h2 className="text-5xl font-bold text-center mb-12" style={{ fontFamily: "'IM Fell English SC', serif" }}>El Tesoro de la Imprenta</h2>
                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        {categories.map(cat => <Button key={cat} onClick={() => setFilter(cat)} variant="outline" className={`rounded-full border-2 ${filter === cat ? 'bg-blue-600 text-white border-blue-600' : 'border-[#5C4033] text-[#5C4033] bg-transparent'}`}>{cat}</Button>)}
                    </div>
                    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        <AnimatePresence>
                        {filteredProducts.map(p => (
                            <motion.div layout key={p.name} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} className="bg-[#FFFDF7]/80 border border-[#D1B58A] rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 backdrop-blur-sm">
                                <Image src={p.image} alt={p.name} width={400} height={300} className="w-full h-40 object-cover" />
                                <div className="p-4 flex flex-col flex-grow">
                                    <h3 className="text-md font-bold truncate flex-grow">{p.name}</h3>
                                    <p className="text-xl font-black text-blue-600 my-1">${p.price} <span className="text-sm font-normal text-gray-500">/ {p.unit}</span></p>
                                    <p className="text-xs text-gray-500">+${p.designPrice} por diseño.</p>
                                    <div className="mt-3 flex flex-col gap-2">
                                        <Button asChild size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white"><a href={p.whatsappUrl} target="_blank" rel="noopener noreferrer"><FaWhatsapp className="mr-2"/>Cotizar</a></Button>
                                        <Button asChild size="sm" variant="outline" className="w-full text-gray-800 border-gray-800"><a href={p.whatsappDesignUrl} target="_blank" rel="noopener noreferrer">Cotizar con Diseño</a></Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            <section id="logbook" className="py-24">
                <div className="container mx-auto px-4">
                    <h2 className="text-5xl font-bold text-center mb-12" style={{ fontFamily: "'IM Fell English SC', serif" }}>Bitácora de Viaje</h2>
                    <div className="flex gap-8 pb-4 overflow-x-auto">
                        {designPortfolio.map((item) => (
                            <div key={item.id} className="flex-shrink-0 w-80 h-96 rounded-lg shadow-lg overflow-hidden border-4 border-black">
                                <Image src={item.image} alt={item.title} width={400} height={500} className="w-full h-full object-cover"/>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DisenoGraficoPage;