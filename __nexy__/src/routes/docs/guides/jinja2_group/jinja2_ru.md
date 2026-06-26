# Джинджа2

Nexy использует **Jinja2** в качестве механизма шаблонов. Каждый блок шаблона файла `.nexy` отображается как шаблон Jinja2.

---

## Синтаксис

{% raw %}```nexy
---
title = "Hello"
items = [1, 2, 3]
---
{{ title }}
<ul>
{% for item in items %}
    {{ item }}
{% endfor %}
</ul>
{% if user %}
    <p>Welcome, {{ user.name }}</p>
{% endif %}
```{% endraw %}

---

## Контекст шаблона

Контекст шаблона включает в себя:

- Все реквизиты объявлены во обложке (`item: prop[type]`)
- Автоматически внедряемые помощники: `Slot`, `trans`, `t`, `__current_locale`, `__Import`, `__Template`
- Дополнительные реквизиты: `caller`, `children`

---

## Фильтры

Доступны все встроенные фильтры Jinja2:

{% raw %}```nexy
{{ description | truncate(100) }}
{{ created_at | date(format="short") }}
{{ content | safe }}
{{ name | title }}
```{% endraw %}

---

## Макросы

Макросы Jinja2 работают в файлах `.nexy`:

{% raw %}```nexy
{% macro input(name, type="text", value="") %}
    <input type="{{ type }}" name="{{ name }}" value="{{ value }}" />
{% endmacro %}

<form>
    {{ input("username") }}
    {{ input("password", type="password") }}
</form>
```{% endraw %}

---

## Уценка

Файлы `.mdx` визуализируются как Markdown, а затем помещаются в шаблон макета. Стандартный синтаксис Jinja2 работает и внутри `.mdx`.

---

## Контроль пробелов

Контроль пробелов в Jinja2 работает в файлах `.nexy`:

{% raw %}```nexy
{%- for item in items -%}
    {{ item }}
{%- endfor -%}
```{% endraw %}

Используйте `{{ '{%' }}-` и `-{{ '%}' }}`, чтобы удалить пробелы вокруг управляющих блоков.