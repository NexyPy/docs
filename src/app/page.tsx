import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};
import { HeroSection } from "@/components/(home)/heroSection";

const HomePage = () => {
     return (
        <>
          <HeroSection/>
        </>
          
     );
    
};

export default HomePage;
