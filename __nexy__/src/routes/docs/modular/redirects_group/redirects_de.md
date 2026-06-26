# Weiterleitungen (modular)

Leiten Sie eingehende Anfragen an andere URLs in Controllern um.

## Einfache Weiterleitung

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
from fastapi.responses import RedirectResponse
from nexy.decorators import Controller

"@Controller("/old-path")
class RedirectController:
    def GET(self):
        return RedirectResponse("/new-path", status_code=308)
```{% endraw %}

## Bedingte Weiterleitung

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
| 301 | Dauerhaft verschoben | Permanente URL-Änderung |
| 302 | Gefunden (Standard) | Temporäre Weiterleitung |
| 307 | Temporäre Weiterleitung | Behält die HTTP-Methode bei |
| 308 | Permanente Weiterleitung | Behält die HTTP-Methode bei |

## Gemeinsame Muster

- Auth-Umleitung: nicht authentifizierte Benutzer → `/login`
- Legacy-URLs: alte Pfade → neue Pfade (301)
- Weiterleitung nach dem Absenden: nach Formular-POST → Erfolgsseite (303)