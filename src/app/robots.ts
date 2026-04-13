import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/vendor/", "/api/"],
      },
    ],
    sitemap: "https://peply.bio/sitemap.xml",
  };
}
