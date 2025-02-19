import { motion } from "motion/react"
type ButtonProps = {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    loading?: boolean;
    size?: "md" | "sm";
}

const Button = ({ ...props }: ButtonProps) => {
    return (
        <motion.button 
            className={`bg-[#A9FFEA]/8 border border-[#A9FFEA]/10 rounded-full p-1 pr-10 ${props.className}`}
            {...props}
        >
            {props.children}
            {props.loading && <span className="ml-2">Chargement...</span>}
        </motion.button>
    );
}

export default Button;
