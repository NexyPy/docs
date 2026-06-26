# usar enrutador

Devuelve un objeto con contexto de enrutamiento para la solicitud actual.

{% raw %}```python
from nexy import useRouter

router = useRouter()
```{% endraw %}

---

## Valor de retorno

`dict` con las siguientes claves:

| Clave | Tipo | Descripción |
|-----|------|-------------|
| `path` | `str` | Ruta URL actual |
| `base_url` | `str` | URL base del servidor |
| `url_for` | `callable \| None` | Función `url_for` de FastAPI para búsqueda de URL inversa |

---

## Ejemplo

{% raw %}```nexy
---
from nexy import useRouter
router = useRouter()
---
<p>Current path: {{ router.path }}</p>
<p>Base URL: {{ router.base_url }}</p>
```{% endraw %}

---

## Búsqueda de URL inversa

{% raw %}```python
router = useRouter()
if router.url_for:
    url = router.url_for("read_article", slug="hello-world")
```{% endraw %}

---

## Notas de uso

- `url_for` puede ser `None` fuera del contexto de la solicitud
- Utiliza `request.app.url_for` de FastAPI bajo el capó