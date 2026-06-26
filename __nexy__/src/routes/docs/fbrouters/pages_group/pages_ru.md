# страниц

Страница — это маршрут, который возвращает HTML. В Nexy страницы представляют собой файлы `.nexy` или `.mdx` в папке `src/routes/`.

> Страницы отличаются от **обработчиков маршрутов** (файлы `.py`), которые возвращают JSON или необработанные данные.

---

## Создание страницы

Поместите файл `.nexy` или `.mdx` в `src/routes/`:
{% raw %}```bash
src/
└── routes/
    └── index.nexy       →  /
```{% endraw %}
{% raw %}```html
<!-- index.nexy -->
<h1>Hello Nexy!</h1>
```{% endraw %}
Регистрация маршрута не требуется — файл **является** маршрутом.

---

## страниц в `.nexy`

Файл `.nexy` может содержать заголовок Python и шаблон HTML:
{% raw %}```
---
items: prop[list] = []
---
<ul>
{% for item in items %}
    {{ item }}
{% endfor %}
</ul>
```{% endraw %}
---

## страниц в `.mdx`

Файлы `.mdx` сочетают в себе Markdown с компонентами Nexy:
{% raw %}```mdx
---
from "@components/link.nexy" import Link
---

# My Article

<Link href="/docs">Back to docs</Link>
```{% endraw %}
Эта страница, которую вы читаете, сама по себе является файлом `.mdx` — оглавление, боковая панель и навигационная цепочка обрабатываются макетом.

---

## Специальные файлы, не маршрутизируемые

Некоторые файлы внутри `routes/` не создают маршруты:

| Файл | Роль |
|---|---|
| `__init__.py` | Маркер пакета Python |
| `layout.nexy` | Оболочка общего макета |
| `dependencies.py` | Общие зависимости |
{% call Link(href="/docs/fbrouters/layouts") %}Next: Layouts →{% endcall %}