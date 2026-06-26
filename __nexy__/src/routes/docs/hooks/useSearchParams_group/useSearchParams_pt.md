#useSearchParams

Retorna os parâmetros de consulta da URL atual como um dicionário.

{% raw %}```python
from nexy import useSearchParams

params = useSearchParams()
```{% endraw %}

---

## Valor de retorno

`dict` — parâmetros de consulta do URL de solicitação (por exemplo, `{"q": "nexy", "page": "2"}`).

---

## Exemplo

{% raw %}```nexy
---
from nexy import useSearchParams
params = useSearchParams()
search = params.get("q", "")
page = int(params.get("page", "1"))
---
<h1>Search: {{ search }}</h1>
<p>Page {{ page }}</p>
```{% endraw %}

---

## Métodos

O dict retornado oferece suporte a operações de dicionário padrão: `.get(key, default)`, `.keys()`, `.items()`.

---

## Notas de uso

- Todos os valores são strings — converta com `int()`, `bool()`, etc.
- Para manipuladores de API, use a injeção de parâmetro nativo do FastAPI