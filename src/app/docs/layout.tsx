import { HeaderDocs } from "@/components/Header";
import { SideBar } from "@/components/SideBar";
import { MenuBottomSheet } from "@/components/Modal";
const DocsLayout = ({ children }: { children: React.ReactNode }) => {
 
  return (
    <>
      <HeaderDocs />
      <section className="md:flex gap-15 md:px-10 px-5 mt-8 w-full ">
        <SideBar />
        <div className="flex-1 h-full ">{children}</div>
        <div className=" sticky top-35.5 hidden md:flex flex-col gap-8 w-[190px] h-fit border-l border-teal-100/20 rounded-[1px]  p-6 pt-1 pr-0   mt-10">
          <ul className="space-y-2 ">
            <li className="text-sm font-normal text-teal-100">Introduction</li>
            <li className="text-sm font-normal text-teal-100 opacity-50">Installation</li>
            <li className="text-sm font-normal text-teal-100 opacity-50">Configuration</li>

            <li className="text-sm font-normal text-teal-100 opacity-50">Usage</li>
            <li className="text-sm font-normal text-teal-100 opacity-50">API</li>
            <li className="text-sm font-normal text-teal-100 opacity-50">Contributing</li>
            <li className="text-sm font-normal text-teal-100 opacity-50">License</li>
          </ul>
        </div>
      </section>
      <MenuBottomSheet />
    </>

    
  );
};



export default DocsLayout;
