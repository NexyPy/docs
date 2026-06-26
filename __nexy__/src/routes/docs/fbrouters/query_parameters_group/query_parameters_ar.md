# معلمات الاستعلام

معلمات الاستعلام هي أزواج `?key=value` في عنوان URL. يعرضهم Nexy عبر `useSearchParams()` في المادة الأمامية، أو `request.query_params` في المعالج.

---

## في صفحة `.nexy`
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
يتصرف الكائن `params` مثل القاموس: `.get(key, default)`، `.keys()`، `.items()`.

---

## في معالج `.py`
{% raw %}```python
# routes/search.py
from fastapi import Request

async def get(request: Request, q: str = "", page: int = 1):
    results = search_database(q, page=page)
    return {"results": results, "page": page}
```{% endraw %}
يقوم FastAPI بحل معلمات الاستعلام المكتوبة تلقائيًا.

---

## معلمات الصفحة الحالية

تستخدم هذه الصفحة `useSearchParams()` في مقدمتها. معلمات الاستعلام الحالية هي:
{% raw %}```json
{{ params | safe }}
```{% endraw %}
---

## أفضل الممارسات

- استخدم `useSearchParams()` في مكونات `.nexy` للصفحات التي يعرضها الخادم
- استخدم `request.query_params` في معالجات `.py` لواجهات برمجة التطبيقات
- القيم دائمًا عبارة عن سلاسل — يتم تحويلها باستخدام `int()`، و`bool()`، وما إلى ذلك.
{% call Link(href="/docs/components") %}Next: Views →{% endcall %}