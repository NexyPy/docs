            <h1 className="text-2xl font-bold">Structure du projet</h1>

            <Mark>
                La structure de votre projet Nexy est conçue pour être modulaire et extensible, facilitant ainsi le développement et la maintenance. Le routage est basé sur la structure des dossiers, ce qui rend l&apos;organisation de votre application intuitive.
            </Mark>

            <h3 className="text-lg font-medium">1. Structure de Base</h3>
            <p className="text-base font-light">
                La structure de base d&apos;un projet Nexy est organisée pour maximiser la clarté et l&apos;efficacité du code. Voici un exemple de structure complète :
            </p>
            <CodeBlock
                copyButton={false}
                language="shell"
                code={`mon-projet/
 ├── app/
 │   ├── controller.py    # Point d'entrée principal pour la route racine
 │   ├── view.html        # Vue principale
 │   ├── users/           # Module pour les routes liées aux utilisateurs
 │   │   ├── controller.py
 │   │   ├── view.html
 │   │   └── [id]/        # Route dynamique pour l'ID utilisateur
 │   │       └── controller.py
 ├── public/              # Fichiers statiques (CSS, JS, images)
 ├── tests/               # Tests unitaires et d'intégration
 └── nexy-config.py       # Configuration de l'application`}
            />

            <h3 className="text-lg font-medium">2. Routage Dynamique</h3>
            <p className="text-base font-light">
                Le routage dans Nexy est basé sur la structure des dossiers. Les segments dynamiques sont définis en utilisant des crochets. Voici quelques exemples :
            </p>
            <CodeBlock
                copyButton={false}
                language="shell"
                code={`app/
 ├── blog/
 │   ├── controller.py    # Gère /blog
 │   ├── [slug]/         # Route dynamique pour les articles
 │   │   └── controller.py # Gère /blog/{slug}
 ├── projects/
 │   ├── [projectId]/
 │   │   ├── tasks/
 │   │   │   ├── controller.py  # Gère /projects/{projectId}/tasks
 │   │   │   └── [taskId]/
 │   │   │       └── controller.py # Gère /projects/{projectId}/tasks/{taskId}`}
            />

            <h3 className="text-lg font-medium">3. Rôles des fichiers et répertoires</h3>
            <p className="text-base font-light">
                Chaque élément de la structure a un rôle bien défini pour soutenir le développement de votre application :
            </p>
            <ul className="list-none space-y-2">
                <li className="text-base font-light before:content-['•'] before:mr-2 before:text-[#37FCCB]">
                    <strong>controller.py</strong> : Définit les points d&apos;entrée et la logique de gestion des requêtes HTTP pour chaque route.
                </li>
                <li className="text-base font-light before:content-['•'] before:mr-2 before:text-[#37FCCB]">
                    <strong>view.html</strong> : Contient le template HTML pour la route correspondante.
                </li>
                <li className="text-base font-light before:content-['•'] before:mr-2 before:text-[#37FCCB]">
                    <strong>Dossiers dynamiques ([param])</strong> : Permettent de créer des routes avec des paramètres variables.
                </li>
                <li className="text-base font-light before:content-['•'] before:mr-2 before:text-[#37FCCB]">
                    <strong>public/</strong> : Héberge les fichiers statiques tels que les images, les styles CSS, et les scripts JavaScript.
                </li>
                <li className="text-base font-light before:content-['•'] before:mr-2 before:text-[#37FCCB]">
                    <strong>nexy-config.py</strong> : Contient les paramètres de configuration globaux de l&apos;application.
                </li>
            </ul>

            <h3 className="text-lg font-medium">4. Exemple de contrôleur</h3>
            <p className="text-base font-light">
                Voici un exemple de code pour un contrôleur simple dans Nexy, illustrant comment gérer les requêtes HTTP :
            </p>
            <CodeBlock
                language="python"
                code={`# app/blog/[slug]/controller.py

def GET(slug: str):
    return {
        "title": f"Article: {slug}",
        "content": "Contenu de l'article..."
    }

async def POST(slug: str, data: dict):
    return {
        "message": f"Article {slug} mis à jour",
        "data": data
    }
`}
            />

            <div className="flex gap-5 justify-between mt-5"> 