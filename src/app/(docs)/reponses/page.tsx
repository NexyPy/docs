import { CodeBlock } from "@/components/CodeBlock";
import Mark from "@/components/Mark";
import Link from "next/link";

export default function ResponsesPage() {
    return (
        <main className="flex-1 flex flex-col gap-5 pt-5 pb-10 text-white/80">
            <h1 className="text-2xl font-bold">Gestion des Réponses HTTP avec Nexy</h1>

            <Mark>
                Nexy, construit sur FastAPI, offre une gestion avancée des réponses HTTP. Il permet d'utiliser toutes les réponses standard de FastAPI tout en ajoutant des fonctionnalités supplémentaires via le décorateur <code>@HTTPResponse</code>. Ce décorateur simplifie la personnalisation des réponses en encapsulant la logique de réponse dans une fonction unique.
            </Mark>

            <h2 className="text-xl font-semibold mt-4">Introduction aux Réponses HTTP</h2>
            <p className="text-base font-light">
                Les réponses HTTP sont essentielles pour la communication entre le client et le serveur. Elles permettent de transmettre des données, des statuts et des en-têtes. Nexy hérite de la flexibilité de FastAPI tout en introduisant des simplifications pour une gestion plus intuitive des réponses.
            </p>

            <h2 className="text-xl font-semibold mt-6">Utilisation de la Classe Response</h2>
            <p className="text-base font-light">
                La classe <code className="text-[#A9FFEA] bg-[#A9FFEA]/5 border border-[#A9FFEA]/5 px-2 py-1 rounded-md">Response</code> de Nexy étend celle de FastAPI, permettant une personnalisation facile des réponses :
            </p>
            <CodeBlock
                language="python"
                code={`from nexy import Response

def GET():
    return Response(
        content={"message": "Hello World"},
        status_code=200,
        headers={"X-Custom-Header": "value"}
    )`}
            />

            <h2 className="text-xl font-semibold mt-6">Réponses Standard de FastAPI</h2>
            <p className="text-base font-light">
                Nexy supporte toutes les réponses standard de FastAPI, telles que JSONResponse, HTMLResponse, et plus encore :
            </p>
            <CodeBlock
                language="python"
                code={`from fastapi.responses import (
    JSONResponse,
    HTMLResponse, 
    PlainTextResponse,
    RedirectResponse,
    StreamingResponse,
    FileResponse
)`}
            />

            <h2 className="text-xl font-semibold mt-6">Personnalisation des Réponses avec HTTPResponse</h2>
            <Mark>
                Le décorateur <code>@HTTPResponse</code> de Nexy permet de personnaliser les réponses de manière élégante et efficace. Il encapsule la logique de réponse et offre une flexibilité accrue.
            </Mark>
            <CodeBlock
                language="python"
                code={`from nexy import HTTPResponse
from typing import Any

class CustomJSONResponse(Response):
    media_type = "application/json"
    
    def render(self, content: Any) -> bytes:
        # Logique de rendu personnalisée
        return json.dumps(
            {"data": content, "timestamp": datetime.now().isoformat()}
        ).encode("utf-8")

@HTTPResponse(type=CustomJSONResponse)
def GET():
    return {"message": "Hello"}`}
            />

            <h2 className="text-xl font-semibold mt-4">HTMLResponse avec et sans Décorateur</h2>
            <h3 className="text-lg font-medium mt-4">Avec Décorateur</h3>
            <p className="text-base font-light">
                Utiliser le décorateur <code>@HTTPResponse</code> pour enrichir votre endpoint avec une validation et une documentation automatiques :
            </p>
            <CodeBlock
                language="python"
                code={`from nexy import HTTPResponse
from fastapi.responses import HTMLResponse

@HTTPResponse(
    type=HTMLResponse,
    response_map={
        200: {"description": "Page HTML réussie"},
        404: {"description": "Template non trouvé"}
    }
)
def GET():
    return """
        <html>
            <body>
                <h1>Bienvenue</h1>
            </body>
        </html>
    """`}
            />

            <p className="text-base font-light mt-4">
                Avantages du décorateur :
            </p>
            <ul className="list-disc list-inside text-base font-light ml-4 space-y-2">
                <li>Documentation OpenAPI/Swagger automatique</li>
                <li>Validation stricte du type de contenu</li>
                <li>Gestion standardisée des erreurs</li>
                <li>Meilleure maintenabilité du code</li>
            </ul>

            <h3 className="text-lg font-medium mt-4">Sans Décorateur</h3>
            <p className="text-base font-light">
                Approche directe pour des cas simples :
            </p>
            <CodeBlock
                language="python"
                code={`from fastapi.responses import HTMLResponse

def GET():
    html_content = """
        <html>
            <body>
                <h1>Bienvenue</h1>
            </body>
        </html>
    """
    return HTMLResponse(
        content=html_content,
        status_code=200
    )`}
            />

            <h2 className="text-xl font-semibold mt-6">JSONResponse avec et sans Décorateur</h2>
            <Mark>
                La réponse JSON est le format privilégié pour les API RESTful. Nexy facilite sa manipulation grâce à l'intégration native de Pydantic.
            </Mark>

            <h3 className="text-lg font-medium mt-4">Avec Décorateur</h3>
            <CodeBlock
                language="python"
                code={`from nexy import HTTPResponse
from pydantic import BaseModel, EmailStr

class UserModel(BaseModel):
    id: int
    name: str
    email: EmailStr

@HTTPResponse(
    model=UserModel,
    model_exclude={"password"},
    model_by_alias=True,
    response_map={
        200: {"description": "Utilisateur trouvé"},
        404: {"description": "Utilisateur non trouvé"}
    }
)
def GET(user_id: int):
    return {
        "id": user_id,
        "name": "John Doe",
        "email": "john@example.com"
    }`}
            />

            <h3 className="text-lg font-medium mt-4">Sans Décorateur</h3>
            <CodeBlock
                language="python"
                code={`from fastapi.responses import JSONResponse

def GET(user_id: int):
    user_data = {
        "id": user_id,
        "name": "John Doe",
        "email": "john@example.com"
    }
    return JSONResponse(
        content=user_data,
        status_code=200
    )`}
            />

            <h2 className="text-xl font-semibold mt-6">StreamingResponse avec et sans Décorateur</h2>
            <h3 className="text-lg font-medium mt-4">Avec Décorateur</h3>
            <CodeBlock
                language="python"
                code={`from nexy import HTTPResponse
from fastapi.responses import StreamingResponse

@HTTPResponse(
    type=StreamingResponse,
    response_map={
        200: {"description": "Flux de données"},
        503: {"description": "Service indisponible"}
    }
)
async def GET():
    async def generate():
        for i in range(10):
            yield f"data: {i}\\n\\n"
            await asyncio.sleep(1)
    
    return generate()`}
            />

            <h3 className="text-lg font-medium mt-4">Sans Décorateur</h3>
            <CodeBlock
                language="python"
                code={`from fastapi.responses import StreamingResponse

async def GET():
    async def generate():
        for i in range(10):
            yield f"data: {i}\\n\\n"
            await asyncio.sleep(1)
    
    return StreamingResponse(
        generate(),
        media_type="text/event-stream"
    )`}
            />

            <h2 className="text-xl font-semibold mt-6">Gestion des Erreurs</h2>
            <p className="text-base font-light">
                Nexy fournit des réponses d'erreur standardisées :
            </p>
            <CodeBlock
                language="python"
                code={`from nexy import HTTPException, Response

def GET(item_id: int):
    if not item_exists(item_id):
        raise HTTPException(
            status_code=404,
            detail="Item non trouvé",
            headers={"X-Error-Code": "ITEM_NOT_FOUND"}
        )
    return Response(content=get_item(item_id))`}
            />

            <h2 className="text-xl font-semibold mt-6">Meilleures Pratiques pour les Réponses HTTP</h2>
            <p className="text-base font-light">
                Lors de la conception de vos API avec Nexy, gardez à l'esprit les meilleures pratiques suivantes :
            </p>
            <ul className="list-disc list-inside text-base font-light ml-4 space-y-2">
                <li>Utilisez des codes de statut HTTP appropriés pour indiquer le résultat de l'opération.</li>
                <li>Fournissez des messages d'erreur clairs et concis pour aider les développeurs à comprendre les problèmes.</li>
                <li>Utilisez des en-têtes HTTP pour transmettre des métadonnées importantes.</li>
                <li>Assurez-vous que vos réponses sont sécurisées et ne divulguent pas d'informations sensibles.</li>
            </ul>

            <div className="flex gap-5 justify-between mt-8">
                <Link href="/controllers" className={`cursor-pointer px-4 py-2 text-sm text-left font-normal rounded-[12px] bg-[#A9FFEA]/2.5 border border-[#A9FFEA]/5 text-[#A9FFEA]`}>
                    ← Controllers
                </Link>
                <Link href="/views" className={`cursor-pointer px-4 py-2 text-sm text-left font-normal rounded-[12px] bg-[#A9FFEA]/20 border border-[#A9FFEA]/25 text-[#A9FFEA]`}>
                    Views →
                </Link>
            </div>
        </main>
    );
}
