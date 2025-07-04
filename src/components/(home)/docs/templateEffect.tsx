"use client"
import { motion } from "framer-motion";

interface TemplateProps {
    children: React.ReactNode;
}

const TemplateEffect = ({ children }: TemplateProps) => {
    const pageVariants = {
        initial: {
            opacity: 0,
            y: 50,
            scale: 0.95
        },
        animate: {
            opacity: 1,
            y: 0,
            scale: 1
        },
        exit: {
            opacity: 0,
            y: -50,
            scale: 0.95
        }
    };

    const pageTransition = {
        type: "spring",
        stiffness: 150,
        damping: 18,
        duration: 0.5
    };

    return (
        <motion.section
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            className="flex-1 flex flex-col gap-5"
        >
            
                {children}
        </motion.section>
    );
};

export  {TemplateEffect};
