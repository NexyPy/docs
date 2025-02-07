import { CodeBlock } from "@/components/CodeBlock";
import Mark from "@/components/Mark";
import { Nexy } from "@/components/svg/nexy";
import Link from "next/link";


export default function DocsPage() {
  return (
    <main className="flex-1 flex flex-col gap-5 pt-5 pb-10 text-white/80">
      <p className="mb-4"><Nexy /></p>
      <Mark>
        Un framework Python moderne qui transforme le développement web en une expérience agréable et productive,
        construit sur la puissance de FastAPI.
      </Mark>
      <h1 className="text-2xl font-bold">Introduction</h1>
<h3 className="text-lg font-medium">Le Contexte</h3>
<p className="text-base font-light">
  Dans le monde du développement web en Python, les solutions se positionnent souvent à l’une de deux extrémités :
</p>
<ul className="list-none">
  <li className="text-base font-light before:content-['①'] before:mr-2 before:text-[#37FCCB] before:text-sm">
    Des frameworks complets et puissants comme <span className="font-normal text-[#37FCCB]">Django</span>, dont la richesse se traduit parfois par une complexité qui freine l’innovation.
  </li>
  <li className="text-base font-light before:content-['②'] before:mr-2 before:text-[#37FCCB] before:text-sm">
    Des micro-frameworks agiles, à l’image de <span className="font-normal text-[#37FCCB]">Flask</span>, qui, malgré leur flexibilité, imposent une configuration répétitive et chronophage.
  </li>
</ul>

<p className="text-base font-light">
  <span className="font-normal text-[#37FCCB]">FastAPI</span> a certes révolutionné l’écosystème avec des performances inégalées et un typage moderne, mais le chemin reste semé d’embûches :
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
    Une gestion de l’interface utilisateur qui demeure un défi pour maintenir l’agilité et l’innovation.
  </li>
</ul>

<p className="text-base font-light">
  C’est dans ce contexte que <span className="font-normal text-[#37FCCB]">Nexy</span> fait son entrée, prêt à redéfinir les standards du développement web en Python. Nexy combine le meilleur des mondes : 
  l’efficacité et la robustesse de frameworks établis avec une simplicité et une flexibilité qui libèrent véritablement la créativité. Préparez-vous à transformer vos défis en opportunités et à redécouvrir le plaisir d’innover sans compromis.
</p>


      <h3 className="text-lg font-medium">La Vision de Nexy</h3>

      <article className="space-y-6">
        <Mark>
          <span className="font-normal text-[#37FCCB]">Nexy</span>, conçu par <Link href={"#"} className="font-normal text-yellow-300">Espoir Loém <span className="text-md ">⇗</span></Link>, est né d’une réflexion profonde sur l’évolution des frameworks Python.
          Python brille par sa simplicité, sa puissance et son écosystème riche, mais dans le paysage actuel, <span className="font-normal text-[#37FCCB]">Django</span> s’impose presque comme un monopole,
          laissant peu de place à des alternatives comme <span className="font-normal text-[#37FCCB]">Flask</span> ou <span className="font-normal text-[#37FCCB]">FastAPI</span>. Est-ce uniquement une question de popularité, ou simplement parce qu’aucun autre framework n’offre une solution aussi complète
          pour le développement web moderne ?
        </Mark>
        

        <p className="text-base font-light">
          <span className="font-normal text-[#37FCCB]">Django</span> possède des fonctionnalités impressionnantes, mais sa complexité et sa lourdeur peuvent devenir un obstacle,
          surtout pour des projets qui n’ont pas besoin d’une telle infrastructure. Cela pose une question essentielle :
          pourquoi ne pas créer un framework inspiré des meilleures pratiques modernes comme dans <span className="text-yellow-300">«</span> <span className="text-yellow-300 ">Next.js</span>, <span className="text-yellow-300 ">NestJS</span> ou <span className="text-yellow-300 ">AdonisJS</span> <span className="text-yellow-300">»</span> tout en préservant la simplicité et l’élégance de Python ?
        </p>

        <Mark>
          C’est cette vision qui a donné naissance à <span className="font-normal text-[#37FCCB]">Nexy</span>.
          Pensé pour offrir une expérience développeur fluide et efficace, Nexy allie la puissance asynchrone de FastAPI à une structure modulaire intuitive,
          réduisant la configuration au strict minimum et simplifiant la maintenance.
          Il transforme la complexité des configurations lourdes en une opportunité d’innovation, en restant fidèle à l’essence même de Python :
          <span className="font-normal text-[#37FCCB]"> simple</span>, <span className="font-normal text-[#37FCCB]">performant</span> et <span className="font-normal text-[#37FCCB]">élégant</span>.
        </Mark>

        <p className="text-base font-light">
          Avec <span className="font-normal text-[#37FCCB]">Nexy</span>, vous choisissez un framework qui redéfinit les standards du développement web en Python.
          Concentrez-vous sur votre logique métier, sans vous laisser freiner par des contraintes techniques inutiles.
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
          <span className="font-normal text-[#37FCCB]">Évolutivité</span> : Du projet minimaliste à l’application d’entreprise, Nexy grandit avec vous.
        </li>
      </ul>

      <h3 className="text-lg font-medium">Pourquoi Nexy ?</h3>

      <ul className="list-none space-y-5">
        <li className="text-base font-light before:content-['①'] before:mr-2 before:text-[#37FCCB]">
          <Mark><span className="font-normal text-[#37FCCB]">Débutants</span> : Démarrez avec une approche fluide et intuitive, sans complexité superflue, pour apprendre Python et le développement web rapidement.</Mark>
        </li>
        <li className="text-base font-light before:content-['②'] before:mr-2 before:text-[#37FCCB]">
          <Mark><span className="font-normal text-[#37FCCB]">Experts</span> : Exploitez une architecture modulaire et performante, combinant la puissance de FastAPI et la simplicité d’un routage intelligent pour des projets de grande envergure.</Mark>
        </li>
        <li className="text-base font-light before:content-['③'] before:mr-2 before:text-[#37FCCB]">
          <Mark><span className="font-normal text-[#37FCCB]">Tous les développeurs</span> : Profitez d’un framework conçu pour maximiser la productivité, avec un code clair, réactif et élégant.</Mark>
        </li>
        <li className="text-base font-light before:content-['④'] before:mr-2 before:text-[#37FCCB]">
          <Mark>
            <span className="font-normal text-[#37FCCB]">Nexy</span>, c’est bien plus qu’un simple framework :
            c’est une expérience de développement <span className="font-normal text-[#37FCCB]">fluide</span>,
            <span className="font-normal text-[#37FCCB]"> performante</span> et <span className="font-normal text-[#37FCCB]">intuitive</span>.
            Libérez votre <span className="font-normal text-[#37FCCB]">créativité</span>,
            <span className="font-normal text-[#37FCCB]"> boostez</span> votre productivité et
            redécouvrez le plaisir d’écrire du code <span className="font-normal text-[#37FCCB]">efficace</span> et <span className="font-normal text-[#37FCCB]">élégant</span>.
          </Mark>
        </li>

      </ul>








      <p className="text-sm font-light italic tracking-wide bg-[#A9FFEA]/5 border-l border-[#A9FFEA] p-2 px-2.5">
        <Link href="#" className="font-normal text-amber-200">
          Espoir Loém
        </Link>
        , développeur fullstack, designer UI/UX & DX avec 10 ans d&apos;expérience dans la création de frameworks
      </p>


      <p className="text-sm">
        # La Dure Réalité du Développement Web Python en 2024
        <br /><br />
        Après avoir passé une décennie à développer des frameworks internes pour des entreprises, la frustration devient insupportable. Le développement web en Python est dans une impasse totale.
        <br /><br />
        Chaque jour, c&apos;est la même galère :
        <br /><br />
        - <strong>Django</strong> : Le tyran bienveillant qui vous force à utiliser son admin, son ORM, et 20 apps dont vous n&apos;avez pas besoin 🏰
        <br />
        - <strong>Flask</strong> : Le minimaliste toxique qui vous laisse réinventer la roue à chaque projet 🎪
        <br />
        - <strong>FastAPI</strong> : Le génie incompris qui vous donne des super-pouvoirs... mais pas de mode d&apos;emploi 🌪️
      </p>

      {/* <CodeBlock
        language="python"
        code={`# Django en 2024
INSTALLED_APPS = [
    'django.contrib.admin',  # Parce que TOUT projet a besoin d'un admin...
    'django.contrib.auth',   # ...et d'une auth complète...
    # ... 20 autres apps "essentielles"
]

# Flask après 30 jours
app = Flask(__name__)
db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()
cors = CORS()
# ... la config continue encore et encore

# FastAPI quelque part dans votre projet
@app.get("/api/v1/users/{user_id}/settings/preferences/theme")
async def get_user_theme_preferences(
    user_id: int,
    background: Optional[str] = None,
    # Où est la logique métier déjà ?
):
    pass`}
      /> */}

      <p className="text-sm">
        ## Nexy : La Solution Née de la Frustration 🎯
        <br /><br />
        J&apos;ai créé Nexy après avoir :
        <br />- Copié-collé la même config Flask sur 15 projets différents
        <br />- Désactivé les mêmes fonctionnalités Django sur chaque nouveau projet
        <br />- Réorganisé la même structure FastAPI pour la centième fois
      </p>

      <CodeBlock
        language="python"
        code={`# Nexy : Simple, sans être simpliste
@customResponse(type=HTMLResponse)
async def GET(id: int):
    return {"user": get_user(id)}

# Non, il n'y a pas de piège.
# - Le routing ? La structure des dossiers s'en occupe
# - Les templates ? Détectés automatiquement
# - L'API ? C'est le comportement par défaut en 2024`}
      />

      <p className="text-sm">
        ## Une Architecture Qui Respecte Votre Intelligence 🧠
        <br /><br />
        Parce qu&apos;en 2024, un framework devrait vous faire gagner du temps, pas vous en faire perdre.
      </p>

      {/* <CodeBlock
        language="plaintext"
        code={`app/
 ├── controller.py     # Une route = un fichier. Point.
 ├── view.html        # Du HTML ? Seulement si nécessaire
 ├── users/
 │   ├── controller.py # /users
 │   ├── [id]/        # Routing dynamique sans magie
 │       ├── controller.py
 │       ├── view.html`}
      /> */}

      <p className="text-sm">
        ## Actions Serveur : La Réalité, Pas Les Promesses 🎭
        <br /><br />
        Oui, on utilise encore JavaScript en 2024. Mais on peut le faire intelligemment :
      </p>

      {/* <CodeBlock
        language="html"
        code={`<!-- Le JavaScript est toujours là, mais il est plus malin -->
<button action="delete_user" data-id="{{user.id}}">
    Supprimer
</button>`}
      /> */}

      <p className="text-sm">
        ## Démarrage : Aussi Simple Que Prévu ⚡
      </p>

      {/* <CodeBlock
        language="shell"
        code={`pip install nexy
nexy new mon-projet
cd mon-projet
nexy dev  # Pas de migrate/makemigrations/collectstatic ici`}
      /> */}

      <p className="text-sm">
        Nexy est encore jeune, mais il a déjà un objectif clair : vous laisser coder en Python, proprement, sans vous prendre la tête.
        <br /><br />
        Envie de contribuer à un framework qui respecte ses développeurs ? Rejoignez l&apos;aventure !
      </p>

      <p className="text-sm italic">
        Nexy : Parce que le développement web en Python méritait mieux que des compromis constants.
      </p>
    </main>
  );
}