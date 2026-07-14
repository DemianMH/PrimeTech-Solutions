import type { MetadataRoute } from "next";

const baseUrl = "https://www.primetechsolutions.com.mx";

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date();

  const routes = [
    "",
    "/servicios",
    "/portafolio",
    "/contacto",
    "/diseno-grafico",
    "/tienda",
    "/servicios/chatbots",
    "/servicios/desarrollo",
    "/servicios/soporte-it",
    "/servicios/ciberseguridad",
    "/servicios/redes",
    "/servicios/hardware",
  ];

  return routes.map((route) => {
    const changeFrequency = route === "" ? "weekly" : "monthly";
    const priority = route === "" ? 1 : route === "/servicios" ? 0.9 : 0.75;

    return {
      url: `${baseUrl}${route}`,
      lastModified: today,
      changeFrequency,
      priority,
    };
  });
}
