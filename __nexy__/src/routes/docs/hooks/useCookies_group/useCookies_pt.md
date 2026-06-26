#useCookies

Retorna os cookies da solicitação atual como um dicionário.

{% raw %}```python
from nexy import useCookies

cookies = useCookies()
```{% endraw %}

---

## Valor de retorno

`dict` — todos os cookies enviados com a solicitação.

---

## Exemplo

{% raw %}```nexy
---
from nexy import useCookies
cookies = useCookies()
locale = cookies.get("nexy-locale", "en")
---
<html lang="{{ locale }}">
```{% endraw %}

---

## Notas de uso

- Somente leitura — use `useSession` para definir cookies
- Os valores dos cookies são strings
- Equivalente a `request.cookies` em FastAPI