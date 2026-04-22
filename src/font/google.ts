import { Major_Mono_Display, Inter, JetBrains_Mono,DM_Sans } from "next/font/google";

const dm_sans = DM_Sans({
    subsets: ['latin'],
    weight: [ '600'],
})

const dm_sans_300 = DM_Sans({
  subsets: ["latin"],
  weight : ["300"]
})

const dm_sans_400 = DM_Sans({
  subsets: ["latin"],
  weight : ["400"]
})


const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
  });
  
  const jetbrainsMono = JetBrains_Mono({
    variable: "--font-jetbrains-mono",
    subsets: ["latin"],
  });

  const majorMonoDisplay = Major_Mono_Display({
    subsets: ["latin"],
    variable: "--font-major-mono-display",
    weight: ["400"],
  })

export { dm_sans,inter,jetbrainsMono,dm_sans_300, dm_sans_400,majorMonoDisplay}