import { SideBar } from "@/components/(home)/sideBar";
import { dm_sans } from "@/font/google";
import type { Metadata } from "next";
import Script from "next/script";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Complete documentation for Nexy framework - Learn how to build modern web applications with Python and FastAPI.",
  keywords: [
    "Nexy documentation",
    "Python framework docs",
    "FastAPI documentation",
    "Web development guide",
    "API development tutorial",
  ],
  openGraph: {
    title: "Nexy Documentation",
    description: "Complete documentation for Nexy framework - Learn how to build modern web applications with Python and FastAPI.",
    type: "website",
    url: `${siteUrl}/docs`,
  },
  twitter: {
    title: "Nexy Documentation",
    description: "Complete documentation for Nexy framework - Learn how to build modern web applications with Python and FastAPI.",
  },
  alternates: {
    canonical: `${siteUrl}/docs`,
  },
};

const DocsLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <section className="sticky top-0  md:flex flex-row   md:mx-14 md:border-x border-dashed border-gray-50/15 ">
            <SideBar hidden={true} />
            <aside
                className="relative p-3 md:p-15 md:flex-2   md:border-l border-dashed border-gray-50/15  mdx"
            >
                {/* Structured Data - Documentation */}
                <Script
                  id="ld-json-documentation"
                  type="application/ld+json"
                  strategy="beforeInteractive"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "TechArticle",
                      headline: "Nexy Framework Documentation",
                      description: "Complete documentation for Nexy framework - Learn how to build modern web applications with Python and FastAPI.",
                      author: {
                        "@type": "Organization",
                        name: "Nexy",
                        url: siteUrl,
                      },
                      publisher: {
                        "@type": "Organization",
                        name: "Nexy",
                        logo: {
                          "@type": "ImageObject",
                          url: `${siteUrl}/nexy.svg`,
                        },
                      },
                      datePublished: "2024-01-01",
                      dateModified: new Date().toISOString().split("T")[0],
                      mainEntityOfPage: {
                        "@type": "WebPage",
                        "@id": `${siteUrl}/docs`,
                      },
                      about: [
                        {
                          "@type": "Thing",
                          name: "Python Web Framework",
                        },
                        {
                          "@type": "Thing",
                          name: "FastAPI",
                        },
                        {
                          "@type": "Thing",
                          name: "Web Development",
                        },
                      ],
                      audience: {
                        "@type": "Audience",
                        audienceType: "Developers",
                      },
                    }),
                  }}
                />

                {/* <span className="  absolute left-2 -z-20 top-2 rounded-full blur-3xl  size-16 bg-white/50  "></span> */}
                {/* <span className="  absolute -z-20  left-2 bottom-2 rounded-full blur-2xl  size-10 bg-gray-50 "></span> */}

                {/* <span className="  absolute -z-20  right-2 top-2 rounded-full blur-2xl  size-10 bg-[#A9F5FF] "></span> */}
                {/* <span className="  absolute -z-20  right-2 bottom-2 rounded-full blur-2xl  size-10 bg-yellow-100 "></span> */}

                {children}
            </aside>

            <style>
                {
                    `
                    h1,h2{
                      font-family: ${dm_sans.style.fontFamily};
                    }
                    `
                }
            </style>
        </section>
    )
}

export default DocsLayout;
