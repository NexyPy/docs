// CopyButton.client.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface CopyButtonProps {
    code: string;
    className?: string;
}


const CopyButton = ({ code, className }: CopyButtonProps) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 500);
        } catch (error) {
            console.error("Copy failed:", error);
        }
    };

    return (
        <button
            onClick={copyToClipboard}
            className={`${className} hover:scale-110 transition-all absolute right-0 top-2.5 opacity-0 group-hover:opacity-100 cursor-pointer  grid place-content-center  border border-gray-50/8 text-gray-50 ${copied ? "bg-[#A9FFEA]/30" :"bg-gray-50/3 hover:bg-gray-50/8"} rounded-lg size-6 `}
        >

            {!copied ? (
                <motion.svg
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.3}
                    className="size-4 stroke-current"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6"
                    />
                </motion.svg>
            ) : (
                <motion.svg
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.3}
                    className="size-4 stroke-current"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                </motion.svg>
            )}

        </button>

    );
}

export { CopyButton }
