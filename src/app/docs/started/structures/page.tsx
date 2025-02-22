import { CodeBlock } from "@/components/CodeBlock";
import Mark from "@/components/Mark";
import Link from "next/link";

export default function StructurePage() {
    return (
        <main className="flex-1 flex flex-col gap-5 pt-5 pb-10 text-white/80">
            <h1 className="text-2xl font-bold">Structure et organisation du projet</h1>

            <Mark>
                Cette page fournit un aperçu des conventions de dossiers et de fichiers dans Nexy, ainsi que des conseils pour organiser votre projet de manière optimale.
            </Mark>

            <h3 className="text-lg font-medium">Conventions de dossiers et de fichiers</h3>
            <p className="text-base font-light">
                Les dossiers de niveau supérieur sont utilisés pour organiser le code et les ressources statiques de votre application.
            </p>
            <CodeBlock
                copyButton={false}
                language="shell"
                code={`📁 app/         # Routeur d'application
📁 public/      # Actifs statiques à servir
.../
`} />

            <p className="text-base font-light">
                Les fichiers de niveau supérieur sont utilisés pour configurer votre application, gérer les dépendances, exécuter des intergiciels, intégrer des outils de surveillance et définir des variables d&apos;environnement.
            </p>
            <CodeBlock
                copyButton={false}
                language="shell"
                code={`📄 nexy-config.py   # Fichier de configuration pour Nexy
📄 requirements.txt # Dépendances et scripts du projet  
📄 middleware.py    # Intergiciel de requête Nexy
📄 .env             # Variables d&apos;environnement
📄 .gitignore       # Fichiers et dossiers Git à ignorer`} />

            <h3 className="text-lg font-medium">Fichiers de routage</h3>
            <CodeBlock
                copyButton={false}
                language="shell"
                code={`📄 controller.py   # Le seul fichier routable dans Nexy
📄 layout.html     # Mise en page
📄 view.html       # Page de routage
📄 not-found.html  # Interface utilisateur non trouvée
📄 error.html      # Interface utilisateur d&apos;erreur
`} />

            <h3 className="text-lg font-medium">Itinéraires imbriqués</h3>
            <CodeBlock
                copyButton={false}
                language="shell"
                code={`📁 app/
├── 📁 dossier/         # Segment d';itinéraire
│   └── 📁 dossier/     # Segment d'itinéraire imbriqué
│       └── 📁 dossier/ # Segment d'itinéraire imbriqué
└── 📁 autre/           # Autre segment d'itinéraire
    └── 📁 dossier/     # Segment d'itinéraire imbriqué`} />

            <h3 className="text-lg font-medium">Itinéraires dynamiques</h3>
            <CodeBlock
                copyButton={false}
                language="shell"
                code={`📁 [dossier]/   #itinéraire dynamique
📁 ![dossier]   #itinéraire dynamique facultatif
📁 [_dossier]/  #itinéraire dynamique four tout
📁 ![_dossier]/ #itinéraire dynamique facultatif et four tout 
`} />

            <h3 className="text-lg font-medium">Dossiers privés</h3>
            <CodeBlock
                copyButton={false}
                language="shell"
                code={`📁 _dossier/ # Dossier privé
`} />

            <h3 className="text-lg font-medium">Organiser votre projet</h3>
            <p className="text-base font-light">
                Outre les conventions relatives aux dossiers et aux fichiers, Nexy n&apos;a pas d&apos;opinion sur la manière dont vous organisez et regroupez les fichiers de votre projet. Cependant, il fournit plusieurs fonctionnalités pour vous aider à organiser votre projet.
            </p>

            <h4 className="text-base font-medium">Colocation</h4>
            <p className="text-base font-light">
                Dans le répertoire <code className="bg-white/5 p-1 py-0.5 border border-white/10 rounded-md text-[#A9FFEA]">app</code>, des dossiers imbriqués définissent la structure de l&apos;itinéraire. Chaque dossier représente un segment d&apos;itinéraire mappé à un segment correspondant dans un chemin d&apos;URL.
            </p>

            <p className="text-base font-light">
                Cependant, même si la structure de l&apos;itinéraire est définie via des dossiers, un itinéraire n&apos;est pas accessible publiquement tant qu&apos;un fichier <code className="bg-white/5 p-1 py-0.5 border border-white/10 rounded-md text-[#A9FFEA]">controller.py</code> n&apos;est pas ajouté à un segment d&apos;itinéraire.
            </p>
            <CodeBlock
                copyButton={false}
                language="shell"
                code={`📁 app/
├── 📁 blog/
│   ├── 📄 controller.py  # Pour le blog
│   ├── 📄 service.py    # Services du blog
│   └── 📁 [slug]/
│       ├── 📄 controller.py  # Pour /blog/[slug]
│       └── 📄 service.py     # Services des articles
`} />

            <CodeBlock
                copyButton={false}
                language="shell"
                code={`🌐 url = /       # n'est pas accessible publiquement
🌐 url = /blog   # n'est pas accessible publiquement
🌐 url = /blog/1 # n'est pas accessible publiquement
`} />

            <p className="text-base font-light">
                Et, même lorsqu&apos;un itinéraire est rendu accessible au public, seul le contenu renvoyé par <code className="bg-white/5 p-1 py-0.5 border border-white/10 rounded-md text-[#A9FFEA]">controller.py</code> est envoyé au client.
            </p>
            <CodeBlock
                copyButton={false}
                language="shell"
                code={`📁 project/
├── 📁 app/
│   ├── 📄 controller.py  
│   ├── 📁 blog/  
│   │   ├── 📄 controller.py 
│   │   └── 📁 [slug]/     
│   │       └── 📄 controller.py 
│   ├── 📁 _docs/  
│   ├── 📄 controller.py 
│       └── 📁 [slug]/     
│           └── 📄 controller.py 
`} />

            <CodeBlock
                copyButton={false}
                language="shell"
                code={`🌐 url = /        # accessible publiquement
🌐 url = /blog    # accessible publiquement
🌐 url = /blog/1  # accessible publiquement
🌐 url = /docs    # n'est pas accessible , _docs/ est privé
🌐 url = /docs/1  # n'est pas accessible, _docs/ est privé
`} />

            <h3 className="text-lg font-medium">Exemple de structure de projet</h3>
            <p className="text-base font-light">
                L&apos;architecture de base d&apos;un projet Nexy est une symphonie d&apos;organisation, orchestrée pour maximiser la clarté et l&apos;efficacité de votre code. Voici un exemple de cette structure harmonieuse et bien pensée :
            </p>
            
            <CodeBlock
                copyButton={false}
                language="shell"
                code={`📁 Projet/
├── 📁 app/
│   ├── 📄 controller.py  # Pour la route /
│   ├── 📄 view.html
│   ├── 📄 layout.html
│   ├── 📁 components/
│   ├── 📁 actions/
│   ├── 📄 service.py    # Services
│   ├── 📁 modals/
│   ├── 📁 users/
│   │   ├── 📄 controller.py  # Pour /users
│   │   ├── 📄 view.html
│   │   └── 📁 [id]/
│   │       └── 📄 controller.py
│   ├── 📁 blog/
│   │   ├── 📄 controller.py  # Pour /blog
│   │   └── 📁 [slug]/
│   │       └── 📄 controller.py
│   ├── 📁 projects/
│   │   ├── 📁 [projectId]/
│   │   │   ├── 📁 tasks/
│   │   │   │   ├── 📄 controller.py
│   │   │   │   └── 📁 [taskId]/
│   │   │   │       └── 📄 controller.py
├── 📁 public/
├── 📁 tests/
└── 📄 nexy-config.py`} />
            
            <ul className="list-none space-y-2">
                <li className="text-base font-light before:content-['①'] before:mr-2 before:text-[#37FCCB]">
                    Familiarisez-vous avec la structure du projet pour bien comprendre l&apos;organisation des fichiers et répertoires. Prenez le temps d&apos;analyser comment chaque composant interagit avec les autres.
                </li>
                <li className="text-base font-light before:content-['②'] before:mr-2 before:text-[#37FCCB]">
                    Concevez votre première route pour ajouter des fonctionnalités à votre application. Commencez par une tâche simple, comme une page d&apos;accueil ou une API basique.
                </li>
                <li className="text-base font-light before:content-['③'] before:mr-2 before:text-[#37FCCB]">
                    Expérimentez avec les composants Nexy pour créer des interfaces utilisateur réutilisables et maintenables.
                </li>
                <li className="text-base font-light before:content-['④'] before:mr-2 before:text-[#37FCCB]">
                    Explorez les fonctionnalités avancées telles que les WebSockets et les actions serveur pour développer des applications interactives.
                </li>
            </ul>
            <div className="flex  gap-5 justify-between mt-5">
                <Link href="/docs/started/new_project" className={`cursor-pointer px-4 py-2 text-sm text-left font-normal  rounded-[12px]  bg-[#A9FFEA]/2.5 border border-[#A9FFEA]/5 text-[#A9FFEA] `}>
                ← Créer un nouveau projet
                </Link>

                <Link href="/docs/started/controllers" className={`cursor-pointer px-4 py-2 text-sm text-left font-normal  rounded-[12px]  bg-[#A9FFEA]/20 border border-[#A9FFEA]/25 text-[#A9FFEA] `}>
                    Controllers →
                </Link>

            </div>
        </main>
    );
}
