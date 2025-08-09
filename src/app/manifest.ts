import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nexy Documentation",
    short_name: "Nexy Docs",
    description: "Complete documentation for Nexy framework - Learn how to build modern web applications with Python and FastAPI.",
    start_url: "/",
    display: "standalone",
    background_color: "#0E201B",
    theme_color: "#0E201B",
    orientation: "portrait-primary",
    scope: "/",
    lang: "en",
    categories: ["developer", "education", "productivity"],
    icons: [
      {
        src: "/nexy.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/nexy.svg",
        sizes: "192x192",
        type: "image/svg+xml",
      
        purpose: "maskable",
      },
      {
        src: "/nexy.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        src: "/nexy.jpg",
        sizes: "1200x630",
        type: "image/jpeg",
        form_factor: "wide",
        label: "Nexy Framework Documentation",
      },
    ],
  };
}
