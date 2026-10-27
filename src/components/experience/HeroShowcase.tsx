"use client";

/* eslint-disable @next/next/no-img-element -- capturas decorativas del hero */
import { useEffect, useRef, useState } from "react";
import { Camera, Check, CloudUpload, Workflow } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const screens = [
  { src: "/proyectos/cfn/van.webp", label: "flotillanacional.com" },
  { src: "/proyectos/c444/noche.webp", label: "constructora444.com" },
  { src: "/proyectos/abisai/campana.webp", label: "abisaihandbags.com" },
];

const chat = [
  { from: "user", text: "Hola, quiero cotizar una página web" },
  { from: "bot", text: "¡Claro! ¿Para qué tipo de negocio es?" },
  { from: "user", text: "Una constructora en Zapopan" },
  { from: "bot", text: "Perfecto, te agendo un diagnóstico sin costo." },
];

const flow = ["Formulario", "n8n", "CRM", "WhatsApp"];

/**
 * Composición del hero: una laptop con proyectos reales y tarjetas flotantes que
 * muestran cada servicio funcionando. Se inclina con el puntero (profundidad 3D).
 */
export function HeroShowcase() {
  const stage = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [screen, setScreen] = useState(0);
  const [messages, setMessages] = useState(1);
  const [backup, setBackup] = useState(18);
  const [clock, setClock] = useState("");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tick = () =>
      setClock(new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    tick();
    const timers = [
      window.setInterval(tick, 1000),
      window.setInterval(() => setScreen((s) => (s + 1) % screens.length), 3600),
      window.setInterval(() => setMessages((m) => (m >= chat.length ? 1 : m + 1)), reduced ? 4000 : 1700),
      window.setInterval(() => setBackup((b) => (b >= 100 ? 12 : Math.min(100, b + 7))), 420),
    ];
    return () => timers.forEach((t) => window.clearInterval(t));
  }, []);

  const onMove = (event: React.PointerEvent) => {
    if (event.pointerType !== "mouse" || !stage.current) return;
    const rect = stage.current.getBoundingClientRect();
    setTilt({
      x: ((event.clientY - rect.top) / rect.height - 0.5) * -8,
      y: ((event.clientX - rect.left) / rect.width - 0.5) * 12,
    });
  };

  return (
    <div
      ref={stage}
      className="hs"
      onPointerMove={onMove}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
      aria-hidden="true"
    >
      <div className="hs-scene" style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}>
        <span className="hs-glow" />

        {/* Laptop con proyectos reales */}
        <div className="hs-laptop">
          <div className="hs-lid">
            <div className="hs-bar">
              <i />
              <i />
              <i />
              <span>{screens[screen].label}</span>
            </div>
            <div className="hs-screen">
              {screens.map((item, i) => (
                <img key={item.src} src={item.src} alt="" className={i === screen ? "on" : ""} />
              ))}
            </div>
          </div>
          <div className="hs-base" />
        </div>

        {/* Chatbot de WhatsApp */}
        <div className="hs-card hs-chat">
          <header>
            <span className="hs-avatar">
              <FaWhatsapp size={16} />
            </span>
            <div>
              <b>Asistente IA</b>
              <small>en línea</small>
            </div>
          </header>
          <div className="hs-messages">
            {chat.slice(0, messages).map((m, i) => (
              <p key={i} className={m.from}>
                {m.text}
              </p>
            ))}
            {messages < chat.length && chat[messages].from === "bot" && (
              <p className="bot typing">
                <i />
                <i />
                <i />
              </p>
            )}
          </div>
        </div>

        {/* Automatización */}
        <div className="hs-card hs-flow">
          <span className="hs-tag">
            <Workflow size={14} /> Automatización
          </span>
          <div className="hs-nodes">
            {flow.map((node, i) => (
              <span key={node} style={{ animationDelay: `${i * 0.5}s` }}>
                {node}
              </span>
            ))}
            <i className="hs-pulse" />
          </div>
        </div>

        {/* CCTV en vivo */}
        <div className="hs-card hs-cctv">
          <div className="hs-feed">
            <img src="/proyectos/c444/noche.webp" alt="" />
            <span className="hs-live">
              <i /> EN VIVO
            </span>
            <span className="hs-cam">
              <Camera size={12} /> CAM 02 · {clock}
            </span>
          </div>
        </div>

        {/* Respaldo en la nube */}
        <div className="hs-card hs-cloud">
          <span className="hs-tag">
            {backup >= 100 ? <Check size={14} /> : <CloudUpload size={14} />}
            {backup >= 100 ? "Respaldo completo" : "Respaldando en la nube"}
          </span>
          <div className="hs-progress">
            <i style={{ width: `${backup}%` }} />
          </div>
          <small>{backup}%</small>
        </div>
      </div>
    </div>
  );
}
