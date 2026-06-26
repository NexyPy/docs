# Controladores de ruta (API)

Un controlador de ruta es un archivo `.py` en `src/routes/` que expone un punto final de API. A diferencia de las páginas (`.nexy` / `.mdx`), los controladores devuelven JSON o datos sin procesar.

---

## Creando un controlador
{% raw %}```bash
routes/
└── api/
    └── hello.py           →  GET /api/hello
```{% endraw %}
{% raw %}```python
# api/hello.py
from fastapi import Request

async def GET(request: Request):
    return {"message": "Hello from Nexy!"}
```{% endraw %}

Nexy asigna nombres de funciones a métodos HTTP: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.

---

## Métodos HTTP disponibles

Defina una función por método en un solo archivo:
{% raw %}```python
# routes/api/items.py
from fastapi import Request

async def GET(request: Request):
    return {"items": []}

async def POST(request: Request):
    data = await request.json()
    return {"created": data}

async def DELETE(request: Request, id: int):
    return {"deleted": id}
```{% endraw %}

Cada función corresponde a `GET`, `POST`, `DELETE` en `/api/items`.

---

## Cuerpo de la solicitud
{% raw %}```python
# routes/api/users.py
from pydantic import BaseModel

class CreateUser(BaseModel):
    name: str
    email: str

async def POST(request: Request, body: CreateUser):
    return {"name": body.name, "email": body.email}
```{% endraw %}
FastAPI valida el cuerpo automáticamente: devuelve 422 en caso de entrada no válida.

---

## Códigos de estado

Devuelve un `status_code` con `JSONResponse`:
{% raw %}```python
from fastapi.responses import JSONResponse

async def POST(request: Request):
    return JSONResponse({"created": True}, status_code=201)
```{% endraw %}
---

## Parámetros de ruta
{% raw %}```python
# routes/api/users/[id].py
from fastapi import Request

async def GET(request: Request, id: int):
    return {"user_id": id}
```{% endraw %}
Los segmentos dinámicos (`[id]`) se inyectan como argumentos de palabras clave con conversión de tipo automática.

---

## Dependencias

`Depends`, `Header`, `Query`, `Cookie` de FastAPI funcionan de forma nativa:
{% raw %}```python
from fastapi import Depends, Header, Query

def get_db():
    return {"connection": "ok"}

async def GET(request: Request, db=Depends(get_db), x_api_key: str = Header(None)):
    return {"db": db, "api_key": x_api_key}
```{% endraw %}
---

## Respuestas

| Tipo de devolución | Respuesta |
|-------------|----------|
| `dict` | `application/json` |
| `list` | `application/json` |
| `str` | `text/plain` |
| `BaseModel` | `application/json` |
| `Response` | Personalizado (cualquiera) |
| `None` | `200 OK` vacío |

---

## Mejores prácticas

- Un archivo `.py` = una ruta de ruta
- Utilice nombres de funciones que coincidan con los métodos HTTP (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`)
- Utilice modelos Pydantic para la validación de solicitudes.
- Utilice `JSONResponse` para códigos de estado personalizados
- Para mutaciones activadas por el cliente, consulte [Actions](/docs/guides/actions)