import { CodeBlock } from "@/components/CodeBlock";
import Mark from "@/components/Mark";
import Link from "next/link";

export default function ComponentsPage() {
    return (
        <main className="flex-1 flex flex-col gap-5 pt-5 pb-10 text-white/80">
            <h1 className="text-2xl font-bold">Votre premier composant</h1>

            <Mark>
                Les composants sont essentiels dans Nexy. Ils constituent la base de vos interfaces utilisateurs (UI), ce qui en fait un excellent point de départ pour apprendre Nexy !
            </Mark>

            <h2 className="text-xl font-semibold mt-4">Les composants : les blocs de construction de l'UI</h2>
            <p className="text-base font-light">
                Sur le Web, HTML permet de créer des documents riches et structurés grâce à ses nombreuses balises comme <code>&lt;h1&gt;</code> et <code>&lt;li&gt;</code>. Nexy vous permet de combiner votre balisage avec CSS et JavaScript pour créer des composants personnalisés, réutilisables dans votre application.
            </p>

            <h2 className="text-xl font-semibold mt-6">Définir un composant</h2>
            <p className="text-base font-light">
                Traditionnellement, les développeurs web écrivent le balisage de leur contenu puis ajoutent de l'interactivité avec JavaScript. Aujourd'hui, c'est une exigence de base pour de nombreux sites et applications. Nexy met l'interactivité au premier plan tout en utilisant les mêmes technologies de base : un composant Nexy est une fonction Python que vous pouvez enrichir avec du balisage.
            </p>
            <CodeBlock
                language="shell"
                code={`📁 components/\n├── 📄 Button.py\n└── 📄 Button.html`}
            />
            <CodeBlock
                language="python"
                code={`from nexy import Component\n@Component()\ndef Button(label: str, onClick: Callable):\n\treturn { "label": label, "onClick": onClick }`}
            />

            <h3 className="text-lg font-medium mt-4">Structure du fichier HTML pour Button</h3>
            <CodeBlock
                language="html"
                code={`<button onclick="{{onClick}}">{{label}}</button>\n<style>\n\tbutton {\n\t\tbackground-color: #4CAF50;\n\t\tborder: none;\n\t\tcolor: white;\n\t\tpadding: 10px 20px;\n\t\tborder-radius: 4px;\n\t\tcursor: pointer;\n\t\t&:hover {\n\t\t\tbackground-color: #45a049;\n\t\t}\n\t}\n</style>`}
            />

            <h3 className="text-lg font-medium mt-4">Utiliser un composant</h3>
            <p className="text-base font-light">
                Maintenant que vous avez défini votre composant Button, vous pouvez l'imbriquer dans d'autres composants. Par exemple, vous pouvez utiliser le composant Button dans une vue :
            </p>
            <CodeBlock
                language="html"
                code={`<Button \n\tlabel="Soumettre" \n\tonClick="submitForm()"\n/>`}
            />

            <h2 className="text-xl font-semibold mt-6">Composants avec contenu enfant</h2>
            <p className="text-base font-light">
                Le paramètre <code>caller</code> permet à un composant de recevoir et d'afficher du contenu enfant, transformant le composant en une balise de type bloc.
            </p>
            <CodeBlock
                language="shell"
                code={`📁 components/\n├── 📄 Card.py\n└── 📄 Card.html`}
            />
            <CodeBlock
                language="python"
                code={`from nexy import Component\n@Component()\ndef Card(caller: Any):\n\tchildren = caller()\n\treturn { "children": children }`}
            />

            <h3 className="text-lg font-medium mt-4">Structure du fichier HTML pour Card</h3>
            <p className="text-base font-light">
                Le fichier HTML associé au composant Card utilise la variable <code>children</code> pour afficher le contenu capturé.
            </p>
            <CodeBlock
                language="html"
                code={`<div class="card">{{children}}</div>\n<style>\n\t.card {\n\t\tbackground-color: #c5d6d1;\n\t\tborder-radius: 8px;\n\t\tpadding: 16px;\n\t\twidth: clamp(300px, 100%, 500px);\n\t\tfont-family: 'Poppins', sans-serif;\n\t\tbox-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n\t}\n</style>`}
            />

            <h3 className="text-lg font-medium mt-4">Utiliser un composant avec contenu enfant</h3>
            <CodeBlock
                language="html"
                code={`<Card>\n\t<h2>Titre de la carte</h2>\n\t<p>Contenu de la carte</p>\n</Card>`}
            />

            <h2 className="text-xl font-semibold mt-6">Composition de composants</h2>
            <p className="text-base font-light">
                Les composants peuvent être composés pour créer des interfaces complexes. L'attribut <code>imports</code> permet d'utiliser d'autres composants à l'intérieur d'un composant.
            </p>
            <CodeBlock
                language="shell"
                code={`📁 components/\n├── 📄 Dashboard.py\n└── 📄 Dashboard.html`}
            />
            <CodeBlock
                language="python"
                code={`from nexy import Component\nfrom .Card import Card\nfrom .Button import Button\n\n@Component(\n\timports=[Card, Button]\n) \ndef Dashboard(user: User):\n\treturn { "user": user, "cards": get_user_cards(user.id) }`}
            />

            <h3 className="text-lg font-medium mt-4">Structure du fichier HTML pour Dashboard</h3>
            <CodeBlock
                language="html"
                code={`<div class="dashboard">\n\t<h1>Bienvenue, {{user.name}}</h1>\n\t{% for card_data in cards %}\n\t\t<Card>\n\t\t\t<h2>{{card_data.title}}</h2>\n\t\t\t<p>{{card_data.content}}</p>\n\t\t\t<Button \n\t\t\t\tlabel="Voir détails" \n\t\t\t\tonClick="viewDetails({{card_data.id}})"\n\t\t\t/>\n\t\t</Card>\n\t{% endfor %}\n</div>`}
            />

            <h2 className="text-xl font-semibold mt-6">Composants conteneurs</h2>
            <p className="text-base font-light">
                Les composants conteneurs peuvent encapsuler d'autres composants et du contenu, créant ainsi une structure hiérarchique.
            </p>
            <CodeBlock
                language="shell"
                code={`📁 components/\n├── 📄 Layout.py\n└── 📄 Layout.html`}
            />
            <CodeBlock
                language="python"
                code={`from nexy import Component\nfrom .Card import Card\nfrom .Button import Button\n\n@Component(\n\timports=[Card, Button]\n) \ndef Layout(caller: Any):\n\tchildren = caller()\n\treturn { "children": children, "title": "Mon Application" }`}
            />

            <h3 className="text-lg font-medium mt-4">Utiliser un composant conteneur</h3>
            <CodeBlock
                language="html"
                code={`<main>\n\t<Card>\n\t\t<h2>Titre de la carte</h2>\n\t\t<p>Contenu de la carte</p>\n\t\t<Button \n\t\t\tlabel="Cliquez ici" \n\t\t\tonClick="handleClick()"\n\t\t/>\n\t</Card>\n</main>`}
            />

            <h2 className="text-xl font-semibold mt-6">Avantages du système de composants</h2>
            <p className="text-base font-light">
                Utiliser le système de composants de Nexy présente plusieurs avantages :
            </p>
            <ul className="list-disc list-inside text-base font-light ml-4 space-y-2">
                <li>Réutilisation du code à travers différentes parties de l'application</li>
                <li>Séparation claire entre la logique et la présentation</li>
                <li>Facilité de maintenance grâce à la modularité</li>
                <li>Possibilité de créer des bibliothèques de composants pour une utilisation dans plusieurs projets</li>
                <li>Syntaxe intuitive similaire aux frameworks frontend modernes</li>
            </ul>

            <div className="flex gap-5 justify-between mt-8">
                <Link href="/docs/started/reponses" className={`cursor-pointer px-4 py-2 text-sm text-left font-normal rounded-[12px] bg-[#A9FFEA]/2.5 border border-[#A9FFEA]/5 text-[#A9FFEA]`}>
                    ← Réponses
                </Link>
                <Link href="/docs/started/views" className={`cursor-pointer px-4 py-2 text-sm text-left font-normal rounded-[12px] bg-[#A9FFEA]/20 border border-[#A9FFEA]/25 text-[#A9FFEA]`}>
                    Views →
                </Link>
            </div>
        </main>
    );
}