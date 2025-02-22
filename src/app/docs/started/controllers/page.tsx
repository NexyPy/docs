import { CodeBlock } from "@/components/CodeBlock";
import Mark from "@/components/Mark";
import Link from "next/link";
const HTTP_CONTROLLER = [
    {
        method: "GET",
        description: "La méthode GET est la méthode fondamentale de récupération de données. Elle permet de lire des informations sans modifier l&apos;état du serveur, ce qui en fait la méthode la plus sécurisée et la plus utilisée. Son utilisation principale concerne l&apos;affichage des pages et la consultation des ressources comme les profils utilisateurs ou les listes de produits.",
        code: `# Exemple simple de GET pour récupérer un utilisateur
from nexy import Request, Depends
from .service import AppService

async def GET(
    request: Request, 
    service: Depends(AppService)
):
    return await service.get_user()`
    },
    {
        method: "POST",
        description: "Complémentaire à GET, la méthode POST est dédiée à la création de nouvelles ressources. Elle assure un transfert sécurisé des données vers le serveur, avec une validation systématique avant sauvegarde. Cette méthode est essentielle pour toutes les opérations d&apos;ajout, que ce soit la création de comptes utilisateurs ou la publication de nouveaux contenus.",
        code: `# Exemple de POST pour créer un nouvel utilisateur
from nexy import Request, Depends
from .service import AppService

async def POST(
    request: Request, 
    service: Depends(AppService)
):
    new_user = await request.json()
    return await service.create_user(new_user)`
    },
    {
        method: "PUT",
        description: "La méthode PUT s&apos;inscrit dans la logique de modification en permettant le remplacement complet d&apos;une ressource existante. Contrairement à POST, elle nécessite l&apos;envoi de l&apos;intégralité des données, même celles qui ne changent pas. Cette approche garantit la cohérence des données en évitant les mises à jour partielles.",
        code: `# Exemple de PUT pour mettre à jour un profil complet
from nexy import Request, Depends
from .service import AppService

async def PUT(
    request: Request, 
    service: Depends(AppService)
):
    updated_profile = await request.json()
    return await service.update_profile(updated_profile)`
    },
    {
        method: "DELETE",
        description: "Dans la continuité des opérations de modification, la méthode DELETE assure la suppression définitive des ressources. Elle complète le cycle de vie des données en permettant leur retrait du système. Cette méthode requiert une attention particulière et souvent une confirmation de l&apos;utilisateur pour prévenir les suppressions accidentelles.",
        code: `# Exemple de DELETE pour supprimer un compte
from nexy import Request, Depends
from .service import AppService

async def DELETE(
    request: Request, 
    service: Depends(AppService)
):
    return await service.delete_account()`
    },
    {
        method: "OPTIONS",
        description: "La méthode OPTIONS joue un rôle crucial dans l&apos;architecture des API en fournissant des métadonnées sur les opérations disponibles. Elle est particulièrement importante pour la sécurité CORS et permet aux clients de découvrir les capacités d&apos;un endpoint. Les navigateurs l&apos;utilisent automatiquement pour vérifier les autorisations avant d&apos;effectuer certaines requêtes.",
        code: `# Exemple d'OPTIONS avec configuration CORS
from nexy import Request, Depends
from .service import AppService

async def OPTIONS(
    request: Request, 
    service: Depends(AppService)
):
    return await service.get_cors_config()`
    },
    {
        method: "HEAD",
        description: "La méthode HEAD est une variante optimisée de GET qui ne retourne que les en-têtes HTTP. Cette approche permet de vérifier l&apos;existence ou les métadonnées d&apos;une ressource sans transférer son contenu, optimisant ainsi la consommation de bande passante et les performances du système.",
        code: `# Exemple de HEAD pour vérifier une ressource
from nexy import Request, Depends
from .service import AppService

async def HEAD(
    request: Request, 
    service: Depends(AppService)
):
    return await service.get_resource_headers()`
    },
    {
        method: "PATCH",
        description: "Complétant les capacités de PUT, la méthode PATCH permet des modifications partielles et ciblées des ressources. Cette approche plus flexible optimise les performances en ne transmettant que les données nécessaires. Elle est particulièrement adaptée pour les mises à jour fréquentes de champs spécifiques.",
        code: `# Exemple de PATCH pour modifier partiellement
from nexy import Request, Depends
from .service import AppService

async def PATCH(
    request: Request, 
    service: Depends(AppService)
):
    changes = await request.json()
    return await service.update_partial(changes)`
    },
    {
        method: "TRACE",
        description: "La méthode TRACE complète la suite des outils de diagnostic en permettant de suivre le parcours exact d&apos;une requête à travers le réseau. Cette fonctionnalité est essentielle pour le débogage des problèmes de routage et la compréhension des transformations appliquées aux requêtes.",
        code: `# Exemple de TRACE pour suivre une requête
from nexy import Request, Depends
from .service import AppService

async def TRACE(
    request: Request, 
    service: Depends(AppService)
):
    return await service.trace_request(request)`
    }
];

const DYNAMIC_CONTROLLER = [
    {
        method: "GET",
        description: "Dans une route dynamique, la méthode GET acquiert une dimension supplémentaire grâce au paramètre &apos;slug&apos;. Cette approche permet une identification précise des ressources, essentielle pour la récupération de contenus spécifiques comme des articles de blog ou des profils utilisateurs individuels.",
        code: `# Exemple de GET dynamique pour un article de blog
from nexy import Request, Depends
from .service import AppService

async def GET(
    slug: str, 
    request: Request, 
    service: Depends(AppService)
):
    return await service.get_article(slug)`
    },
    {
        method: "POST",
        description: "La méthode POST en contexte dynamique permet la création de ressources dans des contextes spécifiques. Cette fonctionnalité est particulièrement utile pour l&apos;ajout d&apos;éléments liés à une ressource existante, comme des commentaires sur un article ou des sous-éléments dans une collection.",
        code: `# Exemple de POST pour ajouter un commentaire
from nexy import Request, Depends
from .service import AppService

async def POST(
    slug: str, 
    request: Request, 
    service: Depends(AppService)
):
    comment_data = await request.json()
    return await service.add_comment(slug, comment_data)`
    }
];

const WEBSOCKET_CONTROLLER = [
    {
        method: "SOCKET",
        description: "Le contrôleur WebSocket établit une communication bidirectionnelle persistante entre le client et le serveur. Cette technologie est fondamentale pour les applications nécessitant des mises à jour en temps réel, comme les systèmes de messagerie instantanée ou les tableaux de bord dynamiques.",
        code: `# Exemple de WebSocket pour un chat en direct
from nexy import WebSocket, Depends
from .service import AppService

async def SOCKET(
    ws: WebSocket, 
    service: Depends(AppService)
):
    await service.handle_websocket(ws)`
    }
];

const WEBSOCKET_CONTROLLER_DYNAMIC = [
    {
        method: "SOCKET",
        description: "Les WebSockets dynamiques étendent les capacités des WebSockets standards en permettant des connexions contextuelles via le paramètre slug. Cette approche permet la création de canaux de communication dédiés, particulièrement adaptés pour les salles de discussion privées ou les flux de données personnalisés.",
        code: `# Exemple de WebSocket pour une salle de chat privée
from nexy import WebSocket, Depends
from .service import AppService

async def SOCKET(
    slug: str, 
    ws: WebSocket, 
    service: Depends(AppService)
):
    await service.handle_dynamic_websocket(slug, ws)`
    }
];

const TEMPLATE_CONTROLLER = [
    {
        method: "VIEW",
        description: "La méthode VIEW transforme les données en interfaces utilisateur structurées. Cette méthode, enrichie par le décorateur @component, permet la création de pages web dynamiques en combinant logique métier et présentation. Elle représente une évolution naturelle de la méthode GET en retournant du contenu HTML formaté.",
        code: `# Exemple de VIEW pour une page de profil
from nexy import component, Depends
from .service import AppService
from components import Profile, UserStats

@component(
    import = [Profile, UserStats]
)
def VIEW(
    service: Depends(AppService)
):
    return service.get_profile_data()`
    },
    {
        method: "LAYOUT",
        description: "La méthode LAYOUT définit la structure globale de l&apos;application. Elle gère les éléments communs comme l&apos;en-tête, le pied de page et la navigation. Cette méthode, utilisée conjointement avec le décorateur @component, assure une cohérence visuelle à travers l&apos;application.",
        code: `# Exemple de LAYOUT avec navigation et footer
from nexy import component, Depends
from .service import AppService
from components import Navbar, Footer, Sidebar

@component(
    import = [Navbar, Footer, Sidebar]
)
def LAYOUT(
    service: Depends(AppService)
):
    return service.get_layout_data()`
    }
];

const TEMPLATE_CONTROLLER_DYNAMIC = [
    {
        method: "VIEW",
        description: "La méthode VIEW en contexte dynamique permet la création de pages personnalisées basées sur le paramètre slug. Cette approche permet d&apos;adapter la présentation en fonction du contexte, idéale pour les profils utilisateurs ou les articles de contenu spécifiques.",
        code: `# Exemple de VIEW pour un profil utilisateur spécifique
from nexy import component, Depends
from .service import AppService
from components import UserProfile, ActivityFeed

@component(
    import = [UserProfile, ActivityFeed]
)
def VIEW(
    slug: str, 
    service: Depends(AppService)
):
    return service.get_dynamic_profile_data(slug)`
    },
    {
        method: "LAYOUT",
        description: "Le LAYOUT dynamique étend les capacités de mise en page en fonction du contexte fourni par le slug. Cette flexibilité permet d&apos;adapter la structure globale selon les besoins spécifiques, comme des thèmes personnalisés ou des dispositions sectorielles.",
        code: `# Exemple de LAYOUT dynamique pour différentes sections
from nexy import component, Depends
from .service import AppService
from components import DynamicNav, Footer

@component(
    import = [DynamicNav, Footer]
)
def LAYOUT(
    slug: str, 
    service: Depends(AppService)
):
    return service.get_dynamic_layout_data(slug)`
    }
];

export default function ControllersPage() {
    return (
        <main className="flex-1 flex flex-col gap-5 pt-5 pb-10 text-white/80">
            <h1 className="text-2xl font-bold">Les Contrôleurs</h1>
            
            <Mark>
                Un contrôleur est simplement un fichier <code className="text-[#A9FFEA]">controller.py</code> qui gère les requêtes de votre application. Il en existe trois types : <code className="text-[#A9FFEA]">HTTP</code> pour les requêtes web classiques, <code className="text-[#A9FFEA]">WEBSOCKET</code> pour le temps réel, et <code className="text-[#A9FFEA]">TEMPLATE</code> pour vos vues. Petit conseil important : écrivez toujours vos fonctions de contrôleur en MAJUSCULES !
            </Mark>

            <h2 className="text-xl font-bold">Routes Statiques : Les Bases </h2>

            <p className="text-base font-light">
                Une route statique, c&apos;est comme une adresse fixe - par exemple <code className="text-[#A9FFEA] bg-[#A9FFEA]/5 border border-[#A9FFEA]/5 px-2 py-1 rounded-md">/</code> ou <code className="text-[#A9FFEA] bg-[#A9FFEA]/5 border border-[#A9FFEA]/5 px-2 py-1 rounded-md">/contact</code>. Son contrôleur vit dans un fichier controller.py bien rangé dans son dossier.
            </p>
            
            <CodeBlock
                copyButton={false}
                language="shell"
                code={`📁 MonProjet/\n├── 📁 app/\n│   ├── 📄 controller.py  # Pour la route /\n│   ├── 📄 service.py    # Services \n│   ├── 📁 blog/\n│   │   ├── 📄 controller.py  # Pour /blog\n│   │   ├── 📄 service.py    # Services du blog`}
            />

            <h2 className="text-xl font-bold">Le Contrôleur HTTP : Votre Boîte à Outils Web </h2>

            <Mark>
                Le contrôleur HTTP est comme un chef d&apos;orchestre qui dirige le trafic web avec ses méthodes :
                <code className="text-[#A9FFEA]"> GET</code> (lecture),
                <code className="text-[#A9FFEA]"> POST</code> (création),
                <code className="text-[#A9FFEA]"> PUT</code> (mise à jour complète),
                <code className="text-[#A9FFEA]"> DELETE</code> (suppression),
                <code className="text-[#A9FFEA]"> PATCH</code> (mise à jour partielle),
                <code className="text-[#A9FFEA]"> HEAD</code> (vérification),
                <code className="text-[#A9FFEA]"> OPTIONS</code> (informations),
                <code className="text-[#A9FFEA]"> TRACE</code> (débogage).
            </Mark>

            {HTTP_CONTROLLER.map(({ method, description, code }) => (
                <article key={method} className="flex flex-col gap-4 my-6">
                    <h2 className="text-xl font-bold">{method}</h2>
                    <p className="text-base font-light mb-10">{description}</p>
                    <CodeBlock
                        language="python"
                        code={code}
                    />
                </article>
            ))}

            <h2 className="text-xl font-bold">Le Contrôleur WebSocket : Communication en Temps Réel </h2>

            <Mark>
                Les WebSockets, c&apos;est la magie du temps réel ! Avec la méthode <code className="text-[#A9FFEA]">SOCKET</code>, créez des applications interactives qui réagissent instantanément.
            </Mark>

            {WEBSOCKET_CONTROLLER.map(({ method, description, code }) => (
                <article key={method} className="flex flex-col gap-4 my-6">
                    <h2 className="text-xl font-bold">{method}</h2>
                    <p className="text-base font-light mb-10">{description}</p>
                    <CodeBlock
                        language="python"
                        code={code}
                    />
                </article>
            ))}

            <h2 className="text-xl font-bold">Le Contrôleur Template : L&apos;Art de la Présentation </h2>

            <Mark>
                Les templates donnent vie à votre interface avec deux méthodes magiques : <code className="text-[#A9FFEA]">VIEW</code> pour vos pages et <code className="text-[#A9FFEA]">LAYOUT</code> pour la structure globale.
            </Mark>

            {TEMPLATE_CONTROLLER.map(({ method, description, code }) => (
                <article key={method} className="flex flex-col gap-4 my-6">
                    <h2 className="text-xl font-bold">{method}</h2>
                    <p className="text-base font-light mb-10">{description}</p>
                    <CodeBlock
                        language="python"
                        code={code}
                    />
                </article>
            ))}

            <h2 className="text-xl font-bold">Routes Dynamiques : La Flexibilité en Action </h2>
            
            <p className="text-base font-light">
                Les routes dynamiques sont comme des variables dans votre URL ! Par exemple : <code className="text-[#A9FFEA] bg-[#A9FFEA]/5 border border-[#A9FFEA]/5 px-2 py-1 rounded-md">/utilisateurs/alice</code> ou <code className="text-[#A9FFEA] bg-[#A9FFEA]/5 border border-[#A9FFEA]/5 px-2 py-1 rounded-md">/produits/42</code>. Elles s&apos;adaptent à vos besoins !
            </p>

            <CodeBlock
                copyButton={false}
                language="shell"
                code={`📁 MonProjet/\n├── 📁 app/\n│   ├── 📁 [slug]/\n│   │   ├── 📄 controller.py\n│   │   └── 📄 service.py\n│   └── 📁 produits/\n│       └── 📁 [id]/\n│           ├── 📄 controller.py\n│           └── 📄 service.py`}
            />

            {DYNAMIC_CONTROLLER.map(({ method, description, code }) => (
                <article key={method} className="flex flex-col gap-4 my-6">
                    <h2 className="text-xl font-bold">{method}</h2>
                    <p className="text-base font-light mb-10">{description}</p>
                    <CodeBlock
                        language="python"
                        code={code}
                    />
                </article>
            ))}

            <h2 className="text-xl font-bold">WebSockets Dynamiques : Communication Personnalisée </h2>

            {WEBSOCKET_CONTROLLER_DYNAMIC.map(({ method, description, code }) => (
                <article key={method} className="flex flex-col gap-4 my-6">
                    <h2 className="text-xl font-bold">{method}</h2>
                    <p className="text-base font-light mb-10">{description}</p>
                    <CodeBlock
                        language="python"
                        code={code}
                    />
                </article>
            ))}

            <h2 className="text-xl font-bold">Templates Dynamiques : Interfaces Sur Mesure </h2>

            {TEMPLATE_CONTROLLER_DYNAMIC.map(({ method, description, code }) => (
                <article key={method} className="flex flex-col gap-4 my-6">
                    <h2 className="text-xl font-bold">{method}</h2>
                    <p className="text-base font-light mb-10">{description}</p>
                    <CodeBlock
                        language="python"
                        code={code}
                    />
                </article>
            ))}

            <p className="text-base font-light">
                Bravo ! 🎉 Vous venez de découvrir la puissance des contrôleurs Nexy. Rappelez-vous : les fonctions en MAJUSCULES, des routes bien organisées, et vous voilà prêt à créer des applications web incroyables ! Continuez votre voyage dans la documentation pour devenir un véritable maître de Nexy. 🚀
            </p>

            <div className="flex gap-5 justify-between mt-5">
                <Link href="/docs/started/structures" className={`cursor-pointer px-4 py-2 text-sm text-left font-normal rounded-[12px] bg-[#A9FFEA]/2.5 border border-[#A9FFEA]/5 text-[#A9FFEA]`}>
                ← Structure du projet
                </Link>

                <Link href="/docs/started/reponses" className={`cursor-pointer px-4 py-2 text-sm text-left font-normal rounded-[12px] bg-[#A9FFEA]/20 border border-[#A9FFEA]/25 text-[#A9FFEA]`}>
                Réponses → 
                </Link>
            </div>
        </main>
    );
}
