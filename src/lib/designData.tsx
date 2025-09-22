import React from 'react';

const WHATSAPP_NUMBER = "523334862414";

const generateWhatsAppLink = (productName: string) => {
  const message = `¡Ahoy! Estoy interesado en el tesoro: *${productName}*. ¿Podrían darme más información y una cotización?`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

// Esta es la lista de productos base sin precios
const baseProducts = [
    { name: "Lona front", unit: "M2", imageName: "lona-front.png" },
    { name: "Lona mesh", unit: "M2", imageName: "lona-mesh.png" },
    { name: "Lona translucida", unit: "M2", imageName: "lona-translucida.jpg" },
    { name: "Lona blanca con terminados", unit: "M2", imageName: "lona-terminados.jpg" },
    { name: "Lona mate", unit: "m2", imageName: "lona-mate.jpg" },
    { name: "Vinil blanco brillante", unit: "M2", imageName: "vinil-brillante.png" },
    { name: "Vinil blanco mate", unit: "M2", imageName: "vinil-mate.jpg" },
    { name: "Vinil microperforado", unit: "M2", imageName: "vinil-microperforado.png" },
    { name: "Vinil transparente (*140cm)", unit: "M2", imageName: "vinil-transparente.png" },
    { name: "Vinil estatico (transp/blanco)", unit: "M2", imageName: "vinil-estatico.jpg" },
    { name: "Vinil holografico (*150cm)", unit: "ML", imageName: "vinil-holografico.jpeg" },
    { name: "Vinil Reflejante 3m", unit: "ML", imageName: "vinil-reflejante-3m.jpg" },
    { name: "Vinil color impreso", unit: "ML", imageName: "vinil-color-impreso.jpg" },
    { name: "Vinil esmerilado (*120cm)", unit: "ML", imageName: "vinil-esmerilado.jpg" },
    { name: "Vinil blanco brillante/mate c/suaje", unit: "ML", imageName: "vinil-blanco-suaje.jpeg" },
    { name: "Vinil transparente con suaje", unit: "ML", imageName: "vinil-transparente-suaje.jpeg" },
    { name: "Vinil de color con suaje", unit: "ML", imageName: "vinil-color-suaje.jpg" },
    { name: "Vinil Reflejante 3m con suaje", unit: "ML", imageName: "vinil-reflejante-suaje.jpg" },
    { name: "Vinil laminado vinil transparente", unit: "m2", imageName: "vinil-laminado.jpeg" },
    { name: "Tarjetas solo frente barniz brillante", unit: "MILLAR", imageName: "tarjetas-frente-brillante.jpeg" },
    { name: "Tarjetas frente y vuelta brillante", unit: "MILLAR", imageName: "tarjetas-fv-brillante.jpg" },
    { name: "Tarjeta laminadas mate", unit: "MILLAR", imageName: "tarjetas-laminado-mate.png" },
    { name: "Volantes 1/2 carta frente", unit: "MILLAR", imageName: "volantes-media-frente.jpg" },
    { name: "5 mil volantes 1/2 carta solo frente", unit: "MILLAR", imageName: "5mil-volantes.jpg" },
    { name: "10 mil volantes 1/2 carta solo frente", unit: "MILLAR", imageName: "10mil-volantes.jpg" },
    { name: "Tripticos", unit: "MILLAR", imageName: "tripticos.png" },
    { name: "Carpetas barniz brillante", unit: "MILLAR", imageName: "carpetas-brillante.jpg" },
    { name: "Volantes 1/2 carta frente y vuelta", unit: "MILLAR", imageName: "volantes-media-fv.png" },
    { name: "Volantes bond color 1/2 carta", unit: "MILLAR", imageName: "volantes-bond-color.jpg" },
    { name: "Volantes bond 1 tinta 1/2 carta", unit: "MILLAR", imageName: "volantes-bond-1tinta.jpg" },
    { name: "Hojas membretadas color bond carta 90gr", unit: "MILLAR", imageName: "hojas-membretadas-carta-90gr.jpg" },
    { name: "Hojas membretadas 1 tinta bond carta 90gr", unit: "MILLAR", imageName: "hojas-membretadas-1tinta.png" },
    { name: "Hojas membretadas 2 tintas bond carta 90gr", unit: "MILLAR", imageName: "hojas-membretadas-2tintas.jpg" },
    { name: "Hojas membretadas color bond Oficio 90gr", unit: "MILLAR", imageName: "hojas-membretadas-oficio.jpg" },
    { name: "Hojas membretadas color bond 120gr", unit: "CIENTO", imageName: "hojas-membretadas-120gr.jpeg" },
    { name: "Notas 1/2 carta 1 tinta 1 copia c/folio", unit: "MILLAR", imageName: "notas-media-copia.jpg" },
    { name: "Notas 1/4 carta 1 tinta 1 copia c/folio", unit: "MILLAR", imageName: "notas-cuarto-copia.jpeg" },
    { name: "Notas bond 1/2 carta 1 tinta c/folio", unit: "MILLAR", imageName: "notas-bond-media.jpg" },
    { name: "Notas bond 1/4 carta 1 tinta c/folio", unit: "MILLAR", imageName: "notas-bond-cuarto.jpeg" },
    { name: "Notas bond 1/4 oficio", unit: "MILLAR", imageName: "notas-bond-oficio.jpeg" },
    { name: "Recetas Medicas media carta bond 90gr", unit: "MILLAR", imageName: "recetas-bond-90gr.jpg" },
    { name: "Recetas Medicas media carta color bond 120gr", unit: "MILLAR", imageName: "recetas-color-120gr.png" },
    { name: "Notas tamaño carta F/V 1 tinta 1 copia c/folio", unit: "MILLAR", imageName: "notas-carta-fv-copia.png" },
    { name: "Folders", unit: "Ciento", imageName: "folders.png" },
    { name: "Rollup", unit: "PIEZA", imageName: "rollup.png" },
    { name: "Display 60x160", unit: "PIEZA", imageName: "display-60x160.png" },
    { name: "Display 80x180", unit: "PIEZA", imageName: "display-80x180.png" },
    { name: "Taza blanca 11 oz 9x20cm", unit: "PIEZA", imageName: "taza-blanca.png" },
    { name: "Taza Magica 11oz 9x20", unit: "PIEZA", imageName: "taza-magica.png" },
    { name: "Taza blanca interior color 9x20cm", unit: "PIEZA", imageName: "taza-interior-color.png" },
    { name: "Playera sublimada solo frente 21x28", unit: "PIEZA", imageName: "playera-sublimada-frente.png" },
    { name: "Playera sublimada frente y espalda 21x28", unit: "PIEZA", imageName: "playera-sublimada-fv.png" },
    { name: "Mousepad", unit: "PIEZA", imageName: "mousepad.png" },
    { name: "Pin 5.8 cm (minimo 24 pzas)", unit: "Pieza", imageName: "pin-58mm.png" },
    { name: "Playera estampada DTF pecho adulto", unit: "PIEZA", imageName: "playera-dtf-adulto.png" },
    { name: "Playera estampada DTF pecho niño", unit: "PIEZA", imageName: "playera-dtf-nino.png" },
    { name: "Iman automotriz", unit: "ML", imageName: "iman-automotriz.png" },
    { name: "Pelicula back light", unit: "ML", imageName: "pelicula-backlight.png" },
    { name: "Tela bandera", unit: "ML", imageName: "tela-bandera.png" },
    { name: "Canvas 150cm", unit: "ML", imageName: "canvas.png" },
    { name: "Trovicel 3mm 120x100cm", unit: "ML", imageName: "trovicel-3mm.png" },
    { name: "Lamina completa trovicel 3mm 120x240 cm", unit: "LAMINA", imageName: "lamina-trovicel.png" },
    { name: "Coroplast 120x100 cm", unit: "ML", imageName: "coroplast.png" },
    { name: "Lamina completa coroplast 120x240 cm", unit: "LAMINA", imageName: "lamina-coroplast.png" },
    { name: "Estireno cal 15 140x118", unit: "LAMINA", imageName: "estireno-cal15.png" },
    { name: "Estireno cal 15 Frente y vuelta 140x118", unit: "LAMINA", imageName: "estireno-cal15-fv.png" },
    { name: "DTF (*58cm)", unit: "ml", imageName: "dtf.png" },
    { name: "Couche 300gr", unit: "PIEZA", imageName: "couche-300gr.png" },
    { name: "Couche 150gr", unit: "PIEZA", imageName: "couche-150gr.png" },
    { name: "Opalina 240gr", unit: "PIEZA", imageName: "opalina-240gr.png" },
    { name: "Adherible Fasson", unit: "PIEZA", imageName: "adherible-fasson.png" },
    { name: "Albanene", unit: "PIEZA", imageName: "albanene.png" },
    { name: "Barniz antigraffiti", unit: "M2", imageName: "barniz-antigraffiti.png" },
    { name: "Laminado floor graphic (*140)", unit: "ML", imageName: "laminado-floor-graphic.png" },
    { name: "Corte de vinil colores basicos (*58cm)", unit: "ML", imageName: "corte-vinil-58cm.png" },
    { name: "Corte de vinil colores basicos (*120cm)", unit: "ML", imageName: "corte-vinil-120cm.png" },
    { name: "Corte de vinil Esmerilado (*58cm)", unit: "ML", imageName: "corte-vinil-esmerilado-58cm.png" },
    { name: "Corte de vinil Esmerilado (*120cm)", unit: "ML", imageName: "corte-vinil-esmerilado-120cm.png" },
    { name: "Corte de vinil textil colores basicos (*48cm)", unit: "ML", imageName: "corte-vinil-textil.png" },
    { name: "Corte de vinil espejo (*58cm)", unit: "ML", imageName: "corte-vinil-espejo.png" },
    { name: "Corte de vinil fluorescente (*58cm)", unit: "ML", imageName: "corte-vinil-fluorescente.png" },
    { name: "Vinil textil impreso con suaje", unit: "ML", imageName: "vinil-textil-impreso.png" },
    { name: "Barniz brillante para digital", unit: "PZA", imageName: "barniz-brillante.png" },
    { name: "Redondeo cada esquina", unit: "PZA", imageName: "redondeo-esquina.png" },
    { name: "Doblez", unit: "PZA", imageName: "doblez.png" },
    { name: "Ojillos extras", unit: "PIEZA", imageName: "ojillos.png" },
    { name: "Laminado vinil transparente", unit: "M2", imageName: "laminado-transparente.png" },
];

const allProducts = baseProducts.map(p => {
    const categoryMap: { [key: string]: string } = {
        lona: "Lonas", vinil: "Viniles",
        tarjetas: "Papelería", volantes: "Papelería", hojas: "Papelería", notas: "Papelería", recetas: "Papelería", folders: "Papelería", couche: "Papelería", opalina: "Papelería", adherible: "Papelería", albanene: "Papelería",
        rollup: "Displays", display: "Displays",
        taza: "Promocionales", playera: "Promocionales", mousepad: "Promocionales", gafete: "Promocionales", pin: "Promocionales",
        iman: "Materiales Especiales", pelicula: "Materiales Especiales", tela: "Materiales Especiales", canvas: "Materiales Especiales", trovicel: "Materiales Especiales", coroplast: "Materiales Especiales", estireno: "Materiales Especiales", dtf: "Materiales Especiales",
        barniz: "Acabados", laminado: "Acabados", corte: "Acabados", redondeo: "Acabados", doblez: "Acabados", ojillos: "Acabados",
    };
    const assignedCategory = Object.keys(categoryMap).find(key => p.name.toLowerCase().includes(key));
    
    return {
        name: p.name,
        unit: p.unit,
        category: assignedCategory ? categoryMap[assignedCategory] : "Otros",
        image: `/diseño-grafico/${p.imageName}`,
        whatsappUrl: generateWhatsAppLink(p.name),
    }
});

export const printProducts = allProducts;

export const socialMediaPlans = [
  {
    name: "Plan Navegante",
    price: "3,500",
    description: "Ideal para iniciar tu aventura en el mundo digital y establecer tu presencia.",
    features: ["Gestión de 2 Redes Sociales", "8 publicaciones mensuales", "Diseño de plantillas de marca", "Reporte básico de rendimiento"],
    wantedImage: "/diseño-grafico/navegante.png"
  },
  {
    name: "Plan Capitán",
    price: "6,500",
    description: "El más popular. Perfecto para hacer crecer tu tripulación y conquistar nuevos horizontes.",
    features: ["Gestión de 3 Redes Sociales", "15 publicaciones mensuales", "Gestión de comunidad básica", "Campaña publicitaria mensual", "Reporte detallado y reunión mensual"],
    wantedImage: "/diseño-grafico/capitan.png"
  },
  {
    name: "Plan Rey de los Piratas",
    price: "12,000",
    description: "La estrategia definitiva para dominar los mares del marketing digital.",
    features: ["Gestión completa (hasta 4 redes)", "25+ publicaciones (incluye Reels)", "Estrategia de contenido y campañas", "Gestión de pauta avanzada", "Analítica y optimización continua"],
    wantedImage: "/diseño-grafico/reypirata.png"
  }
];

export const designPortfolio = [
    { id: 1, image: "/diseño-grafico/1.png", title: "Branding para Cafetería 'El Ancla Dorada'", category: "Identidad de Marca" },
    { id: 2, image: "/diseño-grafico/2.png", title: "Menú del Tesoro para 'La Taberna del Kraken'", category: "Diseño Editorial" },
    { id: 3, image: "/diseño-grafico/3.png", title: "Campaña 'Se Busca' para Redes Sociales", category: "Marketing Digital" },
    { id: 4, image: "/diseño-grafico/4.png", title: "Logotipo para 'Navegantes Tech'", category: "Identidad de Marca" },
];