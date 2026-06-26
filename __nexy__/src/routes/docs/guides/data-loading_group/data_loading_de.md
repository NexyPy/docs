# Laden von Daten

Nexy bietet zwei Ebenen zum Laden von Daten: **Kompilierungszeit** in `.nexy` Frontmatter und **Anfragezeit** über Hooks.

## Daten zur Kompilierungszeit (Frontmatter)

Der `---`-Block in `.nexy`-Dateien ist Python, der zur Kompilierungszeit ausgeführt wird. Dort definierte Variablen stehen in der Vorlage zur Verfügung:

{% raw %}```nexy
---
import json
from src.data import get_items
items = get_items()
total = len(items)
---
<ul>
{% for item in items %}
  {{ item.name }}
{% endfor %}
</ul>
<p>Total: {{ total }} items</p>
```{% endraw %}

Sie können JSON-Daten auch direkt importieren:

{% raw %}```nexy
---
import "./data.json" as data
---
{{ data | tojson }}
```{% endraw %}

## Daten zur Anforderungszeit (Hooks)

Hooks werden während der HTTP-Anfrage ausgeführt und haben Zugriff auf den Anfragekontext:

{% raw %}```python
from nexy import useQuery, useSearchParams, useSession, useCookies

# URL path parameters (from [param] in filename)
id = useQuery("id")

# Query string parameters
params = useSearchParams()  # {"page": "1", "sort": "asc"}

# Session data (requires session middleware)
user = useSession().get("user")

# Cookies
token = useCookies().get("token")
```{% endraw %}

## API-Routenhandler

Erstellen Sie für Daten, die aus einer Datenbank oder einer externen API stammen, einen dedizierten API-Handler in einer `.py`-Datei:

{% raw %}```python
# src/routes/api/items.py
from myapp.db import get_items

def GET():
    return get_items()

def POST(data: dict):
    # data is parsed from request body automatically
    return {"created": True, "id": data.get("id")}
```{% endraw %}

Rufen Sie es dann von Ihrer Seite über `fetch` oder serverseitiges Include auf.

## Dynamische Includes mit `useViews`

Rendern Sie die Komponente einer anderen Seite zum Zeitpunkt der Anforderung innerhalb der aktuellen Seite:

{% raw %}```python
from nexy import useViews
sidebar = useViews("/components/sidebar.nexy", {"active": "docs"})
```{% endraw %}

Gibt einen `HTMLResponse` zurück, den Sie in Ihre Vorlage einbetten können.