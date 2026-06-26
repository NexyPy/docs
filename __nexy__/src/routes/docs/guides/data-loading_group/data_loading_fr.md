# Chargement des données

Nexy fournit deux couches pour le chargement des données : **temps de compilation** dans le frontmatter `.nexy` et **temps de demande** via des hooks.

## Données au moment de la compilation (frontmatter)

Le bloc `---` dans les fichiers `.nexy` est Python qui s'exécute au moment de la compilation. Les variables définies ici sont disponibles dans le modèle :

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

Vous pouvez également importer directement des données JSON :

{% raw %}```nexy
---
import "./data.json" as data
---
{{ data | tojson }}
```{% endraw %}

## Données au moment de la requête (hooks)

Les hooks s'exécutent pendant la requête HTTP et ont accès au contexte de la requête :

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

## Gestionnaires de routes API

Pour les données provenant d'une base de données ou d'une API externe, créez un gestionnaire d'API dédié dans un fichier `.py` :

{% raw %}```python
# src/routes/api/items.py
from myapp.db import get_items

def GET():
    return get_items()

def POST(data: dict):
    # data is parsed from request body automatically
    return {"created": True, "id": data.get("id")}
```{% endraw %}

Appelez-le ensuite depuis votre page via `fetch` ou une inclusion côté serveur.

## Inclusions dynamiques avec `useViews`

Afficher le composant d'une autre page à l'intérieur de la page actuelle au moment de la demande :

{% raw %}```python
from nexy import useViews
sidebar = useViews("/components/sidebar.nexy", {"active": "docs"})
```{% endraw %}

Renvoie un `HTMLResponse` que vous pouvez intégrer dans votre modèle.