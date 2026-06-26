# Dependencies

A `dependencies.py` file inside `src/routes/` collects common FastAPI dependencies that apply automatically to every route in the directory tree.

---

## `dependencies = [...]`

Define callables and list them in a module-level `dependencies` variable:
{% raw %}```python
# src/routes/dashboard/dependencies.py
from fastapi import Request, HTTPException

def get_db():
    return {"connection": "ok"}

def require_auth(request: Request):
    if not request.headers.get("Authorization"):
        raise HTTPException(status_code=401)

dependencies = [get_db, require_auth]
```{% endraw %}
Only items listed in `dependencies` are applied — bare functions are ignored.

---

## Inheritance (merge, not override)

Nexy walks **up** from the route file to `src/routes/` and **merges** every `dependencies` list found:
{% raw %}```
src/routes/
├── dependencies.py              # [log_request]
└── dashboard/
    ├── dependencies.py          # [require_auth]
    ├── index.nexy               # gets [Depends(log_request), Depends(require_auth)]
    └── settings.nexy            # same
```{% endraw %}
Child `dependencies.py` files **do not override** parents. All lists are combined. If the same dependency name appears in both, FastAPI raises `ValueError` at startup (duplicate parameter).

---

## Using in a page

In `.nexy` pages, dependencies run automatically before the render — you don't need to import or call them:
{% raw %}```nexy
---
---
<h1>Dashboard</h1>
```{% endraw %}
The resolved values are **not** available as template variables. Dependencies run for side effects (auth checks, logging, DB connection setup).

For `.py` handlers, dependencies run as side effects — their return values are **not** injected into the handler. To access a dependency's value, add `Depends()` in the function signature:
{% raw %}```python
# src/routes/dashboard/users.py
from fastapi import Depends
from .dependencies import get_db

def GET(db=Depends(get_db)):
    return {"db": db["connection"]}
```{% endraw %}
If the same callable is listed in both `dependencies = [...]` and the handler signature, FastAPI runs it once and shares the result.

---
{% call Link(href="/docs/fbrouters/middlewares") %}Next: Middlewares →{% endcall %}