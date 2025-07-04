import Link from "next/link";

const MDXLink = ({ children, href, target= true }: { children: React.ReactNode, href: string, target?:boolean }) => {
    return (
        <Link href={href} className='text-yellow-300 italic' target={ `${target ? "_blank": ""}`}>{children}</Link>
    );
}
export {MDXLink};