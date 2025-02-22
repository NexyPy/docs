"use client"
import React from 'react';
import { usePathname } from 'next/navigation';
const Build = () => {
    const page = usePathname();
    return (
        <div className="flex flex-col items-center justify-center w-full h-[calc(100dvh_-_110px)] md:h-full">

            <h1 className='text-9xl mb-10'>🐍</h1>
            
            <h1 className="text-2xl font-bold mt-4 text-center">La page <span className="bg-white/5 px-2 py-1 rounded-md text-[#A9FFEA] text-lg font-medium border border-[#A9FFEA]/5">{page}</span> est en cours de construction</h1>
            <p className="text-center px-8 text-lg text-gray-500 mt-2">Cette section est encore en construction. Revenez plus tard pour plus de mises à jour.</p>
        </div>
    );
};

export default Build;
