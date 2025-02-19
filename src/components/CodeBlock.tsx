
// import type { BundledLanguage } from 'shiki'
import { codeToHtml,BundledLanguage } from 'shiki'
import CopyButton from "./btnCopier";





interface CodeBlockProps {
    code: string;
    language: BundledLanguage;
    fileName?: string;
    // Si vous souhaitez ajouter d'autres options, comme showLineNumbers, vous pouvez les inclure ici
  }

export async function CodeBlock({
  code,
  language,
  fileName = "",
}: CodeBlockProps) {
    const out = await codeToHtml(code, {
        lang: language,
        theme: 'one-dark-pro'
      })
      

  return (
    <article className="group flex flex-col gap-1 bg-[#A9FFEA]/6 border border-[#A9FFEA]/7 rounded-[20px] p-1 h-fit w-full">
      <div className="flex gap-1 justify-between p-1">
        <p className="p-0.5 flex gap-2 items-center">
          <svg

            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 bg-[#A9FFEA]/10 border border-[#F9FFFD]/10 rounded-[7.5px] p-0.5 text-green-200"
          >
            <path
              fillRule="evenodd"
              d="M2.25 6a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V6Zm3.97.97a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06l-2.25 2.25a.75.75 0 0 1-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 0 1 0-1.06Zm4.28 4.28a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
              clipRule="evenodd"
            />
          </svg>
          {fileName}
          <span className="text-base font-normal mb-0.5 text-[#7E8382]">
            {language}
          </span>
        </p>
        <CopyButton code={code} />
      </div>
      <div className="bg-[#F9FFFD]/5 px-1.5 py-0.5 rounded-[14px] border border-[#7E8382]/20 backdrop-blur-md">
        <div
          className="overflow-x-auto p-4 [&>pre]:!bg-transparent [&>pre]:!m-0 [&_.line]:!px-0"
          dangerouslySetInnerHTML={{ __html: out }}
        />
      </div>
    </article>
  );
}
