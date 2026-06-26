# Загрузка данных

Nexy предоставляет два уровня для загрузки данных: **время компиляции** во фронтальной части `.nexy` и **время запроса** через перехватчики.

## Данные времени компиляции (вступление)

Блок `---` в файлах `.nexy` — это Python, который выполняется во время компиляции. Переменные, определенные там, доступны в шаблоне:

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

Вы также можете напрямую импортировать данные JSON:

{% raw %}```nexy
---
import "./data.json" as data
---
{{ data | tojson }}
```{% endraw %}

## Данные времени запроса (перехватчики)

Хуки запускаются во время HTTP-запроса и имеют доступ к контексту запроса:

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

## Обработчики маршрутов API

Для данных, поступающих из базы данных или внешнего API, создайте специальный обработчик API в файле `.py`:

{% raw %}```python
# src/routes/api/items.py
from myapp.db import get_items

def GET():
    return get_items()

def POST(data: dict):
    # data is parsed from request body automatically
    return {"created": True, "id": data.get("id")}
```{% endraw %}

Затем вызовите его со своей страницы через `fetch` или включение на стороне сервера.

## Динамическое подключение с помощью `useViews`

Отобразите компонент другой страницы внутри текущей страницы во время запроса:

{% raw %}```python
from nexy import useViews
sidebar = useViews("/components/sidebar.nexy", {"active": "docs"})
```{% endraw %}

Возвращает `HTMLResponse`, который вы можете встроить в свой шаблон.