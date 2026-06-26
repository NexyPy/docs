# 동적 URL(경로 매개변수)

동적 매개변수는 가변 URL 세그먼트를 캡처합니다. Nexy는 `[param]` 브래킷 구문을 사용합니다.

---

## 구문
{% raw %}```bash
routes/
├── blog/
│   ├── index.nexy          →  /blog
│   └── [slug].nexy         →  /blog/{slug}
└── users/
    └── [userId].py         →  /users/{userId}
```{% endraw %}
---

## `.nexy` 페이지에서

이 매개변수는 frontmatter 속성을 통해 사용할 수 있습니다:
{% raw %}```
---
slug: prop[str]
---
<h1>Article: {{ slug }}</h1>
```{% endraw %}
---

## `.py` 핸들러에서
{% raw %}```python
# routes/users/[userId].py
from fastapi import Request

async def get(request: Request, userId: int):
    return {"user_id": userId}
```{% endraw %}
유형은 자동으로 변환됩니다(`int`, `str`, `UUID` 등).

---

## 다중 매개변수
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

## 포괄적인 매개변수
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
`path` 변수는 나머지 **모든** URL 세그먼트를 목록으로 받습니다.
{% call Link(href="/docs/fbrouters/query_parameters") %}Next: Query Parameters →{% endcall %}