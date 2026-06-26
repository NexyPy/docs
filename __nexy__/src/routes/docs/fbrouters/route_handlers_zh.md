# Route Handlers (API)

A route handler is a `.py` file in `src/routes/` that exposes an API endpoint. Unlike pages (`.nexy` / `.mdx`), handlers return JSON or raw data.

---

## Creating a handler
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

Nexy maps function names to HTTP methods: `GET` , `POST`, `PUT`, `PATCH`, `DELETE`.

---

## Available HTTP methods

Define one function per method in a single file:
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

Each function corresponds to `GET`, `POST`, `DELETE` on `/api/items`.

---

## Request body
{% raw %}```python
# routes/api/users.py
from pydantic import BaseModel

class CreateUser(BaseModel):
    name: str
    email: str

async def POST(request: Request, body: CreateUser):
    return {"name": body.name, "email": body.email}
```{% endraw %}
FastAPI validates the body automatically — returns 422 on invalid input.

---

## Status codes

Return a `status_code` with `JSONResponse`:
{% raw %}```python
from fastapi.responses import JSONResponse

async def POST(request: Request):
    return JSONResponse({"created": True}, status_code=201)
```{% endraw %}
---

## Route parameters
{% raw %}```python
# routes/api/users/[id].py
from fastapi import Request

async def GET(request: Request, id: int):
    return {"user_id": id}
```{% endraw %}
Dynamic segments (`[id]`) are injected as keyword arguments with automatic type conversion.

---

## Dependencies

FastAPI's `Depends`, `Header`, `Query`, `Cookie` work natively:
{% raw %}```python
from fastapi import Depends, Header, Query

def get_db():
    return {"connection": "ok"}

async def GET(request: Request, db=Depends(get_db), x_api_key: str = Header(None)):
    return {"db": db, "api_key": x_api_key}
```{% endraw %}
---

## Responses

| Return type | Response |
|-------------|----------|
| `dict` | `application/json` |
| `list` | `application/json` |
| `str` | `text/plain` |
| `BaseModel` | `application/json` |
| `Response` | Custom (any) |
| `None` | `200 OK` empty |

---

## Best practices

- One `.py` file = one route path
- Use function names matching HTTP methods (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`)
- Use Pydantic models for request validation
- Use `JSONResponse` for custom status codes
- For client-triggered mutations, see [Actions](/docs/guides/actions)