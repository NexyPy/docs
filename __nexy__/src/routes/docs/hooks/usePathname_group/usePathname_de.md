# usePathname

Gibt den aktuellen URL-Pfad als String zurück.

{% raw %}```python
from nexy import usePathname

pathname = usePathname()
```{% endraw %}

---

## Rückgabewert

`str` – die Pfadkomponente der aktuellen Anfrage-URL (z. B. `/docs/hooks/usePathname`).

---

## Beispiel

{% raw %}```nexy
---
from nexy import usePathname
path = usePathname()
---
<nav class="breadcrumb">
    {% set segments = path.strip('/').split('/') %}
    {% for seg in segments %}
        <span>/ {{ seg }}</span>
    {% endfor %}
</nav>
```{% endraw %}

---

## Nutzungshinweise

- Erhältlich in den Ausführungen `.nexy` und `.mdx`
- Auch verfügbar in `.py` Routenhandlern über `request.url.path`
– Gibt nur den Pfad zurück – keine Abfragezeichenfolge, kein Fragment