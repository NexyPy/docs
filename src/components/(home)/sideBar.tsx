"use client"
import Link from "next/link"
import { Collapse } from "./collapse"
import { SIDE_BAR } from "@/data/docs/sidebar"
import { usePathname } from "next/navigation"
import useStore from "@/store"
import { useEffect } from "react"

const SideBar = ({ hidden }: { hidden?: boolean }) => {
    const pathname = usePathname()
    const { setMenuIsOpen } = useStore();
    useEffect(() => {
        
    }, [pathname])
    return (
        <aside

            className={`${hidden ? "hidden md:block" : ""}  overflow-y-auto sticky top-[4.5rem]  p-4  md:w-[19rem] md:max-h-[90dvh] space-y-3 transition-all duration-300`}
        >
            {
                SIDE_BAR.map((item, itemIndex) => (
                    <Collapse
                        key={itemIndex}
                        title={item.label}
                        defaultOpen={(pathname.startsWith(item.link) || (pathname === "/docs" && itemIndex === 0))}
                    >
                        <ul className="space-y-2">

                            {
                                item.children.map((child, childIndex) => (

                                    <li key={childIndex} className="flex "
                                        onClick={() => { setMenuIsOpen(false) }}
                                    >
                                        <Link
                                            href={(item.link === "/docs/started" && child.link === "/introduction") ? "/docs" : item.link + child.link}
                                            className={`${(pathname === item.link + child.link) || ((pathname === "/docs" && child.link === "/introduction")) ? "active-link" : " text-sm text-gray-50/70 hover:text-yellow-100"} w-full  transition-all duration-300`}
                                        >
                                            {child.title}
                                        </Link>
                                    </li>

                                ))
                            }
                        </ul>
                    </Collapse>
                ))
            }
        </aside>
    )
}

export { SideBar }