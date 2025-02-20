import { CodeBlock } from "@/components/CodeBlock";
import Link from "next/link";
import React from "react";

export default function RoutingPage() {
    return (
        <main className="flex-1 flex flex-col gap-5 pt-5 pb-10 text-white/80">
            <h1 className="text-2xl font-bold">Routage dans Nexy</h1>

            <p className="text-base font-light">
                Le routage dans Nexy est conçu pour être simple et intuitif. Vous pouvez définir des routes en utilisant des fichiers et des dossiers. Voici un exemple de configuration de routage :
            </p>
            <CodeBlock
                copyButton={false}
                language="shell"
                code={`app/
├── controller.py   # Le seul fichier routable dans Nexy
├── layout.html     # Mise en page
├── view.html       # Page de routage
├── not-found.html  # Interface utilisateur non trouvée
└── error.html      # Interface utilisateur d'erreur
`}
            />

            <h3 className="text-lg font-medium">Définir une route</h3>
            <p className="text-base font-light">
                Pour définir une route, créez simplement un fichier ou un dossier dans le répertoire <code>app/</code>. Par exemple, pour créer une route pour un blog, vous pouvez organiser votre projet comme suit :
            </p>
            <CodeBlock
                copyButton={false}
                language="shell"
                code={`app/
├── blog/
│   ├── controller.py
│   └── [slug]/
│       └── controller.py
`}
            />

            <h3 className="text-lg font-medium">Routes dynamiques</h3>
            <p className="text-base font-light">
                Nexy prend en charge les routes dynamiques en utilisant des crochets dans les noms de dossiers ou de fichiers. Par exemple, pour créer une route dynamique pour les articles de blog, vous pouvez utiliser la structure suivante :
            </p>
            <CodeBlock
                copyButton={false}
                language="shell"
                code={`app/
├── blog/
│   ├── controller.py
│   └── [slug]/
│       └── controller.py
`}
            />

            <h3 className="text-lg font-medium">Exemple de route dynamique</h3>
            <CodeBlock
                language="python"
                code={`# app/blog/[slug]/controller.py
from nexy import Controller

class BlogController(Controller):
    async def get(self, slug: str):
        return {"slug": slug}
`}
            />

            <div className="flex gap-5 justify-between mt-5">
                <Link href="/structure" className={`cursor-pointer px-4 py-2 text-sm text-left font-normal rounded-[12px] bg-[#A9FFEA]/20 border border-[#A9FFEA]/25 text-[#A9FFEA]`}>
                    Structure du projet
                </Link>

                <Link href="/controllers" className={`cursor-pointer px-4 py-2 text-sm text-left font-normal rounded-[12px] bg-[#A9FFEA]/20 border border-[#A9FFEA]/25 text-[#A9FFEA]`}>
                    Controllers
                </Link>
            </div>
        </main>
    );
}
