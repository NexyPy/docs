"use client"
import { useState } from "react";
import { motion } from "framer-motion";

const Language = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const tabs = ["EN","FR"];

    return (

        <div className="relative">
            {/* Tab Headers */}
            <div className="flex space-x-1 p-1  bg-[#24262B]/20 border border-dashed  border-[#24262B] rounded-[0.875rem] ">
                {tabs.map((tab, index) => (
                    <button
                        key={tab}
                        className={`relative cursor-pointer text-xs size-7  rounded-[0.625rem] grid place-content-center hover:scale-110 transition-all duration-300  ${selectedTab === index
                                ? " text-[#A9FFEA] "
                                : " hover:text-[#A9FFEA] "
                            }`}
                        onClick={() => setSelectedTab(index)}
                    >
                        {tab}
                        {selectedTab === index && (
                            <motion.div
                                className="absolute inset-0 bg-[#A9FFEA]/6 hover:bg-[#A9FFEA]/10  border border-[#A9FFEA]/7 hover:borerd-[#A9FFEA]/12 rounded-[0.625rem] -z-10"
                                layoutId="activeTab"
                                transition={{ type: "spring", duration: 0.6 }}
                            />
                        )}
                    </button>
                ))}
            </div>


        </div>
    );
};

export { Language }
