import { Bot, CircuitBoard, Cog, Satellite, Shield, Sparkles } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

export function PrimeRobot({ label = "PrimeBot" }: { label?: string }) {
  return (
    <div className="robot-scene" aria-hidden="true">
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="signal-dot dot-one" />
      <div className="signal-dot dot-two" />
      <div className="robot-body">
        <div className="robot-antenna" />
        <span className="robot-ear robot-ear-left" />
        <span className="robot-ear robot-ear-right" />
        <div className="robot-head">
          <span className="robot-eye" />
          <span className="robot-eye" />
          <span className="robot-smile" />
        </div>
        <div className="robot-core">
          <span />
          <span />
          <span />
        </div>
        <div className="robot-panel">
          <Sparkles size={16} />
          <span>{label}</span>
        </div>
      </div>
      <div className="ship-shadow" />
    </div>
  );
}

export function ServiceGlyph({ accent, type }: { accent: string; type: string }) {
  const icon =
    type === "cctv" ? (
      <Shield size={44} />
    ) : type === "nube" ? (
      <Satellite size={44} />
    ) : type === "infraestructura" ? (
      <CircuitBoard size={44} />
    ) : type === "reparacion-equipo" ? (
      <Cog size={44} />
    ) : (
      <Bot size={44} />
    );

  return (
    <div className="service-glyph" style={{ "--accent": accent } as CSSProperties} aria-hidden="true">
      <div className="glyph-ring" />
      <div className="glyph-core">{icon}</div>
      <span className="glyph-pulse pulse-a" />
      <span className="glyph-pulse pulse-b" />
    </div>
  );
}

export function ServiceShowcase({
  accent,
  type,
  title,
  icon,
}: {
  accent: string;
  type: string;
  title: string;
  icon: ReactNode;
}) {
  const labels: Record<string, string[]> = {
    automatizaciones: ["Trigger", "Accion", "Reporte"],
    "sitios-web": ["Home", "SEO", "Leads"],
    "chatbots-agentes-ia": ["Prompt", "Datos", "Respuesta"],
    "venta-equipos": ["CPU", "Setup", "Garantia"],
    cctv: ["Camara", "NVR", "Movil"],
    infraestructura: ["Rack", "Switch", "Wi-Fi"],
    nube: ["Backup", "Acceso", "Sync"],
    "reparacion-equipo": ["Diagnostico", "Piezas", "Entrega"],
  };
  const steps = labels[type] ?? ["Plan", "Build", "Launch"];

  return (
    <div className={`service-showcase showcase-${type}`} style={{ "--accent": accent } as CSSProperties} aria-hidden="true">
      <div className="depth-grid" />
      <div className="showcase-halo" />
      <div className="showcase-main-icon">{icon}</div>
      <div className="showcase-title">{title}</div>
      <div className="showcase-nodes">
        {steps.map((step, index) => (
          <span key={step} className={`node-${index + 1}`}>
            {step}
          </span>
        ))}
      </div>
      <div className="showcase-bars">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

export function MotionLines() {
  return (
    <div className="motion-lines" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}
