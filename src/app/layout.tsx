import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";
import { inter, jetbrainsMono } from "@/font/google";
import { Header } from "@/components/(home)/header";
import { Footer } from "@/components/(home)/footer";
import { LightDark } from "@/components/(home)/lightDark";
import { Language } from "@/components/(home)/language";
import { MenuModal } from "@/components/(home)/menu.modal";

export const metadata: Metadata = {
  title: "Nexy",
  description: "Nexy is a modern, fast, and secure framework for building web applications with Python.",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth light">
      <meta name="theme-color" content="#0E201B" />

      <body
        className={`${inter.variable} ${jetbrainsMono.variable} flex flex-col justify-between overflow-x-hidden min-h-dvh antialiased `}
      >

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
