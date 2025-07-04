"use client"
import {  dm_sans_400 } from "@/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
    {id:1, href: "/docs", label: "Docs", active:true },
    // {id:2, href: "#", label: "Showcase" ,active:false},
    {id:3, href: "/blog", label: "Blog" ,active:false},
]

/**
 * Navigation component for the header.
 * Renders a list of navigation links defined in navLinks array.
 * @returns {React.ReactElement} Navigation component with links
 */

const NavLink = (): React.ReactElement => {
    const pathname = usePathname();
    
    return (
        <nav className="flex">
            <ul className="flex gap-6 transition-all duration-300 w-fit">
                
                {navLinks.map((link,lindexIndex) => (
                    <li key={link.id} className={`flex gap-6 items-center justify-center hover:scale-110 ${pathname.startsWith(link.href) && "scale-110"} transition-all duration-300 `}>
                        <Link
                            href={link.href}
                            className={` text-sm ${dm_sans_400.className} tracking-widest  hover:text-[#A9FFEA]/80  transition-all duration-300 ${pathname.startsWith(link.href)? "text-yellow-300":"text-gray-50/80" }`}
                        >{link.label}</Link>
                        <hr  hidden={navLinks.length-1 == lindexIndex} className="hidden md:block h-2 border border-dashed border-gray-50/15" />

                    </li>
                ))}
            </ul>
        </nav>
    );
}

export {NavLink}