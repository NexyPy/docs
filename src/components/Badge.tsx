interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

const Badge = ({ children, className = "" }: BadgeProps) => {
  return (
    <div className={`bg-[#A9FFEA]/8 border border-[#A9FFEA]/10 rounded-full p-1 ${className}`}>
      {children}
    </div>
  );
};

export default Badge;
