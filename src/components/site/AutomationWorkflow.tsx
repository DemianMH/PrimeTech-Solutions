import { Workflow } from "lucide-react";

type AutomationWorkflowProps = {
  client: string;
  steps: string[];
  theme: number;
};

export function AutomationWorkflow({ client, steps, theme }: AutomationWorkflowProps) {
  return (
    <div className={`automation-workflow workflow-theme-${theme % 3}`} aria-label={`Flujo automatizado para ${client}`}>
      <div className="workflow-toolbar">
        <span><Workflow size={16} /> Flujo n8n simulado</span>
        <em><i /> Activo</em>
      </div>
      <div className="workflow-canvas">
        <span className="workflow-wire wire-0" aria-hidden="true" />
        <span className="workflow-wire wire-1" aria-hidden="true" />
        <span className="workflow-wire wire-2" aria-hidden="true" />
        <span className="workflow-wire wire-3" aria-hidden="true" />

        {steps.map((step, index) => (
          <div className={`workflow-node workflow-node-${index}`} key={step}>
            <i className="workflow-port port-in" aria-hidden="true" />
            <span>{index === 1 ? "n8n" : `Paso ${index + 1}`}</span>
            <strong>{step}</strong>
            <i className="workflow-port port-out" aria-hidden="true" />
          </div>
        ))}
      </div>
      <div className="workflow-log">
        <span /> Última ejecución completada
        <small>Datos protegidos para demostración</small>
      </div>
    </div>
  );
}
