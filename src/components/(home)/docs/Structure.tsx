import { Python } from "@/components/icons/python"
import { RightArrow } from "@/components/icons/right"

const Structure = ({ children }: { children?: React.ReactNode }) => (
    <div
        className="group overflow-hidden relative flex flex-col gap-1 p-4 reltive z-20 backdrop-blur-xs flex-1 bg-gray-50/3 border border-gray-50/8 rounded-2xl"
    >
        {children}
    </div>
)
const Folder = ({ folderName, children, isActive = false, showArrow = true }: { folderName: string, children?: React.ReactNode, isActive: boolean, showArrow?: boolean }) => (
    <menu>
        <ul className="folder flex gap-2 ">
            {
                showArrow &&
                <li className={`opacity-50 ${children && "rotate-90"}`}>
                    <RightArrow />
                </li>
            }
            <li className={`size-6 ${isActive && "bg-gray-50/3"} text-yellow-50  grid place-content-center rounded-md `}>
                {
                    children ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1} className="size-5 stroke-current/40 fill-current/8">
                            <path d="M19.906 9c.382 0 .749.057 1.094.162V9a3 3 0 0 0-3-3h-3.879a.75.75 0 0 1-.53-.22L11.47 3.66A2.25 2.25 0 0 0 9.879 3H6a3 3 0 0 0-3 3v3.162A3.756 3.756 0 0 1 4.094 9h15.812ZM4.094 10.5a2.25 2.25 0 0 0-2.227 2.568l.857 6A2.25 2.25 0 0 0 4.951 21H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-2.227-2.568H4.094Z" />
                        </svg>

                    ) : (

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} className="size-5 stroke-current/40 fill-current/8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44l-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6Z" />
                        </svg>

                    )
                }
            </li>
            <li>{folderName}</li>
        </ul>
        {
            children &&
            <ul
                className="folder space-y-2 pl-5 pt-2 ml-1.5 items-center border-l border-gray-50/10"
            >
                {children}
            </ul>
        }
    </menu>
)

const File = ({ icon = <Python />, fileName }: { icon?: React.ReactNode, fileName: string }) => (
    <li
        className="file flex gap-1.5 items-center ml-1"
    >
        <span className="opacity-30 text-xs">●</span>
        <span className="text-[#A9FFEA]/50">{icon}</span>
        <span className="text-sm font-light leading-0 tracking-wider text-gray-50/70">{fileName}</span>
    </li>
)
export { Structure, Folder, File }