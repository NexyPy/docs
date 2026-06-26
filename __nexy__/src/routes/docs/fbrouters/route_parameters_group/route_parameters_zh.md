# 动态 URL（路由参数）

动态参数捕获可变 URL 段。 Nexy 使用 `[param]` 括号语法。

---

## 语法
{% raw %}```bash
routes/
├── blog/
│   ├── index.nexy          →  /blog
│   └── [slug].nexy         →  /blog/{slug}
└── users/
    └── [userId].py         →  /users/{userId}
```{% endraw %}
---

## 在 `.nexy` 页面中

该参数可通过 frontmatter 属性获得：
{% raw %}```
---
slug: prop[str]
---
<h1>Article: {{ slug }}</h1>
```{% endraw %}
---

## 在 `.py` 处理程序中
{% raw %}```python
# routes/users/[userId].py
from fastapi import Request

async def get(request: Request, userId: int):
    return {"user_id": userId}
```{% endraw %}
类型会自动转换（`int`、`str`、`UUID` 等）。

---

## 多个参数
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

## 捕获所有参数
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
`path` 变量接收**所有**剩余的 URL 段作为列表。
{% call Link(href="/docs/fbrouters/query_parameters") %}Next: Query Parameters →{% endcall %}