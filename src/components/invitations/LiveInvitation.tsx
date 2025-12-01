"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Gift, Music, Play, Pause, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { InvitationData, eventConfig } from '@/lib/invitationData';
import { cn } from '@/lib/utils';

// Diccionario de iconos para el itinerario
const iconMap: Record<string, any> = {
    church: { icon: '⛪', bg: 'bg-amber-100 text-amber-600' },
    rings: { icon: '💍', bg: 'bg-blue-100 text-blue-600' },
    cheers: { icon: '🥂', bg: 'bg-yellow-100 text-yellow-600' },
    dinner: { icon: '🍽️', bg: 'bg-orange-100 text-orange-600' },
    party: { icon: '💃', bg: 'bg-purple-100 text-purple-600' },
    cake: { icon: '🎂', bg: 'bg-pink-100 text-pink-600' },
    photo: { icon: '📸', bg: 'bg-sky-100 text-sky-600' },
    bus: { icon: '🚌', bg: 'bg-green-100 text-green-600' },
};

const fontClasses: Record<string, string> = {
  'modern': 'font-sans tracking-wide',
  'elegant': 'font-serif italic tracking-wide',
  'handwritten': 'font-mono',
  'classic': 'font-serif tracking-widest',
  'playful': 'font-black tracking-tight',
  'spooky': 'font-serif tracking-widest uppercase',
  'tech': 'font-mono tracking-tighter uppercase',
};

const calculateTimeLeft = (date: string) => {
  const difference = +new Date(date) - +new Date();
  if (difference > 0) {
    return {
      Días: Math.floor(difference / (1000 * 60 * 60 * 24)),
      Hrs: Math.floor((difference / (1000 * 60 * 60)) % 24),
      Min: Math.floor((difference / 1000 / 60) % 60),
      Seg: Math.floor((difference / 1000) % 60),
    };
  }
  return { Días: 0, Hrs: 0, Min: 0, Seg: 0 };
};

export default function LiveInvitation({ data, previewMode = false }: { data: InvitationData, previewMode?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [timeLeft, setTimeLeft] = useState({ Días: 0, Hrs: 0, Min: 0, Seg: 0 });

  const config = eventConfig[data.type] || eventConfig.boda; 

  useEffect(() => {
    setTimeLeft(calculateTimeLeft(data.eventDate));
    const timer = setInterval(() => { setTimeLeft(calculateTimeLeft(data.eventDate)); }, 1000);
    return () => clearInterval(timer);
  }, [data.eventDate]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) { audioRef.current.pause(); } else { audioRef.current.play().catch(console.error); }
    setIsPlaying(!isPlaying);
  };

  const handleOpenInvitation = () => {
    setIsOpen(true);
    if (data.musicUrl && !previewMode) { setTimeout(() => toggleMusic(), 500); }
  };

  // --- MEGA LISTA DE TEMAS ---
  const getThemeStyles = () => {
    const themes: Record<string, any> = {
        // Sólidos Clásicos
        gold:   { bg: "bg-stone-50", text: "text-stone-800", accent: "bg-stone-200", button: "bg-stone-600" },
        navy:   { bg: "bg-slate-900", text: "text-slate-50", accent: "bg-slate-800", button: "bg-blue-500" },
        black:  { bg: "bg-black",     text: "text-white",      accent: "bg-neutral-900",  button: "bg-white text-black" },
        rose:   { bg: "bg-rose-50", text: "text-rose-900", accent: "bg-rose-100", button: "bg-rose-600" },
        blue:   { bg: "bg-blue-50", text: "text-blue-900", accent: "bg-blue-100", button: "bg-blue-600" },
        purple: { bg: "bg-purple-50", text: "text-purple-900", accent: "bg-purple-100", button: "bg-purple-600" },
        green:  { bg: "bg-green-50", text: "text-green-900", accent: "bg-green-100", button: "bg-green-600" },
        red:    { bg: "bg-red-50", text: "text-red-900", accent: "bg-red-100", button: "bg-red-600" },
        teal:   { bg: "bg-teal-50", text: "text-teal-900", accent: "bg-teal-100", button: "bg-teal-600" },
        sky:    { bg: "bg-sky-50", text: "text-sky-900", accent: "bg-sky-100", button: "bg-sky-500" },
        
        // Nuevos Sólidos
        emerald:{ bg: "bg-emerald-50", text: "text-emerald-900", accent: "bg-emerald-100", button: "bg-emerald-600" },
        indigo: { bg: "bg-indigo-50", text: "text-indigo-900", accent: "bg-indigo-100", button: "bg-indigo-600" },
        fuchsia:{ bg: "bg-fuchsia-50", text: "text-fuchsia-900", accent: "bg-fuchsia-100", button: "bg-fuchsia-600" },
        slate:  { bg: "bg-slate-200", text: "text-slate-900", accent: "bg-slate-300", button: "bg-slate-800" },
        
        // --- GRADIENTES ---
        sunset: { bg: "bg-gradient-to-br from-orange-100 to-rose-200", text: "text-rose-900", accent: "bg-white/40", button: "bg-gradient-to-r from-orange-500 to-rose-500" },
        ocean:  { bg: "bg-gradient-to-br from-blue-100 to-cyan-200", text: "text-blue-900", accent: "bg-white/40", button: "bg-gradient-to-r from-blue-500 to-cyan-500" },
        royal:  { bg: "bg-gradient-to-br from-slate-900 to-purple-900", text: "text-white", accent: "bg-white/10", button: "bg-gradient-to-r from-amber-400 to-yellow-500 text-black" },
        forest: { bg: "bg-gradient-to-br from-green-50 to-emerald-200", text: "text-emerald-900", accent: "bg-white/40", button: "bg-gradient-to-r from-green-600 to-emerald-600" },
        midnight:{ bg: "bg-gradient-to-b from-gray-900 via-blue-900 to-black", text: "text-blue-50", accent: "bg-white/10", button: "bg-blue-600" },
        berry:  { bg: "bg-gradient-to-br from-pink-100 to-purple-200", text: "text-purple-900", accent: "bg-white/40", button: "bg-gradient-to-r from-pink-500 to-purple-500" },
        fire:   { bg: "bg-gradient-to-br from-yellow-100 to-red-200", text: "text-red-900", accent: "bg-white/40", button: "bg-gradient-to-r from-orange-500 to-red-600" },
        aurora: { bg: "bg-gradient-to-br from-green-200 via-cyan-200 to-blue-200", text: "text-blue-900", accent: "bg-white/40", button: "bg-blue-600" },
    };
    return themes[data.themeColor] || themes.gold;
  };

  const theme = getThemeStyles();
  const fontClass = fontClasses[data.font] || fontClasses.modern;

  if (!isOpen && !previewMode) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-6">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={cn("rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl relative border border-white/10 flex flex-col items-center gap-6", theme.bg)}>
           <div className={cn("w-24 h-24 rounded-full flex items-center justify-center text-5xl shadow-inner mb-2", theme.accent)}>{config.icon}</div>
           <div><h2 className={cn("text-xl font-bold uppercase tracking-wider mb-2", theme.text, fontClass)}>{config.labels.host}</h2><p className={cn("opacity-80 text-lg", theme.text)}>De: {data.hosts.join(' & ')}</p></div>
           <Button onClick={handleOpenInvitation} className={cn("w-full py-6 rounded-full font-bold shadow-lg text-lg hover:scale-105 transition-transform", theme.button)}>Ver Invitación</Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={cn("min-h-screen overflow-x-hidden relative pb-24 transition-colors duration-500", theme.bg, theme.text, fontClass)}>
      
      {data.musicUrl && (
        <div className="fixed top-4 right-4 z-40">
           <audio ref={audioRef} src={data.musicUrl} loop />
           <Button onClick={toggleMusic} size="icon" className="rounded-full shadow-lg bg-black/20 backdrop-blur-md border border-white/20 text-white">{isPlaying ? <Pause size={18}/> : <Play size={18}/>}</Button>
        </div>
      )}

      <header className="relative h-[60vh] flex flex-col justify-end items-center pb-12 text-center text-white">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
        {data.coverImage ? <Image src={data.coverImage} alt="Cover" fill className="object-cover z-0" /> : <div className={cn("absolute inset-0 z-0 flex items-center justify-center text-6xl", theme.accent)}>{config.icon}</div>}
        <div className="relative z-20 px-6 w-full max-w-md">
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold tracking-[0.2em] uppercase border border-white/20 mb-4">{config.labels.host}</span>
                <h1 className="text-5xl mb-4 leading-none drop-shadow-xl font-bold">{data.hosts.join(data.type === 'boda' ? ' & ' : ' ')}</h1>
                {config.sections.hasAge && data.age && <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-t from-white to-white/70 mb-4 drop-shadow-sm">{data.age} AÑOS</div>}
                <div className="inline-flex items-center gap-2 text-sm font-medium bg-black/30 backdrop-blur-md px-5 py-2 rounded-full border border-white/10"><Calendar size={14} /><span>{new Date(data.eventDate).toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric', month: 'short' })} • {new Date(data.eventDate).toLocaleTimeString('es-MX', {hour: '2-digit', minute:'2-digit'})}</span></div>
            </motion.div>
        </div>
      </header>

      <section className="relative z-30 px-4 -mt-10 mb-12">
        <div className={cn("max-w-xs mx-auto backdrop-blur-md rounded-2xl shadow-xl p-4 grid grid-cols-4 gap-1 text-center divide-x border border-white/20", theme.bg.includes('slate-900') || theme.bg.includes('black') ? 'bg-slate-800/80' : 'bg-white/80')}>
           {Object.entries(timeLeft).map(([unit, value]) => (<div key={unit} className="flex flex-col items-center"><span className="text-xl font-black leading-none">{value}</span><span className="text-[8px] uppercase opacity-60 font-bold mt-1">{unit}</span></div>))}
        </div>
      </section>

      <div className="max-w-md mx-auto px-6 space-y-12">
          
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center">
              <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3", theme.accent)}><MapPin size={20} className="opacity-80" /></div>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] opacity-50 mb-1">{config.labels.location}</h2>
              <h3 className="text-2xl font-bold mb-2">{data.location.name}</h3>
              <p className="opacity-80 text-sm font-light mb-4">{data.location.address}</p>
              <Button asChild size="sm" variant="outline" className="rounded-full bg-transparent border-current/30 hover:bg-current/5 h-8 text-xs"><a href={data.location.mapUrl} target="_blank">Ver Mapa</a></Button>
          </motion.div>

          {/* ITINERARIO */}
          {data.itinerary && data.itinerary.length > 0 && (
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="py-6 border-t border-current/10">
                <div className="text-center mb-6">
                    <Clock size={24} className="mx-auto mb-2 opacity-50"/>
                    <h2 className="text-xs font-bold uppercase tracking-[0.2em] opacity-50">Itinerario</h2>
                </div>
                <div className="relative pl-4 border-l-2 border-current/10 space-y-8 ml-4">
                    {data.itinerary
                        .sort((a, b) => a.time.localeCompare(b.time))
                        .map((item) => (
                        <div key={item.id} className="relative pl-6">
                            <div className="absolute -left-[25px] top-0 w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-lg z-10">
                                {iconMap[item.icon]?.icon || '•'}
                            </div>
                            <span className="text-xs font-bold opacity-60 bg-current/5 px-2 py-0.5 rounded">{item.time}</span>
                            <h4 className="text-lg font-bold mt-1 leading-tight">{item.description}</h4>
                        </div>
                    ))}
                </div>
            </motion.div>
          )}

          {config.sections.hasReception && data.reception?.name && (
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center pt-8 border-t border-current/10">
                <Music size={24} className="mx-auto mb-3 opacity-40" />
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] opacity-50 mb-1">{config.labels.reception}</h2>
                <h3 className="text-xl font-bold">{data.reception.name}</h3>
                <p className="opacity-70 text-sm mb-2">{data.reception.address}</p>
            </motion.div>
          )}
          
          {config.sections.hasPadrinos && data.padrinos && data.padrinos.length > 0 && (
             <div className="text-center pt-8 border-t border-current/10">
                <h3 className="text-sm font-bold uppercase tracking-widest opacity-60 mb-4">Padrinos</h3>
                <ul className="space-y-1">{data.padrinos.map((p, i) => <li key={i} className="text-md opacity-90">{p}</li>)}</ul>
             </div>
          )}

          {data.giftRegistry?.type !== 'none' && (
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className={cn("text-center p-6 rounded-2xl", theme.accent)}>
                <Gift size={28} className="mx-auto mb-3 opacity-70" />
                <h2 className="text-lg font-bold mb-2">{config.sections.giftLabel}</h2>
                <p className="text-sm italic opacity-80 mb-4">"{data.giftRegistry?.phrase}"</p>
                {data.giftRegistry?.type === 'sobres' && <p className="text-xs font-bold uppercase border border-current/20 inline-block px-3 py-1 rounded">✉️ Lluvia de Sobres</p>}
                {data.giftRegistry?.bankInfo && <div className="bg-white/50 p-4 rounded-lg text-xs font-mono text-left break-all whitespace-pre-line mt-2">{data.giftRegistry.bankInfo}</div>}
                 {data.giftRegistry?.url && <Button asChild size="sm" className="mt-4 w-full bg-white/80 hover:bg-white text-black h-8 text-xs"><a href={data.giftRegistry.url} target="_blank">Ver Lista de Regalos</a></Button>}
            </motion.div>
          )}

          {data.dressCode && (
              <div className="text-center text-sm opacity-70 border-t border-current/10 pt-6">
                  <span className="font-bold uppercase text-[10px] tracking-widest block mb-1">Código de Vestimenta</span>
                  {data.dressCode.label}
              </div>
          )}
          <div className="h-10"></div>
      </div>

      <div className="fixed bottom-4 left-4 right-4 z-50">
         <Button asChild className={cn("w-full py-6 rounded-full font-bold shadow-xl text-md border-none text-white", theme.button)}>
            <a href={`https://wa.me/${data.whatsappNumber}`} target="_blank" className="flex items-center justify-center gap-2"><Sparkles size={16} /> {config.labels.action}</a>
         </Button>
      </div>
    </div>
  );
}