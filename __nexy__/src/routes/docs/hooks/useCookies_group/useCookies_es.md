# utilizar cookies

Devuelve las cookies de la solicitud actual como un diccionario.

{% raw %}```python
from nexy import useCookies

cookies = useCookies()
```{% endraw %}

---

## Valor de retorno

`dict`: todas las cookies enviadas con la solicitud.

---

## Ejemplo

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

- Sólo lectura: utilice `useSession` para configurar cookies
- Los valores de las cookies son cadenas.
- Equivalente a `request.cookies` en FastAPI