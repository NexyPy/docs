# Data Loading

Nexy provides two layers for loading data: **compile-time** in `.nexy` frontmatter, and **request-time** via hooks.

## Compile-time data (frontmatter)

The `---` block in `.nexy` files is Python that executes at compile time. Variables defined there are available in the template:

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

You can also import JSON data directly:

{% raw %}```nexy
---
import "./data.json" as data
---
{{ data | tojson }}
```{% endraw %}

## Request-time data (hooks)

Hooks run during the HTTP request and have access to request context:

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

## API route handlers

For data that comes from a database or external API, create a dedicated API handler in a `.py` file:

{% raw %}```python
# src/routes/api/items.py
from myapp.db import get_items

def GET():
    return get_items()

def POST(data: dict):
    # data is parsed from request body automatically
    return {"created": True, "id": data.get("id")}
```{% endraw %}

Then call it from your page via `fetch` or server-side include.

## Dynamic includes with `useViews`

Render another page's component inside the current page at request time:

{% raw %}```python
from nexy import useViews
sidebar = useViews("/components/sidebar.nexy", {"active": "docs"})
```{% endraw %}

Returns an `HTMLResponse` that you can embed in your template.