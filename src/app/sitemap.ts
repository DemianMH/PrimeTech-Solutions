import type { MetadataRoute } from "next";

const baseUrl = "https://www.primetechsolutions.com.mx";

const routes: Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
  {
    path: "",
    priority: 1,
    changeFrequency: "weekly",
  },
  {
    path: "/servicios",
    priority: 0.95,
    changeFrequency: "weekly",
  },
  {
    path: "/diseno-grafico",
    priority: 0.88,
    changeFrequency: "monthly",
  },
  {
    path: "/portafolio",
    priority: 0.86,
    changeFrequency: "weekly",
  },
  {
    path: "/contacto",
    priority: 0.8,
    changeFrequency: "monthly",
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
