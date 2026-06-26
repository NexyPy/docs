# useQuery

Gibt die dynamischen Routenparameter (Pfadparameter) der aktuellen URL zurück.

{% raw %}```python
from nexy import useQuery

query = useQuery()
```{% endraw %}

---

## Rückgabewert

`dict` – aus der URL extrahierte Pfadparameter (z. B. `{"slug": "hello-world"}` für eine `[slug]`-Route).

---

## Beispiel

{% raw %}```nexy
---
from nexy import useQuery
params = useQuery()
---
<h1>Article: {{ params.slug }}</h1>
```{% endraw %}

---

## Mit mehreren Parametern

{% raw %}```nexy
---
from nexy import useQuery
params = useQuery()
---
<article>
    {{ params.title }}
    <p>Year: {{ params.year }}, Month: {{ params.month }}</p>
</article>
```{% endraw %}

---

## Nutzungshinweise

– Werte sind standardmäßig Zeichenfolgen – die FastAPI-Typkonvertierung wird in `.py`-Handlern angewendet
– Entspricht `request.path_params` in FastAPI