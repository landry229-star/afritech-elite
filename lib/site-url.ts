export function getSiteUrl(): URL {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.RENDER_EXTERNAL_URL?.trim() ||
    `http://localhost:${process.env.PORT || "3000"}`;

  try {
    const url = new URL(configuredUrl);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      throw new Error("The site URL must use HTTP or HTTPS.");
    }
    return new URL("/", url);
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "NEXT_PUBLIC_SITE_URL or RENDER_EXTERNAL_URL must be a valid HTTP or HTTPS URL.",
        { cause: error },
      );
    }

    return new URL(`http://localhost:${process.env.PORT || "3000"}`);
  }
}
