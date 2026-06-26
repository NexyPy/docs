# использовать запрос

Возвращает параметры динамического маршрута (параметры пути) из текущего URL-адреса.

{% raw %}```python
from nexy import useQuery

query = useQuery()
```{% endraw %}

---

## Возвращаемое значение

`dict` — параметры пути, извлеченные из URL-адреса (например, `{"slug": "hello-world"}` для маршрута `[slug]`).

---

## Пример

{% raw %}```nexy
---
from nexy import useQuery
params = useQuery()
---
<h1>Article: {{ params.slug }}</h1>
```{% endraw %}

---

## С несколькими параметрами

{% raw %}```nexy
---
from nexy import useQuery
params = useQuery()
---
<article>
    {{ params.title }}
    <p>Year: {{ params.year }}, Month: {{ params.month }}</p>
</article>
```{% endraw %}

---

## Примечания по использованию

— Значения по умолчанию являются строками — преобразование типов FastAPI применяется в обработчиках `.py`.
- Эквивалент `request.path_params` в FastAPI