# useQuery

Retorna os parâmetros de rota dinâmica (parâmetros de caminho) do URL atual.

{% raw %}```python
from nexy import useQuery

query = useQuery()
```{% endraw %}

---

## Valor de retorno

`dict` — parâmetros de caminho extraídos da URL (por exemplo, `{"slug": "hello-world"}` para uma rota `[slug]`).

---

## Exemplo

{% raw %}```nexy
---
from nexy import useQuery
params = useQuery()
---
<h1>Article: {{ params.slug }}</h1>
```{% endraw %}

---

## Com vários parâmetros

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

- Os valores são strings por padrão — a conversão do tipo FastAPI se aplica em manipuladores `.py`
- Equivalente a `request.path_params` em FastAPI