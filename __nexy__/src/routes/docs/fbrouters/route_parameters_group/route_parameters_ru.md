# Динамические URL-адреса (параметры маршрута)

Динамические параметры захватывают переменные сегменты URL. Nexy использует синтаксис скобок `[param]`.

---

## Синтаксис
{% raw %}```bash
routes/
├── blog/
│   ├── index.nexy          →  /blog
│   └── [slug].nexy         →  /blog/{slug}
└── users/
    └── [userId].py         →  /users/{userId}
```{% endraw %}
---

## На странице `.nexy`

Параметр доступен через свойства frontmatter:
{% raw %}```
---
slug: prop[str]
---
<h1>Article: {{ slug }}</h1>
```{% endraw %}
---

## В обработчике `.py`
{% raw %}```python
# routes/users/[userId].py
from fastapi import Request

async def get(request: Request, userId: int):
    return {"user_id": userId}
```{% endraw %}
Типы преобразуются автоматически (`int`, `str`, `UUID` и т. д.).

---

## Несколько параметров
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

## Универсальные параметры
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
Переменная `path` получает **все** оставшиеся сегменты URL-адреса в виде списка.
{% call Link(href="/docs/fbrouters/query_parameters") %}Next: Query Parameters →{% endcall %}