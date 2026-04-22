import { dm_sans, dm_sans_300 } from "@/font/google";
import Link from "next/link";
import { Code } from "./docs/codeCard";



const codes = [
`def GET():
    data = {"Get": "Hello World"}
    return data
`,

`async def POST():
    data = {"Post": "Hello New Post"}
    return data
`,

`async def SOCKET(
    ws: WebSocket, 
    service: Depends(AppService)
):
    await service.handle_websocket(ws)
`
]
const RightSide = async () => {
    

    
    return (
        <aside className="flex-1 hidden md:flex items-center justify-end">
            <div className="flex flex-col gap-2  relative size-fit bg-[#24262B]/20 border border-[#24262B] border-dashed rounded-3xl p-2">
                <span className="  absolute -left-2 -top-2 rounded-full blur-2xl  size-10 bg-[#A9FFEA]  "></span>
                <span className="  absolute -left-2 -bottom-2 rounded-full blur-2xl  size-10 bg-gray-50 "></span>

                <span className="  absolute -right-2 -top-2 rounded-full blur-2xl  size-10 bg-[#A9F5FF] "></span>
                <span className="  absolute -right-2 -bottom-2 rounded-full blur-2xl  size-10 bg-yellow-100 "></span>

                <span className={`text-xs px-3 py-1 opacity-50 tracking-wide ${dm_sans_300.className}`}>app/**/controller.py</span>

                {
                    codes.map((code, codeIndex) => (

                        <Code key={codeIndex} code={code} theme="catppuccin-mocha" language="python" />

                    ))
                }

            </div>

        </aside>
    )
}


const LeftSide = () => {
    return (
        <aside className="hit-full flex-1 flex flex-col justify-center gap-4 ">
            <span
                className="bg-yellow-200/5 border border-yellow-200/10 rounded-full py-1 px-2  size-fit text-xs text-yellow-200 tracking-wider"
            >Nexy v1-bêta</span>
            <h5
                className="text-lg font-light opacity-80 tracking-wider"
            >
                Et si tu changeais un peu ta façon de coder ? <br />
                Savais-tu que tu peux faire plus simple et plus performant ?
            </h5>
            <h1 className={`${dm_sans.className} uppercase text-3xl font-medium tracking-wide md:tracking-widest leading-12`}>
                Simplifiez vos projets backend avec des performances optimisées.
            </h1>
            <p className="text-lg font-light opacity-80 tracking-wider">
                Nexy est un framework Python web qui simplifie la création de backend robustes et performants.
            </p>

            <div className="mt-7 w-fit hover:scale-110 transition-all duration-300 ease-in-out  ">

                <Link
                    href="/docs"
                    className=" flex gap-2.5 items-center relative bg-[#A9FFEA]/30  text-[#A9FFEA] border border-[#A9FFEA]/30 size-fit py-2.5 px-5 rounded-2xl  "

                >
                    <span className="  absolute left-1 rounded-full blur-sm  size-4 bg-[#A9FFEA]  "></span>
                    <span className="  absolute right-2 rounded-full blur-sm  size-4 bg-[#A9F5FF] "></span>

                    <span>Commencer</span>
                    <span>→</span>
                </Link>


            </div>
        </aside>
    )
}



const HeroSection = () => {
    return (
        <section className="flex   mx-5 md:mx-14 md:px-15 py-10 md:py-5   md:h-[39rem] md:border-x border-gray-50/15 border-dashed   ">
            <LeftSide />
            <RightSide />
        </section>
    );
}

export { HeroSection };