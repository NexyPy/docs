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

const Button = ({ children, className, onClick, type, disabled, loading }: ButtonProps) => {
    return (
        <>

            <motion.button className={`bg-[#A9FFEA]/8 border border-[#A9FFEA]/10 rounded-full p-1 pr-10 ${className}`} onClick={onClick} type={type} disabled={disabled}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
            >

                {children}
                {loading && <span className="ml-2">Chargement...</span>}
            </motion.button>
            <button className={`bg-[#A9FFEA]/8 border border-[#A9FFEA]/10 rounded-full p-1 pr-10 ${className}`} onClick={onClick} type={type} disabled={disabled}>
            </button>

            <button className={`bg-[#A9FFEA]/8 border border-[#A9FFEA]/10 rounded-full p-1 pr-10 ${className}`} onClick={onClick} type={type} disabled={disabled}>
                {children}
                {loading && <span className="ml-2">Chargement...</span>}
            </button>
        </>
    );
}





export default Button;
