# usoConsulta

Devuelve los parámetros de ruta dinámica (parámetros de ruta) de la URL actual.

{% raw %}```python
from nexy import useQuery

query = useQuery()
```{% endraw %}

---

## Valor de retorno

`dict`: parámetros de ruta extraídos de la URL (por ejemplo, `{"slug": "hello-world"}` para una ruta `[slug]`).

---

## Ejemplo

{% raw %}```nexy
---
from nexy import useQuery
params = useQuery()
---
<h1>Article: {{ params.slug }}</h1>
```{% endraw %}

---

## Con múltiples parámetros

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

## Notas de uso

- Los valores son cadenas de forma predeterminada: la conversión de tipo FastAPI se aplica en los controladores `.py`.
- Equivalente a `request.path_params` en FastAPI