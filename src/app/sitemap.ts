import fs from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // Discover static routes: read app dir and include directories with page files
  const appDir = path.join(process.cwd(), "src", "app");
  const staticPaths: string[] = [];

  const walk = (dir: string, baseUrl = "") => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name.startsWith("(") || entry.name.startsWith("_")) continue; // skip group/privates
      const full = path.join(dir, entry.name);
      const currentUrl = path.posix.join(baseUrl, entry.name);
      if (entry.isDirectory()) {
        // if directory contains page.tsx/mdx, add it
        const hasPage = [
          path.join(full, "page.tsx"),
          path.join(full, "page.mdx"),
          path.join(full, "page.jsx"),
          path.join(full, "page.ts"),
        ].some(fs.existsSync);

        if (hasPage) {
          staticPaths.push("/" + currentUrl.replace(/\\\\/g, "/"));
        }
        walk(full, currentUrl);
      } else if (/^page\.(tsx|jsx|mdx|ts)$/.test(entry.name) && baseUrl) {
        staticPaths.push("/" + baseUrl.replace(/\\\\/g, "/"));
      }
    }
  };

  walk(appDir);

  // Add root explicitly if exists
  const rootPageCandidates = [
    path.join(appDir, "page.tsx"),
    path.join(appDir, "page.ts"),
    path.join(appDir, "page.jsx"),
    path.join(appDir, "page.mdx"),
  ];
  if (rootPageCandidates.some(fs.existsSync)) staticPaths.push("/");

  // Remove dynamic and API routes
  const filtered = Array.from(new Set(staticPaths))
    .filter((p) => !p.includes("["))
    .filter((p) => !p.startsWith("/api"));

  return filtered.map((p) => ({
    url: `${siteUrl}${p}`,
    lastModified: new Date(),
    changeFrequency: p === "/" ? "weekly" : "monthly",
    priority: p === "/" ? 1 : p.split("/").length <= 2 ? 0.8 : 0.6,
  }));
}


