import { erpAreas } from "@/lib/erp";

/** Módulos ERP a la medida sobre Odoo 18, agrupados por área y con nombres genéricos. */
export function ErpSection({ compact = false }: { compact?: boolean }) {
  return (
    <div className="erp-grid">
      {erpAreas.map((area) => {
        const Icon = area.icon;
        return (
          <article key={area.title} className="erp-card reveal" style={{ ["--c" as string]: area.color }}>
            <span className="ico">
              <Icon size={20} />
            </span>
            <h3>{area.title}</h3>
            <p>{area.text}</p>
            {!compact && (
              <ul>
                {area.modules.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            )}
          </article>
        );
      })}
    </div>
  );
}
