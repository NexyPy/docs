# Redirects (Modular)

Redirect incoming requests to other URLs in controllers.

## Basic redirect

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
from fastapi.responses import RedirectResponse
from nexy.decorators import Controller

"@Controller("/old-path")
class RedirectController:
    def GET(self):
        return RedirectResponse("/new-path", status_code=308)
```{% endraw %}

## Conditional redirect

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
| 301 | Moved Permanently | Permanent URL change |
| 302 | Found (default) | Temporary redirect |
| 307 | Temporary Redirect | Preserves HTTP method |
| 308 | Permanent Redirect | Preserves HTTP method |

## Common patterns

- Auth redirect: unauthenticated users → `/login`
- Legacy URLs: old paths → new paths (301)
- Post-submit redirect: after form POST → success page (303)