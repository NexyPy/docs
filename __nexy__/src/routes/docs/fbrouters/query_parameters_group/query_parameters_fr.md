# Paramètres de requête

Les paramètres de requête sont les paires `?key=value` dans une URL. Nexy les expose via `useSearchParams()` en frontmatter, ou `request.query_params` dans un gestionnaire.

---

## Dans une page `.nexy`
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
L'objet `params` se comporte comme un dictionnaire : `.get(key, default)`, `.keys()`, `.items()`.

---

## Dans un gestionnaire `.py`
{% raw %}```python
# routes/search.py
from fastapi import Request

async def get(request: Request, q: str = "", page: int = 1):
    results = search_database(q, page=page)
    return {"results": results, "page": page}
```{% endraw %}
FastAPI résout automatiquement les paramètres de requête saisis.

---

## Paramètres de la page actuelle

Cette page utilise `useSearchParams()` dans son texte de présentation. Les paramètres de requête actuels sont :
{% raw %}```json
{{ params | safe }}
```{% endraw %}
---

## Bonnes pratiques

- Utiliser `useSearchParams()` dans les composants `.nexy` pour les pages rendues par le serveur
- Utiliser `request.query_params` dans les gestionnaires `.py` pour les API
- Les valeurs sont toujours des chaînes — convertissez avec `int()`, `bool()`, etc.
{% call Link(href="/docs/components") %}Next: Views →{% endcall %}