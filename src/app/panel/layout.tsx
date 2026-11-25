import type { ReactNode } from "react";
import { PanelShell } from "@/components/panel/PanelShell";
import "./panel.css";

export const metadata = {
  title: "Panel",
  robots: { index: false, follow: false },
};

export default function PanelLayout({ children }: { children: ReactNode }) {
  return <PanelShell>{children}</PanelShell>;
}
