# Weiterleitungen

Leiten Sie eingehende Anfragen mit `RedirectResponse` von FastAPI an andere URLs um.

---

## Einfache Weiterleitung
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
## Mit Statuscode
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
## Bedingte Weiterleitung
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
## Statuscode-Referenz

| Code | Name | Anwendungsfall |
|------|------|----------|
| 301 | Dauerhaft verschoben | Dauerhafte URL-Änderung – Browser speichern sie im Cache |
| 302 | Gefunden (Standard) | Temporäre Weiterleitung |
| 307 | Temporäre Weiterleitung | Wie 302, behält jedoch die HTTP-Methode | bei
| 308 | Permanente Weiterleitung | Wie 301, behält aber die HTTP-Methode | bei

## Gemeinsame Muster

- **Auth redirect**: unauthenticated users → `/login`
- **Legacy-URLs**: alte Pfade → neue Pfade (301)
- **Post-Submit-Weiterleitung**: nach Formular-POST → Erfolgsseite (303)
- **Gebietsschemaumleitung**: `/` → `/{locale}/` basierend auf der Browsersprache