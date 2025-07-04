"use client"
import useStore from "@/store";
import { SideBar } from "./sideBar";
import { usePathname } from "next/navigation";
import { dm_sans_400 } from "@/font/google";
import Link from "next/link";
import { motion } from "framer-motion";
import { Close } from "../icons/close";

const CloseModale = () => {
    const {menuIsOpen, setMenuIsOpen } = useStore();


    if(menuIsOpen) return (
        <button
            className="fixed top-3 right-3 z-[51] bg-[#A9FFEA]/6 hover:bg-[#A9FFEA]/5 border border-gray-100/10 backdrop-blur-md rounded-full p-1.5"
            onClick={() => {
                setMenuIsOpen(false)
            }}
        >
            <Close/>

        </button>
    )
}

const MenuModal = () => {
    const { menuIsOpen, setMenuIsOpen } = useStore();
    const pathname = usePathname();
    const navLinks = [
        { id: 1, href: "/docs", label: "Docs", active: true },
        // {id:2, href: "#", label: "Showcase" ,active:false},
        { id: 3, href: "/blog", label: "Blog", active: false },
    ]

    return (
        <>
        <CloseModale />
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: menuIsOpen ? "0%" : "100%" }}
            exit={{x:"-100%"}}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="overflow-y-auto max-h-dvh fixed min-h-dvh pb-10 w-full z-50 bg-background/80 backdrop-blur-xl"
        >
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.5, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-5 pb-5 flex items-center text-sm gap-3 w-[90%]"
            >
                <span>Menu</span>
                <span className="mt-1 border-t-[0.5px] w-full border-gray-50/15"></span>
            </motion.p>

            <motion.ul 
                className="px-5 pb-5 flex flex-col gap-3 w-fit"
            >
                {navLinks.map((link, index) => (
                    <motion.li
                        key={link.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        onClick={() => {
                            setMenuIsOpen(false)
                        }}
                        className="flex gap-6 items-center"
                    >
                        <Link
                            href={link.href}
                            className={`${dm_sans_400.className} tracking-widest transition-all duration-300 ${pathname.startsWith(link.href) ? "text-yellow-300" : "text-gray-50/80"}`}
                        >
                            {link.label}
                        </Link>
                    </motion.li>
                ))}
            </motion.ul>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.5, y: 0 }}
                transition={{ delay: 0.4 }}
                className="px-5 flex items-center text-sm gap-3"
            >
                <span>Docs</span>
                <span className="mt-1 border-t-[0.5px] w-full border-gray-50/15"></span>
            </motion.p>
            <SideBar />
        </motion.div>
        </>
    );
};
export { MenuModal }