import Link from "next/link";
import { Nexy } from "../icons/nexy";
import { Search } from "../icons/search";
import { Github } from "../icons/github";
import { NavLink } from "./navLink";
import { MenuButton } from "./menu.button";


const Header = () => {
    return (
        <header className="flex justify-between items-center px-4 md:px-14  md:py-5 py-3 fixed md:sticky w-full top-0 z-30 bg-background/50  border-b border-gray-50/15 border-dashed backdrop-blur-md">
            <div className="flex gap-6 items-center hover:scale-104 transition-all duration-300">
                <Link
                    href="/"
                    className=""
                >
                    <Nexy />
                </Link>


            </div>
            <menu className=" hidden md:flex gap-6 items-center ">
                <button
                    className="hover:scale-104 transition-all duration-300 flex gap-2 justify-center items-center  pl-2 pr-4 py-1 rounded-xl text-sm text-gray-50/70 border border-[#A9FFEA]/6 bg-[#A9FFEA]/5 hover:bg-[#A9FFEA]/10 cursor-pointer "
                >
                    <Search />
                    <code>ctr k</code>
                </button>
                <hr className="hidden md:block h-2 border border-dashed border-gray-50/15" />
                <NavLink />
                <hr className="hidden md:block h-2 border border-dashed border-gray-50/15 " />
                <Link
                    href="https://github.com/NexyPy/Nexy"
                    target="_blank"
                    className="hover:scale-110 transition-all duration-300 hover:text-[#A9FFEA]"
                >
                    <Github />
                </Link>
                <hr className="hidden md:block h-2 border border-dashed border-gray-50/15" />
                <Link
                    href="https://pepy.tech/projects/nexy"
                    target="_blank"
                    className="hover:scale-104 transition-all duration-300"
                >
                    <img src="https://static.pepy.tech/badge/nexy" alt="PyPI Downloads" />
                </Link>
            </menu>

            <MenuButton/>

        </header>
    );

}

export { Header };