
"use client"
import useStore from "@/store";
type ButtonProps = {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    loading?: boolean;
    size?: "md" | "sm";
}

 function Button({ children, className = "", ...props }: ButtonProps) {
    return (
        <button 
            className={`bg-[#A9FFEA]/8 border border-[#A9FFEA]/10 rounded-full p-1 pr-10 ${className}`}
            {...props}
        >
            {children}
            {props.loading && <span className="ml-2">Chargement...</span>}
        </button>
    );
}

function MenuButton() {
    const {  setMenuIsOpen } = useStore();
    return (
        <button 
            className={`size-10 flex md:hidden items-center justify-center gap-1.5 bg-[#A9FFEA]/8 border border-[#A9FFEA]/10 rounded-xl text-[#A9FFEA]`}
            onClick={() => setMenuIsOpen(true)}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
            </svg>
            
        </button>
    
    );
}



export { Button, MenuButton };