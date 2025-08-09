import { TemplateEffect } from "@/components/(home)/docs/templateEffect";

type TemplateProps = {
    children: React.ReactNode;
}
const Template = ({ children }: TemplateProps) => (
    <TemplateEffect>
        {children}
    </TemplateEffect>
)

export default Template