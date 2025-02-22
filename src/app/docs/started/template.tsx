"use client"
import { motion } from "framer-motion";
import React, { ReactNode } from 'react';

interface TemplateProps {
    children: ReactNode;
}

const Template = ({ children }: TemplateProps) => {
    return (
                <motion.main
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.4 }}
                    className=""
                >
                    {children}
                </motion.main>
           
    );
};

export default Template;
