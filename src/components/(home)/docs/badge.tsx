const Badge = ({ children } : {children: React.ReactNode}) => (
    <span className='w-fit bg-yellow-50/6 border border-gray-50/15 rounded-md text-xs  font-medium tracking-wider  px-1 py-0.5 pb-1 text-yellow-300'>
        {children } 
    </span>
)

export { Badge }
