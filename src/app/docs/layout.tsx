import type { Metadata } from "next";
import Script from "next/script";
export const metadata: Metadata = {
  alternates: { canonical: "/docs" },
};
import { SideBar } from "@/components/(home)/sideBar";
import { dm_sans } from "@/font/google";

const DocsLayout = ({ children }: { children: React.ReactNode }) => {
    return (

        <section className="sticky top-0  md:flex flex-row   md:mx-14 md:border-x border-dashed border-gray-50/15 ">
            <SideBar hidden={true} />
            <aside
                className="relative p-3 md:p-15 md:flex-2   md:border-l border-dashed border-gray-50/15  mdx"
            >
                {/* <span className="  absolute left-2 -z-20 top-2 rounded-full blur-3xl  size-16 bg-white/50  "></span> */}
                {/* <span className="  absolute -z-20  left-2 bottom-2 rounded-full blur-2xl  size-10 bg-gray-50 "></span> */}

                {/* <span className="  absolute -z-20  right-2 top-2 rounded-full blur-2xl  size-10 bg-[#A9F5FF] "></span> */}
                {/* <span className="  absolute -z-20  right-2 bottom-2 rounded-full blur-2xl  size-10 bg-yellow-100 "></span> */}

                {children}
                <Script
                  id="ld-json-breadcrumb"
                  type="application/ld+json"
                  strategy="afterInteractive"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "BreadcrumbList",
                      itemListElement: [
                        {
                          "@type": "ListItem",
                          position: 1,
                          name: "Home",
                          item: "/"
                        },
                        {
                          "@type": "ListItem",
                          position: 2,
                          name: "Docs",
                          item: "/docs"
                        }
                      ]
                    })
                  }}
                />
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
