import type { ReactNode } from "react";
import "./soporte.css";

export const metadata = {
  title: "Portal de soporte",
  robots: { index: false, follow: false },
};

export default function SoporteLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
