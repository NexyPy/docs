import { CodeBlock } from "@/components/CodeBlock";
import Mark from "@/components/Mark";
import Link from "next/link";

export default function InstallationPage() {
    return (
        <main className="flex-1 flex flex-col gap-5 pt-5 pb-10 text-white/80">
            <h1 className="text-2xl font-bold">Créer un nouveau projet</h1>

            <Mark>
                Pour démarrer avec Nexy, assurez-vous d'avoir <span className="font-normal text-[#37FCCB]">Python 3.12</span> ou une version plus récente. Cette version est nécessaire pour utiliser Nexy et profiter de toutes ses fonctionnalités modernes.
            </Mark>

            <h3 className="text-lg font-medium">1. Vérification de la version de Python</h3>
            <p className="text-base font-light">
                Vérifiez que votre version de Python est à jour avec cette commande. Une version récente de Python est essentielle pour garantir la compatibilité et les meilleures performances :
            </p>
            <CodeBlock
                language="shell"
                code={`python --version
# Vous devriez voir Python 3.12.x ou supérieur`}
            />
            <p className="text-base font-light">
                Si votre version de Python n'est pas à jour, téléchargez la dernière version depuis le site officiel de Python : <a href="https://www.python.org/downloads/" className="text-[#37FCCB]">python.org/downloads</a>. Suivez les instructions d'installation pour votre système d'exploitation.
            </p>

            <h3 className="text-lg font-medium">2. Installation de Nexy</h3>
            <p className="text-base font-light">
                Installez Nexy avec pip, le gestionnaire de paquets Python. Nous installons aussi InquirerPy pour une meilleure interaction en ligne de commande lors de la création de projets :
            </p>
            <CodeBlock
                language="shell"
                code={`pip install nexy inquirerpy==0.3.4`}
            />

            <p className="text-base font-light">
                Vérifiez que Nexy est correctement installé en exécutant la commande suivante. Cela vous permettra de voir la version installée et de confirmer que tout est en ordre :
            </p>
            <CodeBlock
                language="shell"
                code={`nexy --version`}
            />

            <h3 className="text-lg font-medium">3. Création d'un nouveau projet Nexy</h3>
            <p className="text-base font-light">
                Créez et explorez votre nouveau projet avec ces commandes. Nexy va générer automatiquement une structure de projet optimisée avec tous les fichiers nécessaires pour démarrer rapidement :
            </p>
            <CodeBlock
                copyButton={false}
                language="shell"
                code={`nexy new mon-projet
cd mon-projet`}
            />

            <h3 className="text-lg font-medium">4. Explorer la Structure Initiale du Projet</h3>
            <p className="text-base font-light">
                Comprendre la structure initiale de votre projet est essentiel pour un développement efficace. Nexy propose deux modèles de projet principaux, chacun adapté à des besoins spécifiques. Voici un aperçu détaillé pour un projet fullstack et un projet de microservice.
            </p>

            <h4 className="text-md font-medium">Projet Fullstack</h4>
            <p className="text-base font-light">
                La structure d'un projet fullstack gère à la fois le backend et le frontend. Cette configuration est idéale pour les applications web complètes qui nécessitent une interface utilisateur et une logique serveur intégrée. Chaque fichier a un rôle spécifique dans l'architecture :
            </p>
            <CodeBlock
                copyButton={false}
                language="shell"
                code={`mon-projet/
 ├── app/
 |  | __init__.py
 |  | controller.py    # Point d'entrée principal
 |  | service.py       # Configuration de l'application
 |  | layout.html      # Templates HTML
 |  | views.html       # Vue principale (optionnelle)
 ├── public/           # Fichiers statiques
 └── nexy-config.py    # Configuration de l'application`}
            />

            <h4 className="text-md font-medium">Projet Microservice</h4>
            <p className="text-base font-light">
                La structure d'un projet de microservice est optimisée pour des services spécifiques et autonomes. Cette architecture est parfaite pour construire des systèmes distribués ou pour isoler des fonctionnalités spécifiques. La structure est volontairement allégée pour se concentrer sur l'essentiel :
            </p>
            <CodeBlock
                copyButton={false}
                language="shell"
                code={`mon-projet/
 ├── app/
 |  | __init__.py
 |  | controller.py    # Point d'entrée principal
 |  | service.py       # Configuration de l'application
 ├── public/           # Fichiers statiques
 └── nexy-config.py    # Configuration de l'application`}
            />

            <h3 className="text-lg font-medium">5. Lancement du serveur de développement</h3>
            <p className="text-base font-light">
                Lancez le serveur de développement pour tester votre projet. Le serveur de développement de Nexy inclut le rechargement automatique du code, ce qui signifie que vos modifications seront immédiatement visibles sans avoir à redémarrer le serveur :
            </p>
            <CodeBlock
                language="shell"
                code={`nexy dev  # Démarre le serveur de développement`}
            />

            <h3 className="text-lg font-medium">Prochaines étapes</h3>
            <p className="text-base font-light">
                Votre projet est maintenant prêt pour le développement. Pour tirer le meilleur parti de Nexy, voici quelques étapes suggérées pour continuer votre apprentissage et commencer à construire votre application :
            </p>
            <ul className="list-none space-y-2">
                <li className="text-base font-light before:content-['①'] before:mr-2 before:text-[#37FCCB]">
                    Explorez la structure du projet pour vous familiariser avec les fichiers et répertoires. Prenez le temps de comprendre comment chaque composant interagit avec les autres.
                </li>
                <li className="text-base font-light before:content-['②'] before:mr-2 before:text-[#37FCCB]">
                    Créez votre première route pour ajouter des fonctionnalités à votre application. Commencez par quelque chose de simple comme une page d'accueil ou une API basique.
                </li>
                <li className="text-base font-light before:content-['③'] before:mr-2 before:text-[#37FCCB]">
                    Expérimentez avec les composants Nexy pour créer des interfaces utilisateur réutilisables et maintenables.
                </li>
                <li className="text-base font-light before:content-['④'] before:mr-2 before:text-[#37FCCB]">
                    Explorez les fonctionnalités avancées comme les WebSockets et les actions serveur pour créer des applications interactives.
                </li>
            </ul>
            <div className="flex  gap-5 justify-between mt-5">
                <Link href="#" className={`cursor-pointer px-4 py-2 text-sm text-left font-normal  rounded-[12px]  bg-[#A9FFEA]/2.5 border border-[#A9FFEA]/5 text-[#A9FFEA] `}>
                    Introduction 
                </Link>

                <Link href="#" className={`cursor-pointer px-4 py-2 text-sm text-left font-normal  rounded-[12px]  bg-[#A9FFEA]/20 border border-[#A9FFEA]/25 text-[#A9FFEA] `}>
                    Structure du projet
                </Link>

            </div>
        </main>
    );
}