# Redirects (FBR)

Redirect incoming requests to other URLs using FastAPI's `RedirectResponse`.

## Basic redirect

{% raw %}```python
# src/routes/redirect.py
from fastapi.responses import RedirectResponse

def GET():
    return RedirectResponse("/login")
```{% endraw %}

## With status code

{% raw %}```python
from fastapi.responses import RedirectResponse

def GET():
    return RedirectResponse("/new-page", status_code=301)
```{% endraw %}

## Conditional redirect

{% raw %}```python
from fastapi.responses import RedirectResponse

def GET(request):
    if not request.user.is_authenticated:
        return RedirectResponse("/login")
    return "<h1>Dashboard</h1>"
```{% endraw %}

## Status code reference

| Code | Name | Use case |
|------|------|----------|
| 301 | Moved Permanently | Permanent URL change |
| 302 | Found (default) | Temporary redirect |
| 307 | Temporary Redirect | Preserves HTTP method |
| 308 | Permanent Redirect | Preserves HTTP method |

## Common patterns

- Auth redirect: unauthenticated users → `/login`
- Legacy URLs: old paths → new paths (301)
- Post-submit redirect: after form POST → success page (303)
- Locale redirect: `/` → `/{locale}/` based on browser language