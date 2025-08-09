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
  "Nexy is a modern, fast, and secure framework for building web applications with Python.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: `${siteName} Docs`,
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "Nexy",
    "Nexy framework",
    "Python web framework",
    "fast python",
    "secure python",
    "docs",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  category: "technology",
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
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: ["/nexy.jpg"],
  },
  // Canonicals will be set per page where needed to avoid a site-wide root canonical
  icons: {
    icon: [{ url: "/favicon.ico" }],
  },
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#0E201B" }],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth light">

      <body
        className={`${inter.variable} ${jetbrainsMono.variable} flex flex-col justify-between overflow-x-hidden min-h-dvh antialiased `}
      >
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
