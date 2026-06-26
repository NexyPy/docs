# usar nombre de ruta

Devuelve la ruta URL actual como una cadena.

{% raw %}```python
from nexy import usePathname

pathname = usePathname()
```{% endraw %}

---

## Valor de retorno

`str`: el componente de ruta de la URL de solicitud actual (por ejemplo, `/docs/hooks/usePathname`).

---

## Ejemplo

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

## Notas de uso

- Disponible en `.nexy` y `.mdx` frontmatter
- También disponible en `.py` controladores de ruta a través de `request.url.path`
- Devuelve sólo la ruta, sin cadena de consulta ni fragmento