import Link from "next/link";

type SwitchPageProps = {
    next: {
        label :string
        href: string
    },
    prev: {
        label: string
        href: string
    }

}
const SwitchPage = ({next, prev}:SwitchPageProps) => (
    <div className="flex  gap-5 justify-between mt-5 py-10 md:pb-0 border-t border-gray-50/15 border-dotted ">
        {prev &&
            <Link href={`/docs${prev.href}`}
            className={`flex gap-2.5 items-center  cursor-pointer py-2.5 px-5 rounded-2xl text-xs md:text-sm text-left font-normal   bg-[#A9FFEA]/2.5 border border-[#A9FFEA]/5 text-gray-50/80 `}>
            <span>←</span>
            <span>{prev.label}</span>
        </Link>
        }

        {next &&

        <Link
            href={`/docs${next.href}`}  
            className=" flex gap-2.5 items-center relative bg-[#A9FFEA]/30  text-[#A9FFEA] text-xs md:text-sm border border-[#A9FFEA]/30 size-fit py-2.5 px-5 rounded-2xl  "

        >
            <span className="  absolute left-1 rounded-full blur-sm  size-4 bg-[#A9FFEA]  "></span>
            <span className="  absolute right-2 rounded-full blur-sm  size-4 bg-[#A9F5FF] "></span>

            <span>{next.label}</span>
            <span>→</span>
        </Link>
        }


    </div>
)

export { SwitchPage }