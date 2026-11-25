import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

let browserClient: SupabaseClient | null = null;

/** Cliente del navegador (panel y portal). Guarda la sesión del panel en el navegador. */
export function supabaseBrowser() {
  if (!browserClient) {
    browserClient = createClient(url, anonKey, {
      auth: { persistSession: true, autoRefreshToken: true, storageKey: "pt-panel-auth" },
    });
  }
  return browserClient;
}

/** Cliente del servidor. Con `accessToken` actúa como el usuario del panel (respeta los permisos). */
export function supabaseServer(accessToken?: string) {
  return createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: accessToken ? { headers: { Authorization: `Bearer ${accessToken}` } } : undefined,
  });
}
