# 動的 URL (ルートパラメータ)

動的パラメータは、可変 URL セグメントをキャプチャします。 Nexy は `[param]` 括弧構文を使用します。

---

## 構文
{% raw %}```bash
routes/
├── blog/
│   ├── index.nexy          →  /blog
│   └── [slug].nexy         →  /blog/{slug}
└── users/
    └── [userId].py         →  /users/{userId}
```{% endraw %}
---

## `.nexy` ページ内

このパラメータは、frontmatter プロパティ経由で利用できます。
{% raw %}```
---
slug: prop[str]
---
<h1>Article: {{ slug }}</h1>
```{% endraw %}
---

## `.py` ハンドラー内
{% raw %}```python
# routes/users/[userId].py
from fastapi import Request

async def get(request: Request, userId: int):
    return {"user_id": userId}
```{% endraw %}
型は自動的に変換されます (`int`、`str`、`UUID` など)。

---

## 複数のパラメータ
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

## キャッチオールパラメータ
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
`path` 変数は、残りの **すべて** の URL セグメントをリストとして受け取ります。
{% call Link(href="/docs/fbrouters/query_parameters") %}Next: Query Parameters →{% endcall %}