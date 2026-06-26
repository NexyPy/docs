# Carga de datos

Nexy proporciona dos capas para cargar datos: **tiempo de compilación** en `.nexy` frontmatter y **tiempo de solicitud** a través de enlaces.

## Datos en tiempo de compilación (primer tema)

El bloque `---` en los archivos `.nexy` es Python que se ejecuta en tiempo de compilación. Las variables allí definidas están disponibles en la plantilla:

{% raw %}```nexy
---
import json
from src.data import get_items
items = get_items()
total = len(items)
---
<ul>
{% for item in items %}
  {{ item.name }}
{% endfor %}
</ul>
<p>Total: {{ total }} items</p>
```{% endraw %}

También puedes importar datos JSON directamente:

{% raw %}```nexy
---
import "./data.json" as data
---
{{ data | tojson }}
```{% endraw %}

## Datos de tiempo de solicitud (ganchos)

Los ganchos se ejecutan durante la solicitud HTTP y tienen acceso al contexto de la solicitud:

{% raw %}```python
from nexy import useQuery, useSearchParams, useSession, useCookies

# URL path parameters (from [param] in filename)
id = useQuery("id")

# Query string parameters
params = useSearchParams()  # {"page": "1", "sort": "asc"}

# Session data (requires session middleware)
user = useSession().get("user")

# Cookies
token = useCookies().get("token")
```{% endraw %}

## Controladores de ruta API

Para los datos que provienen de una base de datos o API externa, cree un controlador de API dedicado en un archivo `.py`:

{% raw %}```python
# src/routes/api/items.py
from myapp.db import get_items

def GET():
    return get_items()

def POST(data: dict):
    # data is parsed from request body automatically
    return {"created": True, "id": data.get("id")}
```{% endraw %}

Luego llámelo desde su página a través de `fetch` o la inclusión del lado del servidor.

## Incluye dinámica con `useViews`

Renderice el componente de otra página dentro de la página actual en el momento de la solicitud:

{% raw %}```python
from nexy import useViews
sidebar = useViews("/components/sidebar.nexy", {"active": "docs"})
```{% endraw %}

Devuelve un `HTMLResponse` que puedes incrustar en tu plantilla.