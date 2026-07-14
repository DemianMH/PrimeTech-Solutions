import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://www.primetechsolutions.com.mx/sitemap.xml",
    host: "https://www.primetechsolutions.com.mx",
  };
}
