import Link from "next/link";
import { Nexy } from "./svg/nexy";
const Header = () => {
    return (
        <header>
            <h1>Nexy</h1>
        </header>
    )
}

const HeaderDocs = () => {
    return (
        <header className="flex-1 flex justify-between items-center px-14 py-3.5 sticky top-0 z-10 bg-b[#040807]/50 border-b border-[#0D1713]/50 backdrop-blur-md">
            <div className="flex gap-6 items-center">
                <Link href="/"><Nexy /></Link>
                <div className="bg-[#A9FFEA]/10 border border-[#A9FFEA]/10 backdrop-blur-md rounded-[12px] px-2 py-1 text-sm font-light text-[#A9FFEA] " >
                    V0-1-canary
                </div>

            </div>

            <menu className="flex items-center gap-2.5">
                <button className="w-full flex items-center gap-1.5 bg-[#A9FFEA]/8 border border-[#A9FFEA]/10 rounded-full p-1 pr-10">
                    <svg className="size-8" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="34"  height="34" rx="17" fill="#A9FFEA" fillOpacity="0.2" />

                        <rect x="0.25" y="0.25" width="33.5" height="33.5" rx="16.75" stroke="#A9FFEA" strokeOpacity="0.4" strokeWidth="0.5" />
                        <path d="M24 24.6152L19.9581 20.5733ZM19.9581 20.5733C21.052 19.4793 21.6666 17.9956 21.6666 16.4485C21.6666 14.9014 21.052 13.4177 19.9581 12.3238C18.8641 11.2298 17.3804 10.6152 15.8333 10.6152C14.2862 10.6152 12.8025 11.2298 11.7085 12.3238C10.6146 13.4177 10 14.9014 10 16.4485C10 17.9956 10.6146 19.4793 11.7085 20.5733C12.8025 21.6673 14.2862 22.2818 15.8333 22.2818C17.3804 22.2818 18.8641 21.6673 19.9581 20.5733Z" fill="#A9FFEA" fillOpacity="0.8" />
                        <path d="M24 24.6152L19.9581 20.5733M19.9581 20.5733C21.052 19.4793 21.6666 17.9956 21.6666 16.4485C21.6666 14.9014 21.052 13.4177 19.9581 12.3238C18.8641 11.2298 17.3804 10.6152 15.8333 10.6152C14.2862 10.6152 12.8025 11.2298 11.7085 12.3238C10.6146 13.4177 10 14.9014 10 16.4485C10 17.9956 10.6146 19.4793 11.7085 20.5733C12.8025 21.6673 14.2862 22.2818 15.8333 22.2818C17.3804 22.2818 18.8641 21.6673 19.9581 20.5733Z" stroke="#A9FFEA" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-sm font-light text-[#A9FFEA]">Que cherchez-vous ?</span>
                </button>
                <div className="flex items-center gap-1 bg-[#A9FFEA]/8 border border-[#A9FFEA]/10 rounded-full p-1  h-fit">
                    <button>
                        <svg width="31" height="30" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.599609" width="32" height="32" rx="16" fill="#A9FFEA" fillOpacity="0.2" />
                            <rect x="0.849609" y="0.25" width="31.5" height="31.5" rx="15.75" stroke="#A9FFEA" strokeOpacity="0.25" strokeWidth="0.5" />
                            <path d="M13.9896 10.4008C14.4276 10.541 14.8442 10.7356 15.2285 10.9795C15.7715 10.8476 16.33 10.7814 16.8906 10.7825C17.4695 10.7825 18.028 10.8511 18.5515 10.979C18.9356 10.7353 19.352 10.5409 19.7898 10.4008C20.1961 10.2696 20.775 10.0572 21.119 10.4185C21.3522 10.6641 21.4105 11.0758 21.4519 11.3901C21.4985 11.7408 21.5096 12.1979 21.3872 12.6516C21.8553 13.2253 22.1375 13.9098 22.1375 14.6556C22.1375 15.7854 21.4927 16.7664 20.5383 17.4459C20.0788 17.7684 19.5695 18.0215 19.0284 18.1962C19.1531 18.4673 19.2225 18.7672 19.2225 19.082V20.7419C19.2225 20.8886 19.1611 21.0294 19.0518 21.1331C18.9424 21.2369 18.7942 21.2952 18.6395 21.2952H15.1416C14.987 21.2952 14.8387 21.2369 14.7294 21.1331C14.62 21.0294 14.5586 20.8886 14.5586 20.7419V20.1936C14.0019 20.2583 13.5349 20.2008 13.1379 20.0409C12.7228 19.8738 12.4336 19.6148 12.2162 19.3669C12.0098 19.1323 11.7848 18.6034 11.4594 18.5005C11.3868 18.4775 11.3196 18.4412 11.2617 18.3936C11.2039 18.346 11.1565 18.2881 11.1222 18.2231C11.053 18.0918 11.0416 17.9398 11.0904 17.8006C11.1393 17.6613 11.2444 17.5462 11.3827 17.4805C11.521 17.4148 11.6812 17.404 11.8279 17.4503C12.2162 17.5732 12.4692 17.8387 12.6423 18.0523C12.9222 18.3954 13.1495 18.8435 13.5926 19.0222C13.7751 19.0958 14.0427 19.144 14.4613 19.0897L14.5586 19.0709C14.56 18.7698 14.626 18.4722 14.7527 18.1962C14.2117 18.0215 13.7023 17.7684 13.2428 17.4459C12.2885 16.7664 11.6437 15.786 11.6437 14.6556C11.6437 13.9109 11.9253 13.227 12.3922 12.6538C12.2698 12.2001 12.2803 11.742 12.3269 11.3906L12.3298 11.3696C12.3724 11.0476 12.422 10.6686 12.6598 10.4185C13.0038 10.0572 13.5833 10.2702 13.989 10.4013L13.9896 10.4008Z" fill="#A9FFEA" />
                        </svg>

                    </button>
                    <button>
                        <svg width="36" height="29" viewBox="0 0 41 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.599609" width="40.4" height="32" rx="16" fill="#A9FFEA" fillOpacity="0.2" />

                            <rect x="0.849609" y="0.25" width="39.9" height="31.5" rx="15.75" stroke="#A9FFEA" strokeOpacity="0.25" strokeWidth="0.5" />
                            <path d="M12.9805 22.0024L16.4805 14.5024L19.9805 22.0024M13.9805 20.0024H18.9805M7.98047 11.7498C9.3074 11.5847 10.6433 11.5021 11.9805 11.5024M11.9805 11.5024C12.7271 11.5024 13.4691 11.5278 14.2031 11.5784M11.9805 11.5024V10.0024M14.2031 11.5784C13.4311 15.1078 11.1071 18.0558 7.98047 19.6704M14.2031 11.5784C14.8005 11.6191 15.3931 11.6764 15.9805 11.7498M12.9211 17.4131C11.8278 16.3015 10.9612 14.9878 10.3698 13.5451" stroke="#A9FFE9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M33.4996 14.353C33.659 14.5124 33.659 14.7709 33.4996 14.9303L30.7778 17.6521C30.6184 17.8115 30.3599 17.8115 30.2005 17.6521L27.4787 14.9303C27.3193 14.7709 27.3193 14.5124 27.4787 14.353C27.6382 14.1935 27.8967 14.1935 28.0561 14.353L30.4892 16.786L32.9222 14.353C33.0816 14.1935 33.3401 14.1935 33.4996 14.353Z" fill="#A9FFEA" fill-opacity="0.4" />
                        </svg>
                    </button>
                </div>
                <button className="bg-[#A9FFEA]/8 border border-[#A9FFEA]/10 rounded-full  pr-2">
                    <svg width="40" height="38" viewBox="0 0 44 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_bd_422_2132)">
                            <rect x="4" y="4" width="32" height="32" rx="16" fill="#A9FFEA" fill-opacity="0.2" shape-rendering="crispEdges" />
                            <rect x="4.25" y="4.25" width="31.5" height="31.5" rx="15.75" stroke="#A9FFEA" stroke-opacity="0.25" stroke-width="0.5" shape-rendering="crispEdges" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.7501 12.7886C17.8332 12.8716 17.8897 12.9775 17.9125 13.0927C17.9353 13.2079 17.9233 13.3273 17.8781 13.4357C17.5169 14.3026 17.3316 15.2326 17.333 16.1717C17.333 18.0575 18.0821 19.8661 19.4156 21.1996C20.7491 22.5331 22.5578 23.2823 24.4436 23.2823C25.3827 23.2836 26.3127 23.0983 27.1796 22.7371C27.2879 22.692 27.4072 22.6801 27.5223 22.7028C27.6375 22.7256 27.7432 22.782 27.8262 22.8649C27.9092 22.9479 27.9658 23.0536 27.9886 23.1687C28.0115 23.2837 27.9997 23.403 27.9547 23.5114C27.3242 25.023 26.2606 26.3142 24.8977 27.2225C23.5347 28.1307 21.9335 28.6153 20.2957 28.6152C15.7141 28.6152 12 24.9019 12 20.3195C12 16.8685 14.1071 13.9105 17.1039 12.6606C17.2122 12.6156 17.3314 12.6037 17.4464 12.6265C17.5615 12.6493 17.6672 12.7057 17.7501 12.7886Z" fill="#A9FFE9" />
                        </g>
                        <defs>
                            <filter id="filter0_bd_422_2132" x="0" y="-1" width="44" height="44" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
                                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_422_2132" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dx="2" dy="1" />
                                <feGaussianBlur stdDeviation="3" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0.913889 0 0 0 0 1 0 0 0 0 0.978973 0 0 0 0.08 0" />
                                <feBlend mode="normal" in2="effect1_backgroundBlur_422_2132" result="effect2_dropShadow_422_2132" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_422_2132" result="shape" />
                            </filter>
                        </defs>
                    </svg>

                </button>
            </menu>
        </header>


    )
}

export { Header, HeaderDocs };