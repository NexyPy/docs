# Python в шаблоне Nexy

Вводная часть (`---`) запускает Python во время компиляции и при каждом запросе.

---

## Что ты можешь сделать

### Импорт модулей
{% raw %}```python
---
import json
from datetime import datetime
from nexy import usePathname
from "@components/card.nexy" import Card
---
```{% endraw %}
### Запуск выражений
{% raw %}```python
---
items = [1, 2, 3]
now = datetime.now()
is_admin = user.role == "admin"
---
```{% endraw %}
### Используйте хуки
{% raw %}```python
---
from nexy import usePathname, useSearchParams, useCookies
pathname = usePathname()
params = useSearchParams()
cookies = useCookies()
---
```{% endraw %}
### Данные запроса доступа
{% raw %}```python
---
from fastapi import Request
# request is injected automatically
---
```{% endraw %}
---

## Время компиляции и время выполнения

| Операция | Когда | Пример |
|---|---|---|
| `import` | Компилировать | Импорт компонентов |
| `prop[type]` | Компилировать | Проверенный тип реквизита |
| Крючки | Запрос | `usePathname()` |
| Переменные | Запрос | `user = request.user` |

Переменные, определенные в frontmatter, доступны в шаблоне:
{% raw %}```python
---
from datetime import datetime
year = datetime.now().year
---
<footer>&copy; {{ year }} Nexy</footer>
```{% endraw %}
---

## Общая логика

Для многократного использования логики Python создайте обычный файл `.py`:
{% raw %}```python
# src/utils/helpers.py
def format_date(dt):
    return dt.strftime("%B %d, %Y")
```{% endraw %}
Импорт из любого компонента:
{% raw %}```python
---
from src.utils.helpers import format_date
from datetime import datetime
---
{{ format_date(datetime.now()) }}
```{% endraw %}
{% call Link(href="/docs/components/properties") %}Next: Properties →{% endcall %}