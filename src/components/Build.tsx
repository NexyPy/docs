"use client"
import React from 'react';
import { usePathname } from 'next/navigation';
const Build = () => {
    const page = usePathname().split("/").pop();
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-24 h-24 text-yellow-500"
            >
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14.93V17h-2v-.07a8.001 8.001 0 01-6.93-6.93H7v-2H4.07A8.001 8.001 0 0112 4.07V7h2V4.07a8.001 8.001 0 016.93 6.93H17v2h2.93A8.001 8.001 0 0113 16.93zM12 8a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
            <h1 className="text-2xl font-bold mt-4">La page <span className="bg-white/5 px-2 py-1 rounded-md text-[#A9FFEA] text-lg font-medium border border-[#A9FFEA]/5">{page}</span> est en cours de construction</h1>
            <p className="text-center px-8 text-lg text-gray-500 mt-2">Cette section est encore en construction. Revenez plus tard pour plus de mises à jour.</p>
        </div>
    );
};

export default Build;
