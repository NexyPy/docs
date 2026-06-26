# Manipuladores de rota (API)

Um manipulador de rota é um arquivo `.py` em `src/routes/` que expõe um endpoint de API. Ao contrário das páginas (`.nexy` / `.mdx`), os manipuladores retornam JSON ou dados brutos.

---

## Criando um manipulador
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

Nexy mapeia nomes de funções para métodos HTTP: `GET` , `POST`, `PUT`, `PATCH`, `DELETE`.

---

## Métodos HTTP disponíveis

Defina uma função por método em um único arquivo:
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

Cada função corresponde a `GET`, `POST`, `DELETE` em `/api/items`.

---

## Corpo da solicitação
{% raw %}```python
# routes/api/users.py
from pydantic import BaseModel

class CreateUser(BaseModel):
    name: str
    email: str

async def POST(request: Request, body: CreateUser):
    return {"name": body.name, "email": body.email}
```{% endraw %}
FastAPI valida o corpo automaticamente – retorna 422 em entrada inválida.

---

## Códigos de status

Retorne um `status_code` com `JSONResponse`:
{% raw %}```python
from fastapi.responses import JSONResponse

async def POST(request: Request):
    return JSONResponse({"created": True}, status_code=201)
```{% endraw %}
---

## Parâmetros de rota
{% raw %}```python
# routes/api/users/[id].py
from fastapi import Request

async def GET(request: Request, id: int):
    return {"user_id": id}
```{% endraw %}
Segmentos dinâmicos (`[id]`) são injetados como argumentos de palavras-chave com conversão automática de tipo.

---

## Dependências

`Depends`, `Header`, `Query`, `Cookie` do FastAPI funcionam nativamente:
{% raw %}```python
from fastapi import Depends, Header, Query

def get_db():
    return {"connection": "ok"}

async def GET(request: Request, db=Depends(get_db), x_api_key: str = Header(None)):
    return {"db": db, "api_key": x_api_key}
```{% endraw %}
---

## Respostas

| Tipo de retorno | Resposta |
|------------|----------|
| `dict` | `application/json` |
| `list` | `application/json` |
| `str` | `text/plain` |
| `BaseModel` | `application/json` |
| `Response` | Personalizado (qualquer) |
| `None` | `200 OK` vazio |

---

## Melhores práticas

- Um arquivo `.py` = um caminho de rota
- Use nomes de funções que correspondam aos métodos HTTP (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`)
- Use modelos Pydantic para validação de solicitações
- Use `JSONResponse` para códigos de status personalizados
- Para mutações acionadas pelo cliente, consulte [Actions](/docs/guides/actions)