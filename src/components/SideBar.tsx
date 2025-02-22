"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SideBar = () => {
    return (
        <div className="sticky top-24 hidden md:flex flex-col gap-3.5 backdrop-blur-[4px] bg-[#F9FFFD]/6 border border-[#7E8382]/12 rounded-[25px] p-1.5 pb-4 min-w-[240px] min-h-[82dvh] max-h-fit">

            <SideBarItem />

        </div>
    );

};

const StartedData = [
    {
        label: "Introduction",
        href: ""
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
    }, {
        label: "Composants",
        href: "/composants"
    },
    {
        label: "Views",
        href: "/views"
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

const ReferenceData = [
    {
        label: "Reponse",
        href: ""
    },
    {
        label: "Composant",
        href: "/composant"
    },
    
]

const IntegrationData = [
    {
        label: "React",
        href: ""
    },
    {
        label: "Next.js",
        href: "/nextjs"
    },
    {
        label: "Vue.js",
        href: "/vue"
    }, 
]

const CLI = [
    {
        label: "Installation",
        href: ""
    },
    {
        label: "Créer un projet",
        href: "/create_projects"
    },{
        label:"Update",
        href: "/update"
    },{
        label:"Start",
        href: "/start"
    },{
        label:"Stop",
        href: "/stop"
    },{
        label:"Restart",
        href: "/restart"
    },{
        label:"Logs",
        href: "/logs"
    }
    
]

const API = [
    {
        label: "Introduction",
        href: ""
    },
    
]

// Define a type for the keys of the data object
type DataKeys = "/docs/started" | "/docs/reference" | "/docs/integration" | "/docs/cli" | "/docs/api";

const SideBarItem = () => {

    const activePath = usePathname()
    const [path, setPath] = useState<DataKeys>('/docs/started');
    const tabs = [
        { label: "Commencer", href: "/docs/started", active: true, data: StartedData },
        { label: "Réference", href: "/docs/reference", active: false, data: ReferenceData },
        { label: "Intégration", href: "/docs/integration", active: false, data: IntegrationData },
        { label: "CLI", href: "/docs/cli", active: false, data: CLI },
        { label: "API", href: "/docs/api", active: false, data: API }, // New tab added
    ];

    const data = {
        "/docs/started": StartedData,
        "/docs/reference": ReferenceData,
        "/docs/integration": IntegrationData,
        "/docs/cli": CLI,
        "/docs/api": API,
    }

    useEffect(() => {
        setPath(activePath as DataKeys);
    }, [activePath]);

    return (
        <>
            <div className="flex flex-col w-full bg-[#A9FFEA]/5 backdrop-blur-[4px] border border-[#A9FFEA]/10 rounded-[17px] p-1">
                {tabs.map((item) => (
                    <Link
                        href={item.href}
                        key={item.label}
                        className={`px-3 py-2.5 text-sm font-normal text-left rounded-[14px] ${
                            activePath.startsWith(item.href)
                                ? "bg-[#A9FFEA]/30 border border-[#A9FFEA]/35 text-[#A9FFEA]"
                                : "opacity-70"
                        }`}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
            <menu className="flex flex-col w-full">
                {data[path]?.map((item: { label: string; href: string }) => (
                    <Link
                        href={`${path}${item.href}`}
                        className={`cursor-pointer px-3 py-1.5 text-sm text-left font-normal rounded-[10px] ${
                            activePath === path + item.href
                                ? "bg-[#A9FFEA]/2.5 border border-[#A9FFEA]/5 text-[#A9FFEA]"
                                : "opacity-70"
                        }`}
                        key={item.label}
                    >
                        {item.label}
                    </Link>
                ))}
            </menu>
        </>
    );
};


export {SideBarItem, SideBar};