# Parámetros de consulta

Los parámetros de consulta son los pares `?key=value` en una URL. Nexy los expone a través de `useSearchParams()` en frontmatter, o `request.query_params` en un controlador.

---

## En una página `.nexy`
{% raw %}```nexy
---
from nexy import useSearchParams
params = useSearchParams()
search = params.get("q", "")
page = int(params.get("page", "1"))
---
<h1>Results for: {{ search }}</h1>
<p>Page {{ page }}</p>
```{% endraw %}
El objeto `params` se comporta como un diccionario: `.get(key, default)`, `.keys()`, `.items()`.

---

## En un controlador `.py`
{% raw %}```python
# routes/search.py
from fastapi import Request

async def get(request: Request, q: str = "", page: int = 1):
    results = search_database(q, page=page)
    return {"results": results, "page": page}
```{% endraw %}
FastAPI resuelve automáticamente los parámetros de consulta escritos.

---

## Parámetros de la página actual

Esta página utiliza `useSearchParams()` en su portada. Los parámetros de consulta actuales son:
{% raw %}```json
{{ params | safe }}
```{% endraw %}
---

## Mejores prácticas

- Utilice `useSearchParams()` en componentes `.nexy` para páginas renderizadas en el servidor.
- Utilice `request.query_params` en `.py` controladores para API
- Los valores siempre son cadenas: convierta con `int()`, `bool()`, etc.
{% call Link(href="/docs/components") %}Next: Views →{% endcall %}