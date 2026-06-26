# использовать просмотры

Отрисовывает шаблон представления (`.nexy`, `.mdx` или интерфейсный компонент) с заданным контекстом, возвращая `HTMLResponse`.

{% raw %}```python
from nexy import useViews

html = useViews(path, context=None)
```{% endraw %}

---

## Параметры

| Параметр | Тип | По умолчанию | Описание |
|-----------|------|---------|-------------|
| `path` | `str` | требуется | Путь к файлу представления (относительно проекта) |
| `context` | `dict \| None` | `None` | Переменные для передачи в шаблон |

---

## Возвращаемое значение

`HTMLResponse` — визуализированный HTML с добавленными ресурсами Vite.

---

## Пример

{% raw %}```nexy
---
from nexy import useViews
html = useViews("src/routes/components/card.nexy", {"title": "Hello", "body": "World"})
---
{{ html | safe }}
```{% endraw %}

---

## Компоненты внешнего интерфейса

Для представлений `.tsx`, `.vue`, `.svelte` и `.jsx` `useViews` возвращает гидратируемый контейнер:

{% raw %}```nexy
---
from nexy import useViews
container = useViews("src/components/Counter.tsx", {"initial": 0})
---
{{ container | safe }}
```{% endraw %}

Контейнер включает атрибуты `data-nexy-fw`, `data-nexy-path` и `data-nexy-props` для гидратации на стороне клиента.

---

## Поддерживаемые расширения

| Расширение | Поведение |
|-----------|----------|
| `.nexy` | Скомпилированный шаблон → обработанный HTML |
| `.mdx` | Markdown + компоненты → визуализируемый HTML |
| `.tsx` | Гидратируемый контейнер (React/Solid/Preact) |
| `.vue` | Гидратируемый контейнер |
| `.svelte` | Гидратируемый контейнер |
| `.jsx` | Гидратируемый контейнер |