"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { BarChart3, Briefcase, LayoutDashboard, LifeBuoy, LogOut, Menu, Repeat, Users, X } from "lucide-react";
import { supabaseBrowser } from "@/lib/supabase";

const NAV = [
  { href: "/panel", label: "Inicio", icon: LayoutDashboard },
  { href: "/panel/tickets", label: "Tickets", icon: LifeBuoy },
  { href: "/panel/clientes", label: "Clientes", icon: Users },
  { href: "/panel/proyectos", label: "Proyectos", icon: Briefcase },
  { href: "/panel/suscripciones", label: "Suscripciones", icon: Repeat },
  { href: "/panel/contabilidad", label: "Contabilidad", icon: BarChart3 },
];

export function PanelShell({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [recovery, setRecovery] = useState(false);
  const [menu, setMenu] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const sb = supabaseBrowser();
    sb.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = sb.auth.onAuthStateChange((event, s) => {
      if (event === "PASSWORD_RECOVERY") setRecovery(true);
      setSession(s);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return setIsAdmin(null);
    supabaseBrowser()
      .rpc("is_admin")
      .then(({ data }) => setIsAdmin(Boolean(data)));
  }, [session]);

  useEffect(() => setMenu(false), [pathname]);

  if (session === undefined) return <div className="pa-loading">Cargando…</div>;
  if (recovery && session) return <SetPassword onDone={() => setRecovery(false)} />;
  if (!session) return <Login />;
  if (isAdmin === null) return <div className="pa-loading">Verificando acceso…</div>;
  if (!isAdmin)
    return (
      <div className="pa-auth">
        <div className="pa-auth-card">
          <h1>Sin acceso</h1>
          <p>La cuenta {session.user.email} no está autorizada para el panel.</p>
          <button className="pa-btn" onClick={() => supabaseBrowser().auth.signOut()}>
            Salir
          </button>
        </div>
      </div>
    );

  return (
    <div className={`pa-app ${menu ? "menu-open" : ""}`}>
      <aside className="pa-side">
        <Link href="/panel" className="pa-brand">
          <Image src="/logo-color.png" width={34} height={34} alt="" />
          <span>
            Prime<b>Tech</b>
            <small>Panel</small>
          </span>
        </Link>
        <nav>
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = href === "/panel" ? pathname === href : pathname?.startsWith(href);
            return (
              <Link key={href} href={href} className={active ? "active" : ""}>
                <Icon size={18} /> {label}
              </Link>
            );
          })}
        </nav>
        <div className="pa-side-foot">
          <span title={session.user.email}>{session.user.email}</span>
          <button type="button" onClick={() => supabaseBrowser().auth.signOut()}>
            <LogOut size={16} /> Salir
          </button>
        </div>
      </aside>
      <button type="button" className="pa-burger" onClick={() => setMenu((v) => !v)} aria-label="Menú">
        {menu ? <X size={20} /> : <Menu size={20} />}
      </button>
      <section className="pa-main">{children}</section>
    </div>
  );
}

function Login() {
  const [mode, setMode] = useState<"login" | "crear" | "olvido">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    const sb = supabaseBrowser();
    const redirectTo = `${window.location.origin}/panel`;
    if (mode === "login") {
      const { error } = await sb.auth.signInWithPassword({ email, password });
      if (error) setMsg(error.message === "Invalid login credentials" ? "Correo o contraseña incorrectos." : error.message);
    } else if (mode === "crear") {
      const { data, error } = await sb.auth.signUp({ email, password, options: { emailRedirectTo: redirectTo } });
      if (error) setMsg(error.message);
      else if (!data.session) setMsg("Listo. Te enviamos un correo para confirmar tu cuenta; ábrelo y después entra aquí.");
    } else {
      const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo });
      setMsg(error ? error.message : "Te enviamos un enlace para crear una contraseña nueva.");
    }
    setBusy(false);
  };

  return (
    <div className="pa-auth">
      <form className="pa-auth-card" onSubmit={submit}>
        <Image src="/logo-color.png" width={52} height={52} alt="PrimeTech" />
        <h1>{mode === "login" ? "Panel PrimeTech" : mode === "crear" ? "Crear tu acceso" : "Recuperar contraseña"}</h1>
        <p>{mode === "crear" ? "Usa tu Gmail autorizado y elige una contraseña." : "Tickets, clientes, proyectos y contabilidad."}</p>
        <label>
          Correo
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tucorreo@gmail.com" autoComplete="email" />
        </label>
        {mode !== "olvido" && (
          <label>
            Contraseña
            <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={mode === "crear" ? "new-password" : "current-password"} />
          </label>
        )}
        {msg && <p className="pa-note">{msg}</p>}
        <button className="pa-btn" disabled={busy}>
          {busy ? "Un momento…" : mode === "login" ? "Entrar" : mode === "crear" ? "Crear acceso" : "Enviar enlace"}
        </button>
        <div className="pa-auth-links">
          {mode !== "login" && <button type="button" onClick={() => setMode("login")}>Ya tengo contraseña</button>}
          {mode !== "crear" && <button type="button" onClick={() => setMode("crear")}>Primera vez</button>}
          {mode !== "olvido" && <button type="button" onClick={() => setMode("olvido")}>Olvidé mi contraseña</button>}
        </div>
      </form>
    </div>
  );
}

function SetPassword({ onDone }: { onDone: () => void }) {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  return (
    <div className="pa-auth">
      <form
        className="pa-auth-card"
        onSubmit={async (e) => {
          e.preventDefault();
          const { error } = await supabaseBrowser().auth.updateUser({ password });
          if (error) setMsg(error.message);
          else onDone();
        }}
      >
        <h1>Nueva contraseña</h1>
        <label>
          Contraseña
          <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
        </label>
        {msg && <p className="pa-note">{msg}</p>}
        <button className="pa-btn">Guardar</button>
      </form>
    </div>
  );
}
