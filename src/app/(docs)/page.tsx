import { CodeBlock } from "@/components/CodeBlock";
import Mark from "@/components/Mark";
import { Nexy } from "@/components/svg/nexy";
import Link from "next/link";

export default function DocsPage() {
    return (
        <main className="flex-1 flex flex-col gap-5 pt-5 pb-10 text-white/80">
            <p className="mb-4"><Nexy /></p>
            <Mark>
                Imaginez un monde où chaque ligne de code Python se transforme en une mélodie d&apos;efficacité. Un univers où la puissance de FastAPI rencontre l&apos;élégance du routing Next.js, créant une symphonie parfaite entre performance et simplicité. Cette vision n&apos;est plus un rêve. Bienvenue dans une nouvelle ère d&apos;excellence du développement web en Python, où chaque projet devient une aventure captivante et ultra-productive.
            </Mark>
            <h1 className="text-2xl font-bold">Introduction</h1>
            <h3 className="text-lg font-medium">Le Contexte</h3>
            <p className="text-base font-light">
                Dans le vaste univers du développement web en Python, les solutions se situent souvent à l&apos;une de deux extrémités :
            </p>
            <ul className="list-none">
                <li className="text-base font-light before:content-['①'] before:mr-2 before:text-[#37FCCB] before:text-sm">
                    Des frameworks complets et puissants comme <span className="font-normal text-[#37FCCB]">Django</span>, dont la richesse se traduit parfois par une complexité qui freine l&apos;innovation.
                </li>
                <li className="text-base font-light before:content-['②'] before:mr-2 before:text-[#37FCCB] before:text-sm">
                    Des micro-frameworks agiles, à l&apos;image de <span className="font-normal text-[#37FCCB]">Flask</span>, qui, malgré leur flexibilité, imposent une configuration répétitive et chronophage.
                </li>
            </ul>

            <p className="text-base font-light">
                <span className="font-normal text-[#37FCCB]">FastAPI</span> a certes révolutionné l&apos;écosystème avec des performances inégalées et un typage moderne, mais le chemin reste semé d&apos;embûches :
            </p>
            <ul className="flex flex-col gap-2">
                <li className="text-base font-light before:content-['①'] before:mr-2 before:text-[#37FCCB]">
                    Une organisation de projets qui se complexifie au fil de la croissance.
                </li>
                <li className="text-base font-light before:content-['②'] before:mr-2 before:text-[#37FCCB]">
                    Des configurations de routes répétitives, qui grignotent un temps précieux.
                </li>
                <li className="text-base font-light before:content-['③'] before:mr-2 before:text-[#37FCCB]">
                    Des conventions de développement souvent floues, freinant une harmonisation optimale du code.
                </li>
                <li className="text-base font-light before:content-['④'] before:mr-2 before:text-[#37FCCB]">
                    Une gestion de l&apos;interface utilisateur qui demeure un défi pour maintenir l&apos;agilité et l&apos;innovation.
                </li>
            </ul>

            <p className="text-base font-light">
                C&apos;est dans ce contexte que <span className="font-normal text-[#37FCCB]">Nexy</span> fait son entrée, prêt à redéfinir les standards du développement web en Python. Nexy combine le meilleur des mondes : l&apos;efficacité et la robustesse de frameworks établis avec une simplicité et une flexibilité qui libèrent véritablement la créativité. Préparez-vous à transformer vos défis en opportunités et à redécouvrir le plaisir d&apos;innover sans compromis.
            </p>

            <h3 className="text-lg font-medium">La Vision de Nexy</h3>

            <article className="space-y-6">
                <Mark>
                    <span className="font-normal text-[#37FCCB]">Nexy</span> est né d&apos;une réflexion profonde sur l&apos;évolution des frameworks Python. Python brille par sa simplicité, sa puissance et son écosystème riche, mais dans le paysage actuel, <span className="font-normal text-[#37FCCB]">Django</span> s&apos;impose presque comme un monopole, laissant peu de place à des alternatives comme <span className="font-normal text-[#37FCCB]">Flask</span> ou <span className="font-normal text-[#37FCCB]">FastAPI</span>. Est-ce uniquement une question de popularité, ou simplement parce qu&apos;aucun autre framework n&apos;offre une solution aussi complète pour le développement web moderne ?
                </Mark>

                <p className="text-base font-light">
                    <span className="font-normal text-[#37FCCB]">Django</span> possède des fonctionnalités impressionnantes, mais sa complexité et sa lourdeur peuvent devenir un obstacle, surtout pour des projets qui n’ont pas besoin d’une telle infrastructure. Cela pose une question essentielle : pourquoi ne pas créer un framework inspiré des meilleures pratiques modernes comme dans <span className="text-yellow-300">«</span> <span className="text-yellow-300 ">Next.js</span>, <span className="text-yellow-300 ">NestJS</span> ou <span className="text-yellow-300 ">AdonisJS</span> <span className="text-yellow-300">»</span> tout en préservant la simplicité et l&apos;élégance de Python ?
                </p>

                <Mark>
                    C&apos;est cette vision qui a donné naissance à <span className="font-normal text-[#37FCCB]">Nexy</span>. Pensé pour offrir une expérience développeur fluide et efficace, Nexy allie la puissance asynchrone de FastAPI à une structure modulaire intuitive, réduisant la configuration au strict minimum et simplifiant la maintenance. Il transforme la complexité des configurations lourdes en une opportunité d&apos;innovation, en restant fidèle à l&apos;essence même de Python : <span className="font-normal text-[#37FCCB]"> simple</span>, <span className="font-normal text-[#37FCCB]">performant</span> et <span className="font-normal text-[#37FCCB]">élégant</span>.
                </Mark>

                <p className="text-base font-light">
                    Avec <span className="font-normal text-[#37FCCB]">Nexy</span>, vous choisissez un framework qui redéfinit les standards du développement web en Python. Concentrez-vous sur votre logique métier, sans vous laisser freiner par des contraintes techniques inutiles.
                </p>
            </article>

            <h3 className="text-lg font-medium">Nos principes :</h3>
            <ul className="list-none">
                <li className="text-base font-light before:content-['①'] before:mr-2 before:text-[#37FCCB]">
                    <span className="font-normal text-[#37FCCB]">Convention over Configuration</span> : Adoptez des standards éprouvés dès la base.
                </li>
                <li className="text-base font-light before:content-['②'] before:mr-2 before:text-[#37FCCB]">
                    <span className="font-normal text-[#37FCCB]">Intuitivité</span> : Une structure naturelle, où tout se découvre sans effort.
                </li>
                <li className="text-base font-light before:content-['③'] before:mr-2 before:text-[#37FCCB]">
                    <span className="font-normal text-[#37FCCB]">Productivité</span> : Réduisez le code répétitif pour maximiser vos fonctionnalités.
                </li>
                <li className="text-base font-light before:content-['④'] before:mr-2 before:text-[#37FCCB]">
                    <span className="font-normal text-[#37FCCB]">Évolutivité</span> : Du projet minimaliste à l&apos;application d&apos;entreprise, Nexy grandit avec vous.
                </li>
            </ul>

            <h3 className="text-lg font-medium">Pourquoi Nexy ?</h3>

            <ul className="list-none space-y-5">
                <li className="text-base font-light before:content-['①'] before:mr-2 before:text-[#37FCCB]">
                    <Mark><span className="font-normal text-[#37FCCB]">Débutants</span> : Démarrez avec une approche fluide et intuitive, sans complexité superflue, pour apprendre Python et le développement web rapidement.</Mark>
                </li>
                <li className="text-base font-light before:content-['②'] before:mr-2 before:text-[#37FCCB]">
                    <Mark><span className="font-normal text-[#37FCCB]">Experts</span> : Exploitez une architecture modulaire et performante, combinant la puissance de FastAPI et la simplicité d&apos;un routage intelligent pour des projets de grande envergure.</Mark>
                </li>
                <li className="text-base font-light before:content-['③'] before:mr-2 before:text-[#37FCCB]">
                    <Mark><span className="font-normal text-[#37FCCB]">Tous les développeurs</span> : Profitez d&apos;un framework conçu pour maximiser la productivité, avec un code clair, réactif et élégant.</Mark>
                </li>
                <li className="text-base font-light before:content-['④'] before:mr-2 before:text-[#37FCCB]">
                    <Mark>
                        <span className="font-normal text-[#37FCCB]">Nexy</span>, c&apos;est bien plus qu&apos;un simple framework : c&apos;est une expérience de développement <span className="font-normal text-[#37FCCB]">fluide</span>, <span className="font-normal text-[#37FCCB]"> performante</span> et <span className="font-normal text-[#37FCCB]">intuitive</span>. Libérez votre <span className="font-normal text-[#37FCCB]">créativité</span>, <span className="font-normal text-[#37FCCB]"> boostez</span> votre productivité et redécouvrez le plaisir d&apos;écrire du code <span className="font-normal text-[#37FCCB]">efficace</span> et <span className="font-normal text-[#37FCCB]">élégant</span>.
                    </Mark>
                </li>
            </ul>

            <h3 className="text-lg font-medium">Nexy : L&apos;Aube d&apos;une Révolution</h3>

            <Mark>
                <span className="font-normal text-[#37FCCB]">Espoir Loém, </span>créateur de Nexy :<br /><br />
                <span className="font-normal text-[#37FCCB]">« <br /></span>
                Après des années à observer l&apos;écosystème Python et ses frameworks, j&apos;ai eu une révélation :<br />
                nous pouvions faire tellement mieux.<br /><br />
                Dans notre communauté technique, <span className="font-normal text-[#37FCCB]">Django</span> est un excellent outil qui a fait ses preuves, mais il est temps d&apos;innover pour répondre aux besoins modernes.<br /><br />
                Je voyais de nombreux développeurs talentueux limités par des outils qui ne correspondaient plus à leurs attentes. Les fondations étaient solides, mais l&apos;expérience développeur méritait d&apos;être repensée.<br /><br />
                C&apos;est ainsi qu&apos;est né Nexy, une nouvelle vision du développement web en Python. Notre objectif n&apos;était pas simplement d&apos;ajouter une couche d&apos;abstraction, mais de repenser l&apos;expérience complète du développeur.<br /><br />
                Pourquoi devrions-nous choisir entre performance et simplicité ?<br /><br />
                Python est un langage élégant et expressif. Il mérite des outils qui préservent sa clarté naturelle, plutôt que de la noyer dans des structures complexes.<br /><br />
                Nexy incarne cette philosophie : rendre le développement web en Python aussi naturel et fluide que possible, à travers une évolution réfléchie de nos pratiques.<br /><br />
                <span className="font-normal text-[#37FCCB]"> »</span>
            </Mark>

            <h1 className="text-2xl font-bold">Exemple de Code</h1>

            <h3 className="text-lg font-medium">Controller</h3>
            <CodeBlock
                language="python"
                code={`# app/controller.py

def GET():
    return {"Get": "Hello World"}

async def POST():
    return {"Post": "Hello New Post"}

async def PUT():
    return {"Put": "Hello Updated Post"}

`}
            />

            <h3 className="text-lg font-medium">Sockets</h3>
            <CodeBlock
                language="python"
                code={`# app/controller.py
from nexy import WebSocket

async def socket(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Message received: {data}")
`}
            />


            <h3 className="text-lg font-medium">Actions Serveur</h3>
            <CodeBlock
                language="python"
                code={`# app/actions.py
from nexy import action

@action()
async def delete_post(id: int):
    return {"Delete": "Hello Deleted Post"}

@action()
async def update_post(id: int, post: Post):
    return {"Update": "Hello Updated Post"}

`}
            />



            <h3 className="text-lg font-medium">Composants</h3>
            <CodeBlock
                language="python"
                code={`# components/__init__.py
from nexy import Component
@component(
  imports=[]
)
def Button(label: str, on_click: Callable = None):
    return {
        "label": label,
        "on_click": on_click,
    }
`}
            />

            <CodeBlock
                language="html"
                code={`<!-- components/Button.html -->
<button onclick="{{use(on_click)}}"  >{{label}}</button>`}
            />

            <p className="text-sm">
                Une Architecture Qui Respecte Votre Intelligence 🧠
                <br /><br />
                Un framework doit vous faire gagner du temps, pas vous en faire perdre.
            </p>

            <p className="text-sm">
                Actions Serveur : La Réalité, Pas Les Promesses 🎭
                <br />
                Oui, on utilise encore JavaScript en 2024. Mais on peut le faire intelligemment :
            </p>

            <p className="text-sm">
                Démarrage : Aussi Simple Que Prévu ⚡
            </p>

            <p className="text-sm">
                Nexy est encore jeune, mais il a déjà un objectif clair : vous laisser coder en Python, proprement, sans vous prendre la tête.
                <br />
                Envie de contribuer à un framework qui respecte ses développeurs ? Rejoignez l&apos;aventure !
            </p>

            <p className="text-sm italic">
                Nexy : Parce que le développement web en Python méritait mieux que des compromis constants.
            </p>

            <div className="flex  gap-5 justify-between mt-5">
                <Link href="#" className={`cursor-pointer px-4 py-2 text-sm text-left font-normal  rounded-[12px]  bg-[#A9FFEA]/2.5 border border-[#A9FFEA]/5 text-[#A9FFEA] `}>
                ← Contribuer à Nexy
                </Link>

                <Link href="/new_project" className={`cursor-pointer px-4 py-2 text-sm text-left font-normal  rounded-[12px]  bg-[#A9FFEA]/20 border border-[#A9FFEA]/25 text-[#A9FFEA] `}>
                    Créer un nouveau projet →
                </Link>

            </div>
        </main>
    );
}