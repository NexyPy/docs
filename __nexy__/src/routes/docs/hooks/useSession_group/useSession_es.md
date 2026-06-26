# uso de sesión

Devuelve el diccionario de sesión para la solicitud actual. Las sesiones están respaldadas por cookies firmadas, sin almacenamiento en el lado del servidor.

{% raw %}```python
from nexy import useSession

session = useSession()
```{% endraw %}

---

## Valor de retorno

`dict`: los datos de la sesión de la cookie firmada. Devuelve un dictado vacío si no existe ninguna sesión.

---

## Ejemplo

{% raw %}```nexy
---
from nexy import useSession
session = useSession()
user_id = session.get("user_id")
---
{% if user_id %}
    <p>Logged in as user {{ user_id }}</p>
{% else %}
    <p>Guest</p>
{% endif %}
```{% endraw %}

---

## Escribir datos de sesión

{% raw %}```python
session = useSession()
session["user_id"] = 123
session["role"] = "admin"
del session["_flash"]
```{% endraw %}

---

## Patrón de mensajes flash

{% raw %}```python
session = useSession()
flashes = session.get("_flashes", [])
flashes.append("Item saved!")
session["_flashes"] = flashes
```{% endraw %}

---

## Notas de uso

- Requiere configuración `useSession` en `nexyconfig.py`
- Los datos de la sesión están firmados pero **no cifrados**
- Sin almacenamiento del lado del servidor: todo está en la cookie