# Abfrageparameter

Abfrageparameter sind die `?key=value`-Paare in einer URL. Nexy macht sie über `useSearchParams()` in Frontmatter oder `request.query_params` in einem Handler verfügbar.

---

## Auf einer `.nexy` Seite
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
Das `params`-Objekt verhält sich wie ein Wörterbuch: `.get(key, default)`, `.keys()`, `.items()`.

---

## In einem `.py`-Handler
{% raw %}```python
# routes/search.py
from fastapi import Request

async def get(request: Request, q: str = "", page: int = 1):
    results = search_database(q, page=page)
    return {"results": results, "page": page}
```{% endraw %}
FastAPI löst typisierte Abfrageparameter automatisch auf.

---

## Aktuelle Seitenparameter

Diese Seite verwendet `useSearchParams()` im Titelbild. Die aktuellen Abfrageparameter sind:
{% raw %}```json
{{ params | safe }}
```{% endraw %}
---

## Best Practices

– Verwenden Sie `useSearchParams()` in `.nexy`-Komponenten für vom Server gerenderte Seiten
– Verwenden Sie `request.query_params` in `.py`-Handlern für APIs
- Werte sind immer Zeichenfolgen – konvertieren mit `int()`, `bool()` usw.
{% call Link(href="/docs/components") %}Next: Views →{% endcall %}