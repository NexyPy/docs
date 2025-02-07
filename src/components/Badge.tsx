const Badge = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="bg-[#A9FFEA]/8 border border-[#A9FFEA]/10 rounded-full p-1 pr-10">
            {children}
        </div>
    )
}   

export default Badge;
