import { dm_sans_300 } from "@/font/google";
import { BundledLanguage, BundledTheme, codeToHtml } from "shiki";
import { CopyButton } from "./copyButton";



type CodeProps = {
    language: BundledLanguage;
    code: string
    theme?: BundledTheme;
    canCopy?: boolean;

}
const Code = async ({ code, language, canCopy = true, theme }: CodeProps) => {
    const child = await codeToHtml(code, {
        lang: language,
        theme: theme || "poimandres" || "ayu-dark",
    });
    const lignes = code.split("\n").map((items, index) => index!=0 && index )
    return (

        <div
            className="group overflow-hidden relative max-w-full flex-1 flex justify-center items-center reltive z-20 backdrop-blur-xs  bg-gray-50/3 border border-gray-50/8 rounded-2xl"
        >
            <ul className={` ${lignes.length == 0 && "hidden" } flex flex-col items-center !gap-1 text-gray-50/70 text-sm  !p-0 -mt-0.5 !pl-4 opacity-50  `}>
                {
                    lignes.map((ligne) => <li key={String(ligne)} className="0 ">{ligne}</li>)
                }
            </ul>
            <div
                className="[&>pre]:focus:border-0 w-[calc(100dvw_-_60px)] md:w-full [&>pre]:overflow-x-auto [&>pre]:!w-full  p-4  [&>pre]:!bg-transparent [&>pre]:!m-0 [&_.line]:!px-0"
                dangerouslySetInnerHTML={{ __html: child }}

            >

            </div>
            <CopyButton code = {code} className={`${!canCopy && "hidden"}`}/>
            
        </div>

    );
}



const CodeCard = ({ children, fileName }: { children: React.ReactNode, fileName: string }) => {
    return (
        <div className="w-full  flex flex-col gap-1.5  relative size-fit  bg-[#24262B]/20 border border-gray-50/8 border-dashed rounded-3xl p-1.5">
            <span className="  absolute -z-10 -left-2 -top-2 rounded-full blur-2xl  size-6 bg-[#A9FFEA]  "></span>
            <span className="  absolute -z-10 -left-2 -bottom-2 rounded-full blur-2xl  size-6 bg-gray-50 "></span>

            <span className="  absolute -z-10 -right-2 -top-2 rounded-full blur-2xl  size-6 bg-[#A9F5FF] "></span>
            <span className="  absolute -z-10 -right-2 -bottom-2 rounded-full blur-2xl  size-6 bg-yellow-100 "></span>

            <span className={`text-xs px-3 py-1 opacity-70 tracking-wide font-light ${dm_sans_300.className}`}>{fileName}</span>
            {children}
        </div>
    )
}

export { Code, CodeCard }