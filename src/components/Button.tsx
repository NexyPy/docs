import { motion } from "framer-motion"

type ButtonProps = {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    loading?: boolean;
    size?: "md" | "sm";
}

export default function Button({ children, className = "", ...props }: ButtonProps) {
    return (
        <motion.button 
            className={`bg-[#A9FFEA]/8 border border-[#A9FFEA]/10 rounded-full p-1 pr-10 ${className}`}
            {...props}
        >
            {children}
            {props.loading && <span className="ml-2">Chargement...</span>}
        </motion.button>
    );
}
