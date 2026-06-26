# Redirects

Redirect incoming requests to other URLs using FastAPI's `RedirectResponse`.

---

## Basic redirect
{% raw %}```python
---
from fastapi.responses import RedirectResponse

def GET():
    return RedirectResponse("/login")
---
```{% endraw %}
{% raw %}```python
from fastapi.responses import RedirectResponse
from nexy.decorators import Controller

"@Controller("/admin")
class AdminController:
    def GET(self):
        return RedirectResponse("/login")
```{% endraw %}
## With status code
{% raw %}```python
---
from fastapi.responses import RedirectResponse

def GET():
    # 301 — Permanent (tells browsers to cache)
    return RedirectResponse("/new-page", status_code=301)
---
```{% endraw %}
{% raw %}```python
from fastapi.responses import RedirectResponse
from nexy.decorators import Controller

"@Controller("/old-path")
class RedirectController:
    def GET(self):
        return RedirectResponse("/new-path", status_code=308)
```{% endraw %}
## Conditional redirect
{% raw %}```python
---
from fastapi.responses import RedirectResponse

def GET(request):
    if not request.user.is_authenticated:
        return RedirectResponse("/login")
    return "<h1>Dashboard</h1>"
---
```{% endraw %}
{% raw %}```python
from fastapi.responses import RedirectResponse
from nexy.decorators import Controller

"@Controller("/dashboard")
class DashboardController:
    def GET(self, request):
        if not request.user.is_authenticated:
            return RedirectResponse("/login")
        return {"admin": True}
```{% endraw %}
## Status code reference

| Code | Name | Use case |
|------|------|----------|
| 301 | Moved Permanently | Permanent URL change — browsers cache it |
| 302 | Found (default) | Temporary redirect |
| 307 | Temporary Redirect | Like 302 but preserves HTTP method |
| 308 | Permanent Redirect | Like 301 but preserves HTTP method |

## Common patterns

- **Auth redirect**: unauthenticated users → `/login`
- **Legacy URLs**: old paths → new paths (301)
- **Post-submit redirect**: after form POST → success page (303)
- **Locale redirect**: `/` → `/{locale}/` based on browser language