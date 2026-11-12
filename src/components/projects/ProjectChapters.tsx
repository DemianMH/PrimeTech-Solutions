"use client";

/* eslint-disable @next/next/no-img-element -- imágenes de proyectos con tamaños variables */
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, MoveHorizontal } from "lucide-react";
import { SiteBrowser } from "./SiteBrowser";

type HeadProps = {
  index: string;
  logo: string;
  logoAlt: string;
  kicker: string;
  title: string;
  text: string;
  url: string;
  stats: [string, string][];
  logoClass?: string;
};

/** Encabezado común de cada proyecto: logo, número de capítulo, texto y datos clave. */
function ProjectHead({ index, logo, logoAlt, kicker, title, text, url, stats, logoClass }: HeadProps) {
  return (
    <div className="pj-head reveal">
      <span className="pj-index">Proyecto {index}</span>
      <img src={logo} alt={logoAlt} className={`pj-logo ${logoClass ?? ""}`} />
      <span className="pj-kicker">{kicker}</span>
      <h2>{title}</h2>
      <p>{text}</p>
      <dl className="pj-stats">
        {stats.map(([value, label]) => (
          <div key={label}>
            <dt>{value}</dt>
            <dd>{label}</dd>
          </div>
        ))}
      </dl>
      <a href={url} target="_blank" rel="noreferrer" className="pj-cta">
        Entrar al sitio <ArrowUpRight size={17} />
      </a>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Constructora 4:44                                                   */
/* ------------------------------------------------------------------ */

const planos = [
  { name: "Modelo 46 m²", src: "/proyectos/c444/plano-46.webp" },
  { name: "Modelo 50.63 m² + terraza", src: "/proyectos/c444/plano-5063.webp" },
  { name: "Modelo 60 m²", src: "/proyectos/c444/plano-60.webp" },
  { name: "Modelo 62.86 m²", src: "/proyectos/c444/plano-6286.webp" },
  { name: "Terraza", src: "/proyectos/c444/plano-terraza.webp" },
];

/** Comparador que se arrastra entre la fachada de día y de noche. */
function DayNight() {
  const [split, setSplit] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = (clientX: number) => {
    const rect = box.current?.getBoundingClientRect();
    if (!rect) return;
    setSplit(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  };

  return (
    <div
      ref={box}
      className="daynight"
      onPointerDown={(event) => {
        dragging.current = true;
        (event.target as HTMLElement).setPointerCapture?.(event.pointerId);
        move(event.clientX);
      }}
      onPointerMove={(event) => dragging.current && move(event.clientX)}
      onPointerUp={() => (dragging.current = false)}
    >
      <img src="/proyectos/c444/noche.webp" alt="Torres Tadeo de noche" draggable={false} />
      <img
        src="/proyectos/c444/dia.webp"
        alt="Torres Tadeo de día"
        draggable={false}
        style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
      />
      <span className="daynight-tag left">Día</span>
      <span className="daynight-tag right">Noche</span>
      <div className="daynight-handle" style={{ left: `${split}%` }}>
        <input
          type="range"
          min={0}
          max={100}
          value={split}
          onChange={(event) => setSplit(Number(event.target.value))}
          aria-label="Comparar fachada de día y de noche"
        />
        <span>
          <MoveHorizontal size={18} />
        </span>
      </div>
    </div>
  );
}

export function C444Chapter() {
  const [tab, setTab] = useState<"sitio" | "planos" | "fachada" | "interiores">("sitio");
  const [plano, setPlano] = useState(0);

  return (
    <div className="pj pj-c444">
      <div className="pj-bg" style={{ backgroundImage: "url(/proyectos/c444/noche.webp)" }} aria-hidden="true" />
      <div className="pj-grid">
        <ProjectHead
          index="03"
          logo="/proyectos/c444/logo.svg"
          logoAlt="Constructora 4:44"
          kicker="Inmobiliaria · Guadalajara"
          title="Recorre cada espacio antes de comprar."
          text="Plataforma para una constructora: fichas de proyectos, recorrido virtual por plantas, cotizador hipotecario, crowdfunding y portales privados para inversionistas."
          url="https://constructora444.com/"
          stats={[
            ["5", "plantas navegables"],
            ["46 m²", "desde"],
            ["2", "portales privados"],
          ]}
        />

        <div className="pj-stage reveal">
          <div className="pj-tabs" role="tablist" aria-label="Secciones destacadas de Constructora 4:44">
            {(
              [
                ["sitio", "Ver sitio"],
                ["planos", "Planos"],
                ["fachada", "Día / noche"],
                ["interiores", "Interiores"],
              ] as const
            ).map(([key, label]) => (
              <button key={key} type="button" role="tab" aria-selected={tab === key} className={tab === key ? "on" : ""} onClick={() => setTab(key)}>
                {label}
              </button>
            ))}
          </div>

          {tab === "sitio" && (
            <SiteBrowser url="https://constructora444.com/" desktop="/portafolio/live/constructora-444-desktop.jpg" mobile="/portafolio/live/constructora-444-mobile.jpg" title="Constructora 4:44" />
          )}

          {tab === "planos" && (
            <div className="planos">
              <ol>
                {planos.map((item, i) => (
                  <li key={item.name}>
                    <button type="button" className={plano === i ? "on" : ""} onClick={() => setPlano(i)}>
                      <b>0{i + 1}</b> {item.name}
                    </button>
                  </li>
                ))}
              </ol>
              <figure key={planos[plano].src} className="plano-view">
                <img src={planos[plano].src} alt={`Planta ${planos[plano].name} de Torres Tadeo`} />
                <figcaption>
                  <span>Recorrido virtual</span> {planos[plano].name}
                </figcaption>
              </figure>
            </div>
          )}

          {tab === "fachada" && <DayNight />}

          {tab === "interiores" && (
            <div className="interiores">
              {[
                ["sala", "Sala y comedor"],
                ["cocina", "Cocina"],
                ["recamara", "Recámara"],
                ["terraza", "Terraza en azotea"],
              ].map(([file, label]) => (
                <figure key={file}>
                  <img src={`/proyectos/c444/${file}.webp`} alt={`Torres Tadeo — ${label}`} loading="lazy" />
                  <figcaption>{label}</figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Flotilla Nacional (CFN)                                             */
/* ------------------------------------------------------------------ */

const etapas = ["Solicitud", "Cita", "Diagnóstico", "Autorización", "Servicio", "Entrega", "Cierre"];

export function CfnChapter() {
  const [step, setStep] = useState(0);
  const [view, setView] = useState<"sitio" | "seguimiento" | "portal" | "mapa">("sitio");

  useEffect(() => {
    const timer = window.setInterval(() => setStep((value) => (value + 1) % etapas.length), 1400);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="pj pj-cfn">
      <div className="pj-bg" style={{ backgroundImage: "url(/proyectos/cfn/van.webp)" }} aria-hidden="true" />
      <div className="pj-grid">
        <ProjectHead
          index="02"
          logo="/proyectos/cfn/logo.svg"
          logoAlt="Flotilla Nacional CFN"
          kicker="Logística · Cobertura nacional"
          title="Tu flotilla avanza. El control también."
          text="Plataforma para coordinar mantenimiento, suministros, telepeaje y una red de talleres en todo México, con portal cliente y seguimiento de cada servicio."
          url="https://flotillanacional.com/"
          stats={[
            ["7", "etapas de control"],
            ["360°", "visibilidad"],
            ["1", "portal cliente"],
          ]}
        />

        <div className="pj-stage reveal">
          <div className="pj-tabs" role="tablist" aria-label="Vistas de Flotilla Nacional">
            {(
              [
                ["sitio", "Ver sitio"],
                ["seguimiento", "Seguimiento"],
                ["portal", "Portal cliente"],
                ["mapa", "Cobertura"],
              ] as const
            ).map(([key, label]) => (
              <button key={key} type="button" role="tab" aria-selected={view === key} className={view === key ? "on" : ""} onClick={() => setView(key)}>
                {label}
              </button>
            ))}
          </div>

          {view === "sitio" && (
            <SiteBrowser url="https://flotillanacional.com/" desktop="/portafolio/live/flotilla-nacional-desktop.jpg" mobile="/portafolio/live/flotilla-nacional-mobile.jpg" title="Flotilla Nacional" />
          )}

          {view === "seguimiento" && (
            <div className="tracker" aria-label="Seguimiento del servicio en 7 etapas">
              <div className="tracker-head">
                <span>Operación CFN</span>
                <b>Del requerimiento al cierre</b>
                <em>Trazabilidad activa</em>
              </div>
              <ol>
                {etapas.map((label, i) => (
                  <li key={label} className={i < step ? "done" : i === step ? "now" : ""}>
                    <i>{i + 1}</i>
                    <span>{label}</span>
                  </li>
                ))}
              </ol>
              <div className="tracker-bar">
                <i style={{ transform: `scaleX(${step / (etapas.length - 1)})` }} />
              </div>
            </div>
          )}

          {(view === "portal" || view === "mapa") && (
          <figure className="cfn-screen" key={view}>
            <img
              src={view === "portal" ? "/proyectos/cfn/portal.webp" : "/proyectos/cfn/mapa.webp"}
              alt={view === "portal" ? "Portal cliente de Flotilla Nacional" : "Mapa de cobertura nacional de CFN"}
            />
          </figure>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Abisai Handbags                                                     */
/* ------------------------------------------------------------------ */

const categorias = [
  { key: "tote", label: "Tote Bag" },
  { key: "crossbody", label: "Crossbody" },
  { key: "set", label: "Sets" },
  { key: "mochilas", label: "Mochilas" },
  { key: "maletas", label: "Maletas" },
];

const quiz = [
  { option: "Trabajo u oficina", pick: 0 },
  { option: "Salidas y diario", pick: 1 },
  { option: "Un regalo", pick: 2 },
  { option: "Viajes", pick: 4 },
];

export function AbisaiChapter() {
  const [active, setActive] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [tab, setTab] = useState<"sitio" | "colecciones">("sitio");
  const paused = useRef(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (!paused.current) setActive((value) => (value + 1) % categorias.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="pj pj-abisai">
      <div className="pj-bg" style={{ backgroundImage: "url(/proyectos/abisai/campana.webp)" }} aria-hidden="true" />
      <div className="pj-grid">
        <ProjectHead
          index="04"
          logo="/proyectos/abisai/logo.png"
          logoAlt="Abisai Handbags"
          logoClass="on-light"
          kicker="Moda · Mayoreo en todo México"
          title="Diseño que acompaña, estilo que permanece."
          text="Catálogo mayorista administrable para un importador de bolsas: colecciones por temporada, asistente de recomendación, solicitud de acceso mayorista y panel para cargar productos."
          url="https://abisaihandbags.com/"
          stats={[
            ["5", "colecciones"],
            ["10 s", "para recomendar"],
            ["Admin", "panel propio"],
          ]}
        />

        <div className="pj-stage reveal">
          <div className="pj-tabs" role="tablist" aria-label="Vistas de Abisai Handbags">
            <button type="button" role="tab" aria-selected={tab === "sitio"} className={tab === "sitio" ? "on" : ""} onClick={() => setTab("sitio")}>
              Ver sitio
            </button>
            <button type="button" role="tab" aria-selected={tab === "colecciones"} className={tab === "colecciones" ? "on" : ""} onClick={() => setTab("colecciones")}>
              Colecciones
            </button>
          </div>

          {tab === "sitio" && (
            <SiteBrowser url="https://abisaihandbags.com/" desktop="/portafolio/live/abisai-handbags-desktop.jpg" mobile="/portafolio/live/abisai-handbags-mobile.jpg" title="Abisai Handbags" />
          )}

          {tab === "colecciones" && (
          <>
          <div
            className="coverflow"
            onPointerEnter={() => (paused.current = true)}
            onPointerLeave={() => (paused.current = false)}
            aria-label="Colecciones de Abisai Handbags"
          >
            {categorias.map((cat, i) => {
              let offset = i - active;
              if (offset > 2) offset -= categorias.length;
              if (offset < -2) offset += categorias.length;
              return (
                <button
                  key={cat.key}
                  type="button"
                  className={`cover ${offset === 0 ? "on" : ""}`}
                  style={{
                    transform: `translateX(${offset * 58}%) translateZ(${-Math.abs(offset) * 140}px) rotateY(${offset * -32}deg)`,
                    zIndex: 10 - Math.abs(offset),
                    opacity: Math.abs(offset) > 2 ? 0 : 1,
                  }}
                  onClick={() => setActive(i)}
                  aria-label={cat.label}
                >
                  <img src={`/proyectos/abisai/cat-${cat.key}.webp`} alt="" loading="lazy" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          <div className="quiz">
            <span>Descúbrelo en 10 segundos</span>
            <b>¿Para qué la vas a usar principalmente?</b>
            <div>
              {quiz.map((item, i) => (
                <button
                  key={item.option}
                  type="button"
                  className={answer === i ? "on" : ""}
                  onClick={() => {
                    setAnswer(i);
                    setActive(item.pick);
                  }}
                >
                  {item.option}
                </button>
              ))}
            </div>
            {answer !== null && (
              <p>
                Te recomendamos: <strong>{categorias[quiz[answer].pick].label}</strong>
              </p>
            )}
          </div>
          </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* THU Talento Humano                                                  */
/* ------------------------------------------------------------------ */

const thuEtapas: [string, string][] = [
  ["1", "Captura"],
  ["2", "Conversa"],
  ["3", "Evalúa"],
  ["4", "Entrevista"],
  ["5", "Contrata"],
];

const thuModulos = ["Dashboard", "Vacantes", "Candidatos", "Mensajes", "Psicometría e IA", "Integraciones", "Reportes", "Contratación"];

export function ThuChapter() {
  const [tab, setTab] = useState<"crm" | "empleos">("crm");

  return (
    <div className="pj pj-thu">
      <div className="pj-bg" style={{ backgroundImage: "url(/portafolio/live/thu-crm-desktop.jpg)" }} aria-hidden="true" />
      <div className="pj-grid">
        <ProjectHead
          index="01"
          logo="/proyectos/thu/logo-white.svg"
          logoAlt="THU Talento Humano"
          kicker="Recursos humanos · Sistemas en servidor propio"
          title="Todo el reclutamiento, de la primera respuesta a la contratación."
          text="Dos sistemas conectados para THU Talento Humano: un CRM de reclutamiento con IA para su equipo y una bolsa de trabajo pública con planes para empresas. Instalados y operando en su propio servidor."
          url="https://crm.thu.com.mx/"
          stats={[
            ["2", "sistemas conectados"],
            ["8", "módulos de CRM"],
            ["IA", "con aprobación humana"],
          ]}
        />

        <div className="pj-stage reveal">
          <div className="pj-tabs" role="tablist" aria-label="Sistemas de THU">
            <button type="button" role="tab" aria-selected={tab === "crm"} className={tab === "crm" ? "on" : ""} onClick={() => setTab("crm")}>
              CRM de reclutamiento
            </button>
            <button type="button" role="tab" aria-selected={tab === "empleos"} className={tab === "empleos" ? "on" : ""} onClick={() => setTab("empleos")}>
              Bolsa de trabajo
            </button>
          </div>

          {tab === "crm" ? (
            <>
              <div className="thu-flow" aria-label="Flujo del candidato">
                {thuEtapas.map(([n, label]) => (
                  <div key={n}>
                    <b>{n}</b>
                    {label}
                  </div>
                ))}
              </div>
              <SiteBrowser url="https://crm.thu.com.mx/" desktop="/portafolio/live/thu-crm-desktop.jpg" mobile="/portafolio/live/thu-crm-mobile.jpg" title="THU CRM" height="min(44vh, 400px)" />
              <div className="thu-mods">
                {thuModulos.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </>
          ) : (
            <>
              <SiteBrowser url="https://reclutamiento.thu.com.mx/" desktop="/portafolio/live/thu-empleos-desktop.jpg" mobile="/portafolio/live/thu-empleos-mobile.jpg" title="THU Empleos" height="min(48vh, 440px)" />
              <div className="thu-mods">
                {["CV con IA", "Búsqueda en lenguaje natural", "Encaje por vacante", "Planes para empresas", "Privacidad del candidato"].map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
