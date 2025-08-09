import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";
import { inter, jetbrainsMono } from "@/font/google";
import { Header } from "@/components/(home)/header";
import { Footer } from "@/components/(home)/footer";
import { LightDark } from "@/components/(home)/lightDark";
import { Language } from "@/components/(home)/language";
import { MenuModal } from "@/components/(home)/menu.modal";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const siteName = "Nexy";
const siteDescription =
  "Nexy is a modern, fast, and secure framework for building web applications with Python. Built on FastAPI for exceptional performance and developer experience.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: `${siteName} Documentation`,
  title: {
    default: siteName,
    template: `%s | ${siteName} Documentation`,
  },
  description: siteDescription,
  keywords: [
    "Nexy",
    "Nexy framework",
    "Python web framework",
    "FastAPI",
    "Python development",
    "Web development",
    "API development",
    "Python backend",
    "Modern web framework",
    "High performance Python",
    "Developer tools",
    "Documentation",
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: "technology",
  classification: "Web Development Framework",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: siteName,
    siteName,
    description: siteDescription,
    locale: "en_US",
    images: [
      {
        url: "/nexy.jpg",
        width: 1200,
        height: 630,
        alt: `${siteName} - Modern Python Web Framework`,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: ["/nexy.jpg"],
    creator: "@nexyframework",
    site: "@nexyframework",
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-US": siteUrl,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/nexy.svg", type: "image/svg+xml" },
    ],
    apple: "/nexy.svg",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0E201B" },
    { media: "(prefers-color-scheme: dark)", color: "#0E201B" },
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  other: {
    "msapplication-TileColor": "#0E201B",
    "msapplication-config": "/browserconfig.xml",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      </head>

      <body
        className={`${inter.variable} ${jetbrainsMono.variable} flex flex-col justify-between overflow-x-hidden min-h-dvh antialiased `}
      >
        {/* Structured Data - Organization */}
        <Script
          id="ld-json-organization"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: siteName,
              url: siteUrl,
              description: siteDescription,
              logo: `${siteUrl}/nexy.svg`,
              sameAs: [
                "https://github.com/nexyframework",
                "https://twitter.com/nexyframework",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                availableLanguage: "English",
              },
            }),
          }}
        />

        {/* Structured Data - WebSite */}
        <Script
          id="ld-json-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: siteName,
              url: siteUrl,
              description: siteDescription,
              inLanguage: "en",
              potentialAction: {
                "@type": "SearchAction",
                target: `${siteUrl}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* Structured Data - SoftwareApplication */}
        <Script
          id="ld-json-software"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: siteName,
              description: siteDescription,
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Any",
              programmingLanguage: "Python",
              softwareVersion: "1.0.0",
              downloadUrl: "https://github.com/nexyframework/nexy",
              url: siteUrl,
            }),
          }}
        />

        <Header />
        <div className="h-16 md:hidden"></div>
        <main className="flex-1 h-fit relative scroll-smooth">
          {children}
        </main>
        <MenuModal />
        <Footer />
        <Analytics />
        <div 
          hidden
          className=" fixed bottom-5  right-5 md:right-14 z-50 backdrop-blur-xl flex gap-1 p-1 items-center bg-[#A9FFEA]/2 -border border-dashed border-gray-50/15 rounded-[1.125rem] "

        >
          <Language/>
          <hr className="h-2 border border-dashed border-gray-50/15 " />
          <button
            className="cursor-pointer size-9 bg-[#A9FFEA]/6 hover:bg-[#A9FFEA]/10  border border-[#A9FFEA]/7 hover:borerd-[#A9FFEA]/12 rounded-[0.875rem] grid place-content-center hover:scale-110 transition-all duration-300 text-gray-50"

          >
            <LightDark />
          </button>
        </div>
      </body>

    </html>
  );
}
