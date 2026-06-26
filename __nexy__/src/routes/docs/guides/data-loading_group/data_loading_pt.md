# Carregamento de dados

Nexy fornece duas camadas para carregar dados: **tempo de compilação** no frontmatter `.nexy` e **tempo de solicitação** via ganchos.

## Dados em tempo de compilação (frontmatter)

O bloco `---` nos arquivos `.nexy` é Python que é executado em tempo de compilação. As variáveis ​​aí definidas estão disponíveis no modelo:

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

Você também pode importar dados JSON diretamente:

{% raw %}```nexy
---
import "./data.json" as data
---
{{ data | tojson }}
```{% endraw %}

## Dados de tempo de solicitação (ganchos)

Os ganchos são executados durante a solicitação HTTP e têm acesso ao contexto da solicitação:

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

## Manipuladores de rotas de API

Para dados provenientes de um banco de dados ou API externa, crie um manipulador de API dedicado em um arquivo `.py`:

{% raw %}```python
# src/routes/api/items.py
from myapp.db import get_items

def GET():
    return get_items()

def POST(data: dict):
    # data is parsed from request body automatically
    return {"created": True, "id": data.get("id")}
```{% endraw %}

Em seguida, chame-o de sua página via `fetch` ou inclusão do lado do servidor.

## Inclusões dinâmicas com `useViews`

Renderize o componente de outra página dentro da página atual no momento da solicitação:

{% raw %}```python
from nexy import useViews
sidebar = useViews("/components/sidebar.nexy", {"active": "docs"})
```{% endraw %}

Retorna um `HTMLResponse` que você pode incorporar ao seu modelo.