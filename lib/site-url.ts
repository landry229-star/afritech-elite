export function getSiteUrl(): URL {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.RENDER_EXTERNAL_URL?.trim();

  if (!configuredUrl) {
    if (process.env.NODE_ENV !== "production") {
      return new URL(`http://localhost:${process.env.PORT || "3000"}`);
    }

    throw new Error(
      "Configure NEXT_PUBLIC_SITE_URL or deploy to Render before requesting sitemap.xml or robots.txt.",
    );
  }

  try {
    const url = new URL(configuredUrl);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      throw new Error("The site URL must use HTTP or HTTPS.");
    }
    return new URL("/", url);
  } catch (error) {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL or RENDER_EXTERNAL_URL must be a valid HTTP or HTTPS URL.",
      { cause: error },
    );
  }
}
