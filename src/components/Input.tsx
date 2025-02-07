type InputProps = {
    children?: React.ReactNode;
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
}   

const Input = ({ className, onChange, value}: InputProps) => {
    return (
        <input type="text" className={`bg-[#A9FFEA]/8 border border-[#A9FFEA]/10 rounded-full p-1 pr-10 ${className}`} onChange={onChange} value={value} />
    )
}


export default Input;   
