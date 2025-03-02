import { CodeBlock } from "@/components/CodeBlock";
import Mark from "@/components/Mark";
import Link from "next/link";

export default function ViewsPage() {
    return (
        <main className="flex-1 flex flex-col gap-5 pt-5 pb-10 text-white/80">
            <h1 className="text-2xl font-bold">View</h1>

            <section>
                <Mark>
                    Dans Nexy, une view est un composant essentiel qui se trouve dans le fichier <code className="text-[#A9FFEA]">controller.py</code>. Elle joue un rôle crucial en structurant et en présentant les données de manière claire et esthétique, facilitant ainsi l&apos;interaction utilisateur. Les views permettent de lier la logique métier à la présentation, offrant une expérience utilisateur fluide et intuitive.
                </Mark>
            </section>

            <section>
                <h2 className="text-xl font-semibold mt-4">Structure du dossier pour une view</h2><br/>
                <CodeBlock
                    language="shell"
                    code={`📁 MonProjet/\n├── 📁 app/\n│   ├── 📄 controller.py  # Pour la view\n│   |── 📄 service.py    # Services associés\n│   │   ├── 📁 components/\n│   │   │   ├── 📄 Profile.py\n│   │   │   └── 📄 UserStats.py`}
                />
            </section>

            <section>
                <h2 className="text-xl font-semibold mt-4">Comment définir une view</h2>
                <p className="text-base font-light">
                    Une view dans Nexy est une fonction Python enrichie par le décorateur <code className="text-[#A9FFEA]">@component</code>. Elle intègre la logique métier et la présentation pour générer des pages web interactives et dynamiques. En utilisant des views, vous pouvez encapsuler des fonctionnalités complexes tout en gardant le code organisé et maintenable.
                </p><br/>
                <CodeBlock
                    language="python"
                    code={`from nexy import component, Depends\nfrom .service import AppService\nfrom components import Profile, UserStats\n\n@component(\n    imports=[Profile, UserStats]\n)\ndef VIEW(\n    service: Depends(AppService)\n):\n    user_data = service.get_profile_data()\n    return {\n        "user": user_data["user"],\n        "stats": user_data["stats"]\n    }`}
                />
            </section>

            <section>
                <h2 className="text-xl font-semibold mt-6">Exploiter une view</h2>
                <p className="text-base font-light">
                    Une fois créée, une view peut être utilisée pour afficher des données de manière structurée. Par exemple, une view de profil utilisateur peut intégrer divers composants pour présenter les détails de l&apos;utilisateur de façon cohérente. Cela permet de créer des interfaces utilisateur qui sont à la fois esthétiques et fonctionnelles, en tirant parti de la puissance des composants réutilisables.
                </p><br/>
                <CodeBlock
                    language="html"
                    code={`<div class="profile-container">\n    <Profile \n        user="{{user}}"\n    />\n    <UserStats \n        stats="{{stats}}"\n    />\n</div>`}
                />
            </section>

            <section>
                <h2 className="text-xl font-semibold mt-6">Pourquoi utiliser des views ?</h2>
                <p className="text-base font-light">
                    L&apos;utilisation des views offre de nombreux avantages :
                </p>
                <ul className="list-disc list-inside text-base font-light ml-4 space-y-2">
                    <li>Code bien organisé et facile à comprendre, ce qui facilite la collaboration entre les développeurs.</li>
                    <li>Réutilisation efficace des composants, permettant de réduire la duplication de code et d&apos;améliorer la cohérence de l&apos;application.</li>
                    <li>Maintenance simplifiée grâce à une structure modulaire, rendant les mises à jour et les modifications plus faciles à gérer.</li>
                    <li>Possibilité de créer des pages web dynamiques et interactives, offrant une expérience utilisateur enrichie et engageante.</li>
                </ul>
            </section>

            <div className="flex gap-5 justify-between mt-8">
                <Link href="/docs/started/components" className={`cursor-pointer px-4 py-2 text-sm text-left font-normal rounded-[12px] bg-[#A9FFEA]/2.5 border border-[#A9FFEA]/5 text-[#A9FFEA]`}>
                    ← Composants
                </Link>
                <Link href="/docs/started/server_actions" className={`cursor-pointer px-4 py-2 text-sm text-left font-normal rounded-[12px] bg-[#A9FFEA]/20 border border-[#A9FFEA]/25 text-[#A9FFEA]`}>
                    Server actions →
                </Link>
            </div>
        </main>
    );
}
