"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBar = () => {
    return (
        <div className="sticky top-24 hidden md:flex flex-col gap-3.5 backdrop-blur-[4px] bg-[#F9FFFD]/6 border border-[#7E8382]/12 rounded-[25px] p-1.5 pb-4 min-w-[240px] min-h-[82dvh] max-h-fit">

            <SideBarItem />

        </div>
    );

};

export default SideBar;

const SideBarItem = () => {

    const data = [
        {
            label: "Introduction",
            href: "/"
        },
        {
            label: "Créer un projet",
            href: "/new_project"
        },
        {
            label: "Structure du projet",
            href: "/structures"
        },
        
        {
            label: "Controllers",
            href: "/controllers"
        },

        {
            label: "Reponses",
            href: "/reponses"
        },
        {
            label: "Views",
            href: "/views"
        },


        {
            label: "Composants",
            href: "/composants"
        },

        {
            label: "Serveur actions",
            href: "/serveur-actions"
        },
        {
            label: "Middlewares",
            href: "/middlewares"
        },


        {
            label: "Configuration",
            href: "/configuration"
        },

    ]

    const active = usePathname();


    return (

        <>
            <div className="flex flex-col w-full  bg-[#A9FFEA]/5 backdrop-blur-[4p] border border-[#A9FFEA]/10 rounded-[17px] p-1">
                <button className="px-3 py-2.5 text-sm font-normal bg-[#A9FFEA]/30 border border-[#A9FFEA]/35 text-[#A9FFEA] w-full text-left rounded-[14px]">Commencer</button>
                <button className="px-3 py-2.5 text-sm font-normal text-left rounded-[14px]">Réference</button>
                <button className="px-3 py-2.5 text-sm font-normal text-left rounded-[14px]">Intégration</button>
                <button className="px-3 py-2.5 text-sm font-normal text-left rounded-[14px]">CLI</button>
            </div>
            <menu className="flex flex-col w-full">
                {
                    data.map(( item ) => (
                        <Link href={item.href} className={`cursor-pointer px-3 py-1.5 text-sm text-left font-normal  rounded-[10px]  ${active === item.href ? "bg-[#A9FFEA]/2.5 border border-[#A9FFEA]/5 text-[#A9FFEA] " : "opacity-70 "}`} key={item.label}>
                            {item.label}
                        </Link>

                    ))

                }
            </menu>
        </>




    );
};




