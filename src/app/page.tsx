import { HeroSection } from "@/components/(home)/heroSection";
import type { Metadata } from "next";
import Script from "next/script";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Nexy - Modern Python Web Framework",
  description: "Build fast, secure, and scalable web applications with Nexy. A modern Python framework built on FastAPI for exceptional performance and developer experience.",
  keywords: [
    "Nexy framework",
    "Python web development",
    "FastAPI framework",
    "Modern web applications",
    "High performance Python",
    "Web framework",
    "API development",
  ],
  openGraph: {
    title: "Nexy - Modern Python Web Framework",
    description: "Build fast, secure, and scalable web applications with Nexy. A modern Python framework built on FastAPI for exceptional performance and developer experience.",
    type: "website",
    url: siteUrl,
  },
  twitter: {
    title: "Nexy - Modern Python Web Framework",
    description: "Build fast, secure, and scalable web applications with Nexy. A modern Python framework built on FastAPI for exceptional performance and developer experience.",
  },
  alternates: {
    canonical: siteUrl,
  },
};

const HomePage = () => {
     return (
        <>
          {/* Structured Data - Homepage */}
          <Script
            id="ld-json-homepage"
            type="application/ld+json"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebPage",
                name: "Nexy - Modern Python Web Framework",
                description: "Build fast, secure, and scalable web applications with Nexy. A modern Python framework built on FastAPI for exceptional performance and developer experience.",
                url: siteUrl,
                mainEntity: {
                  "@type": "SoftwareApplication",
                  name: "Nexy",
                  description: "A modern Python web framework built on FastAPI",
                  applicationCategory: "DeveloperApplication",
                  operatingSystem: "Any",
                  programmingLanguage: "Python",
                  downloadUrl: "https://github.com/nexyframework/nexy",
                },
                breadcrumb: {
                  "@type": "BreadcrumbList",
                  itemListElement: [
                    {
                      "@type": "ListItem",
                      position: 1,
                      name: "Home",
                      item: siteUrl,
                    },
                  ],
                },
              }),
            }}
          />
          <HeroSection/>
        </>
          
     );
    
};

export default HomePage;
