import Link from "next/link";
import { Github } from "../icons/github";
import { majorMonoDisplay } from "@/font/google";
import { LinkedIn } from "../icons/linkedin";

const Footer = () => {
    return (
        <footer className="px-5 py-10 md:p-14  space-y-15 border-t border-dashed border-gray-50/15 ">
            <aside className="hidden">ghdghd</aside>
            <hr className=" border-gray-50/15 border-dotted hidden" />
            <aside>
                <div className=" space-y-5">
                    <div
                        className="flex  items-center gap-5"
                    >
                        <Link href="/#" className={`size-fit text-3xl text-gray-50/90  ${majorMonoDisplay.className}`}>
                            <span className="py-1.5 ">NEXY</span>
                        </Link>
                        <hr className="h-2 border border-dashed border-gray-50/15 " />

                        <ul
                            className="flex gap-1 p-1 items-center bg-[#A9FFEA]/2 -border border-dotted border-[#A9FFEA]/20 rounded-[1.125rem] "
                        >
                            <li
                                className="cursor-pointer size-9 bg-[#A9FFEA]/6 hover:bg-[#A9FFEA]/10  border border-[#A9FFEA]/7 hover:borerd-[#A9FFEA]/12 rounded-[0.875rem] grid place-content-center hover:scale-110 transition-all duration-300 text-gray-50"
                            >
                                <Link
                                    href="https://github.com/NexyPy/Nexy" className="text-[#A9FFEA]"
                                    target="_blank"

                                >
                                    <Github />
                                </Link>
                            </li>
                            <hr className="h-2 border border-dashed border-gray-50/15 " />

                            <li
                                className="cursor-pointer size-9 bg-[#A9FFEA]/6 hover:bg-[#A9FFEA]/10  border border-[#A9FFEA]/7 hover:borerd-[#A9FFEA]/12 rounded-[0.875rem] grid place-content-center hover:scale-110 transition-all duration-300 text-gray-50"
                            >
                                <Link
                                    href="https://www.linkedin.com/company/nexy-python/"
                                    target="_blank"

                                >
                                    <LinkedIn />
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <p className="text-sm opacity-90">
                        Copyright © 2025 Espoir Loémba. Tous droits réservés.
                    </p>
                </div>
            </aside>
        </footer>
    );
}

export { Footer };