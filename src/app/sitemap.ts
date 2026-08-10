import type { MetadataRoute } from "next";
import { services, siteConfig } from "@/lib/site";
import { designProducts } from "@/lib/prime-design";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/servicios",
    "/portafolio",
    "/nosotros",
    "/contacto",
    "/prime-design",
    "/prime-design/catalogo",
    "/prime-design/branding",
    "/prime-design/marketing",
    "/prime-design/portafolio",
  ];
  const serviceRoutes = services.map((service) => `/servicios/${service.slug}`);
  const designRoutes = designProducts.map((product) => `/prime-design/catalogo/${product.slug}`);

  const now = new Date();

  return [...routes, ...serviceRoutes, ...designRoutes].map((route) => {
    const isHome = route === "";
    const isServiceDetail = route.startsWith("/servicios/");
    const isDesignProduct = route.startsWith("/prime-design/catalogo/");
    const isMainWorld = route === "/prime-design" || route === "/servicios" || route === "/portafolio";

    return {
      url: `${siteConfig.domain}${route}`,
      lastModified: now,
      changeFrequency: isHome || isMainWorld ? "weekly" : isDesignProduct ? "monthly" : "monthly",
      priority: isHome ? 1 : isMainWorld ? 0.92 : isServiceDetail ? 0.88 : isDesignProduct ? 0.74 : 0.7,
    };
  });
}
