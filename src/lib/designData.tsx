

const WHATSAPP_NUMBER = "523334862414";

const generateWhatsAppLink = (productName: string, designOption: boolean = false) => {
  let message = `¡Ahoy! Estoy interesado en el tesoro: *${productName}*. ¿Podrían darme más información?`;
  if (designOption) {
    message = `¡Ahoy! Quisiera una cotización para el tesoro *${productName}* incluyendo un diseño personalizado.`;
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

// --- ESTRATEGIA DE PRECIOS AUTOMATIZADA ---
// Esta función calcula el precio final para el cliente.
// El margen de ganancia es más alto para productos baratos y se ajusta para ser competitivo en productos caros.
// ¡Siempre es mayor al 30%!
const calculatePrice = (basePrice: number) => {
  let markup = 0.40; // Margen para productos de más de $1000 (40%)
  if (basePrice <= 50) markup = 1.5; // Margen para productos muy baratos (150%)
  else if (basePrice <= 100) markup = 1.0; // (100%)
  else if (basePrice <= 400) markup = 0.8; // (80%)
  else if (basePrice <= 1000) markup = 0.5; // (50%)
  
  const finalPrice = basePrice * (1 + markup);
  return Math.ceil(finalPrice / 10) * 10; // Redondea el precio final para que sea un número limpio
};

const calculateDesignPrice = (basePrice: number) => {
    if (basePrice < 500) return 250;
    if (basePrice < 1500) return 450;
    return 700;
};

// --- LISTA DE PRECIOS BASE ---
// ¡ESTA ES LA ÚNICA LISTA QUE NECESITAS EDITAR EN EL FUTURO!
// Aquí pones tus precios de revendedor.
const baseProducts = [
    { name: "Lona front", unit: "m²", price: 85, imageName: "lona-front.png" },
    { name: "Lona mesh", unit: "m²", price: 226, imageName: "lona-mesh.png" },
    { name: "Vinil blanco brillante", unit: "m²", price: 165, imageName: "vinil-brillante.png" },
    { name: "Vinil microperforado", unit: "m²", price: 240, imageName: "vinil-microperforado.png" },
    { name: "Vinil transparente", unit: "m²", price: 195, imageName: "vinil-transparente.png" },
    { name: "Iman automotriz", unit: "ml", price: 550, imageName: "iman-automotriz.png" },
    { name: "Corte de vinil (colores basicos)", unit: "ml", price: 210, imageName: "corte-vinil.png" },
    { name: "Tarjetas de Presentación (Laminado Mate)", unit: "Millar", price: 250, imageName: "tarjetas-laminado-mate.png" },
    { name: "Volantes a Color 1/4 Carta", unit: "Millar", price: 390, imageName: "volantes-cuarto-carta.png" },
    { name: "Volantes a Color 1/2 Carta", unit: "Millar", price: 600, imageName: "volantes-media-carta.png" },
    { name: "Hojas membretadas a color", unit: "Millar", price: 1200, imageName: "hojas-membretadas.png" },
    { name: "Notas de Remisión c/copia y folio", unit: "Millar", price: 1200, imageName: "notas-remision.png" },
    { name: "Folders", unit: "Ciento", price: 1650, imageName: "folders.png" },
    { name: "Gafete PVC", unit: "Pieza", price: 55, imageName: "gafete-pvc.png" },
    { name: "Rollup Publicitario", unit: "Pieza", price: 945, imageName: "rollup.png" },
    { name: "Display Araña 80x180", unit: "Pieza", price: 265, imageName: "display-arana.png" },
    { name: "Taza blanca 11 oz", unit: "Pieza", price: 39, imageName: "taza-blanca.png" },
    { name: "Taza Mágica 11oz", unit: "Pieza", price: 63, imageName: "taza-magica.png" },
    { name: "Playera sublimada (frente)", unit: "Pieza", price: 158, imageName: "playera-sublimada.png" },
    { name: "Mousepad", unit: "Pieza", price: 45, imageName: "mousepad.png" },
];

// --- CÓDIGO AUTOMÁTICO (NO TOCAR) ---
// Este código toma la lista de arriba y genera los productos finales con precios calculados y categorías.
const allProducts = baseProducts.map(p => {
    const finalPrice = calculatePrice(p.price);
    const designPrice = calculateDesignPrice(p.price);
    const categoryMap: { [key: string]: string } = {
        lona: "Lonas y Viniles", vinil: "Lonas y Viniles",
        tarjetas: "Papelería", volantes: "Papelería", hojas: "Papelería", notas: "Papelería", recetarios: "Papelería", folders: "Papelería",
        rollup: "Displays", display: "Displays",
        taza: "Promocionales", playera: "Promocionales", mousepad: "Promocionales", gafete: "Promocionales",
        iman: "Materiales Especiales",
    };
    const assignedCategory = Object.keys(categoryMap).find(key => p.name.toLowerCase().includes(key)) || "Otros";
    
    return {
        name: p.name,
        unit: p.unit,
        price: finalPrice,
        designPrice: designPrice,
        category: categoryMap[assignedCategory] || "Otros",
        image: `/diseño-grafico/${p.imageName}`,
        whatsappUrl: generateWhatsAppLink(p.name),
        whatsappDesignUrl: generateWhatsAppLink(p.name, true),
    }
});

export const printProducts = allProducts;

// --- DATOS ADICIONALES (Redes Sociales y Portafolio) ---
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