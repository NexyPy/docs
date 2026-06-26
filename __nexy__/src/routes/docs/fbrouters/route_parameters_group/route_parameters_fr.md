# URL dynamiques (paramètres d'itinéraire)

Les paramètres dynamiques capturent des segments d'URL variables. Nexy utilise la syntaxe entre crochets `[param]`.

---

## Syntaxe
{% raw %}```bash
routes/
├── blog/
│   ├── index.nexy          →  /blog
│   └── [slug].nexy         →  /blog/{slug}
└── users/
    └── [userId].py         →  /users/{userId}
```{% endraw %}
---

## Dans une page `.nexy`

Le paramètre est disponible via les propriétés frontmatter :
{% raw %}```
---
slug: prop[str]
---
<h1>Article: {{ slug }}</h1>
```{% endraw %}
---

## Dans un gestionnaire `.py`
{% raw %}```python
# routes/users/[userId].py
from fastapi import Request

async def get(request: Request, userId: int):
    return {"user_id": userId}
```{% endraw %}
Les types sont convertis automatiquement (`int`, `str`, `UUID`, etc.).

---

## Plusieurs paramètres
{% raw %}```bash
routes/
└── blog/
    └── [year]/[month]/[slug].nexy
```{% endraw %}
{% raw %}```nexy
---
year: prop[int]
month: prop[int]
slug: prop[str]
---
<article>
    {{ year }}-{{ month }}
    {{ slug | replace("-", " ") }}
</article>
```{% endraw %}
---

## Paramètres fourre-tout
{% raw %}```bash
routes/
└── docs/
    └── [...path].nexy      →  /docs/{path+}
```{% endraw %}
{% raw %}```nexy
---
path: prop[list[str]]
---
{{ path | join("/") }}
```{% endraw %}
La variable `path` reçoit **tous** les segments d'URL restants sous forme de liste.
{% call Link(href="/docs/fbrouters/query_parameters") %}Next: Query Parameters →{% endcall %}