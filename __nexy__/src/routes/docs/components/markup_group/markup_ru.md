# Написание разметки с помощью Nexy

Шаблоны Nexy используют **HTML** + **Jinja2** для динамического контента.
Если вы знаете HTML и Jinja2, вы уже знакомы с шаблонами Nexy.

---

## Интерполяция текста
{% raw %}```html
{{ title }}
{{ description }}
```{% endraw %}
Переменные берутся из фронтальной части или реквизита.

---

## Фильтры

Фильтры Jinja2 преобразуют значения:
{% raw %}```html
{{ content | safe }}
{{ name | upper }}
{{ price | round(2) }}
```{% endraw %}
`| safe` помечает строку как безопасный HTML (без автоматического экранирования).

---

## Для циклов
{% raw %}```html
<ul>
{% for item in items %}
    {{ item.name }}
{% endfor %}
</ul>
```{% endraw %}
---

## Если/иначе
{% raw %}```html
{% if user %}
    <p>Welcome, {{ user.name }}!</p>
{% else %}
    <a href="/login">Sign in</a>
{% endif %}
```{% endraw %}
---

## Компоненты в шаблонах

Компоненты используются как элементы HTML:
{% raw %}```html
<div class="card">
    <Card title="Hello">
        <p>Child content</p>
    </Card>
</div>
```{% endraw %}
Компонент `Slot` отображает дочерние элементы (см. Модули).

---

## Необработанные блоки JS

Используйте `{{ '{{' }} '' {{ '}}' }}` для защиты `{{ '{{' }} '{{ '{{' }}' {{ '}}' }}` от анализа Jinja2 (необходимо при встраивании JS-фреймворков):
{% raw %}```html
{% raw %}
<script>
const data = {{ json_data }};
</script>
{% endraw %}{{ '{%' }} endraw {{ '%}' }}{% raw %}
```{% endraw %}
{% call Link(href="/docs/components/python") %}Next: Python in template →{% endcall %}