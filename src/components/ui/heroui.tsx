"use client";
import { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Globe from "@/components/ui/globe";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.4,
      duration: 0.8,
    },
  },
};

const textVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120, damping: 15 },
  },
};

interface HeroUIProps {
  title?: string;
  subtitle?: string;
  description?: string;
  badgeText?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
  features?: string[];
  className?: string;
}

export default function HeroUI({
  title = "PrimeTech Solutions",
  subtitle = "Tecnología y Creatividad Sin Límites",
  description = "Transformamos ideas en soluciones digitales robustas, seguras y a la medida de tus necesidades.",
  badgeText = "✨ Soluciones Integrales 360",
  primaryCTA = "Explorar Servicios",
  secondaryCTA = "Ver Portafolio",
  features = [],
  className = "",
}: HeroUIProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={ref} className={cn("relative overflow-hidden min-h-[90vh] flex items-center", className)}>
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:16px_16px]" />
        <motion.div
          className="absolute top-20 left-1/4 w-60 h-60 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[30rem] lg:h-[30rem] bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-6 sm:py-8 md:py-16 lg:py-24">
        <div className="relative min-h-[60vh] md:min-h-[70vh]">
          <motion.div
            className="absolute right-0 bottom-4 top-auto w-[70%] md:top-2 md:bottom-auto md:w-1/2 lg:top-[-60px] lg:right-[-40px] xl:top-[-80px] xl:right-[-60px] transition-all duration-500"
            style={{ y }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
          >
            <div className="w-full h-[220px] md:h-[300px] lg:h-[400px] xl:h-[450px]">
              <Globe
                baseColor={[0.12, 0.12, 0.12]}
                markerColor={[0.1, 0.8, 1]}
                glowColor={[1, 1, 1]}
              />
            </div>
          </motion.div>

          <motion.div
            className="relative z-20 w-full md:w-7/12 lg:w-1/2 pt-6 sm:pt-8 md:pt-16 lg:pt-24 md:ml-8 lg:ml-16 md:-mt-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Badge variant="destructive" className="w-fit mb-4" shiny shinySpeed={3}>
              {badgeText}
            </Badge>

            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
              variants={textVariants}
              style={{ textShadow: "0 0 12px rgba(59, 130, 246, 0.5)" }}
            >
              <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-400 bg-clip-text text-transparent">
                {title}
              </span>
              <span className="text-foreground mt-2 block">
                {subtitle}
              </span>
            </motion.h1>

            <motion.div
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mt-4"
              variants={textVariants}
            >
              {description}
            </motion.div>

            <motion.div
              className="flex flex-col md:flex-row gap-4 mt-8 w-full md:w-auto"
              variants={textVariants}
            >
              <Button asChild size="lg" className="w-full md:w-auto rounded-xl px-8 py-6 text-lg font-semibold shadow-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-105 transition-transform duration-300">
                <a href="#servicios">
                  {primaryCTA}
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full md:w-auto rounded-xl px-8 py-6 text-lg font-semibold border-2 backdrop-blur-sm"
              >
                <a href="/portafolio">
                  <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                    {secondaryCTA}
                  </span>
                </a>
              </Button>
            </motion.div>
            
            <motion.div
              className="flex items-center gap-8 mt-12 opacity-70"
              variants={textVariants}
            >
              <div className="flex gap-4 flex-wrap">
                {features.map((text) => (
                  <Badge
                    key={text}
                    variant="outline"
                    className="py-1.5 px-3 text-sm border-muted-foreground/30 bg-background/50"
                  >
                    {text}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}