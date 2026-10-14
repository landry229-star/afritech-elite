import type { MetadataRoute } from "next";
import { getSiteUrl } from "../lib/site-url";

export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  return [
    {
      url: baseUrl.toString(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: new URL("/contact", baseUrl).toString(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
