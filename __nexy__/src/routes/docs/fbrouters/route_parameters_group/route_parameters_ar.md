# عناوين URL الديناميكية (معلمات المسار)

تلتقط المعلمات الديناميكية مقاطع URL المتغيرة. يستخدم Nexy بناء جملة القوس `[param]`.

---

## بناء الجملة
{% raw %}```bash
routes/
├── blog/
│   ├── index.nexy          →  /blog
│   └── [slug].nexy         →  /blog/{slug}
└── users/
    └── [userId].py         →  /users/{userId}
```{% endraw %}
---

## في صفحة `.nexy`

المعلمة متاحة عبر خصائص المادة الأمامية:
{% raw %}```
---
slug: prop[str]
---
<h1>Article: {{ slug }}</h1>
```{% endraw %}
---

## في معالج `.py`
{% raw %}```python
# routes/users/[userId].py
from fastapi import Request

async def get(request: Request, userId: int):
    return {"user_id": userId}
```{% endraw %}
يتم تحويل الأنواع تلقائيًا (`int`، `str`، `UUID`، وما إلى ذلك).

---

## معلمات متعددة
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

## معلمات الالتقاط
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
يتلقى المتغير `path` **جميع** أجزاء URL المتبقية كقائمة.
{% call Link(href="/docs/fbrouters/query_parameters") %}Next: Query Parameters →{% endcall %}