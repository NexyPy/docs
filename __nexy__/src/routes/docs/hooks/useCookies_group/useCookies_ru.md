# использовать файлы cookie

Возвращает файлы cookie из текущего запроса в виде словаря.

{% raw %}```python
from nexy import useCookies

cookies = useCookies()
```{% endraw %}

---

## Возвращаемое значение

`dict` — все файлы cookie, отправленные с запросом.

---

## Пример

{% raw %}```nexy
---
from nexy import useCookies
cookies = useCookies()
locale = cookies.get("nexy-locale", "en")
---
<html lang="{{ locale }}">
```{% endraw %}

---

## Примечания по использованию

- Только чтение — используйте `useSession` для настройки файлов cookie.
- Значения файлов cookie представляют собой строки.
- Эквивалент `request.cookies` в FastAPI