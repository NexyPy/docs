# Weiterleitungen (FBR)

Leiten Sie eingehende Anfragen mit `RedirectResponse` von FastAPI an andere URLs um.

## Einfache Weiterleitung

{% raw %}```python
# src/routes/redirect.py
from fastapi.responses import RedirectResponse

def GET():
    return RedirectResponse("/login")
```{% endraw %}

## Mit Statuscode

{% raw %}```python
from fastapi.responses import RedirectResponse

def GET():
    return RedirectResponse("/new-page", status_code=301)
```{% endraw %}

## Bedingte Weiterleitung

{% raw %}```python
from fastapi.responses import RedirectResponse

def GET(request):
    if not request.user.is_authenticated:
        return RedirectResponse("/login")
    return "<h1>Dashboard</h1>"
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
- Gebietsschemaumleitung: `/` → `/{locale}/` basierend auf der Browsersprache