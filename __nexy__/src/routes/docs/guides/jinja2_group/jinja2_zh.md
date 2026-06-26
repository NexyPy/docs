#金贾2

Nexy 使用 **Jinja2** 作为其模板引擎。 Every `.nexy` file's template block is rendered as a Jinja2 template.

---

## 语法

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

## 模板上下文

模板上下文包括：

- 在 frontmatter 中声明的所有道具 (`item: prop[type]`)
- 自动注入助手：`Slot`、`trans`、`t`、`__current_locale`、`__Import`、`__Template`
- 额外道具：`caller`、`children`

---

## 过滤器

Jinja2 的所有内置过滤器均可用：

{% raw %}```nexy
{{ description | truncate(100) }}
{{ created_at | date(format="short") }}
{{ content | safe }}
{{ name | title }}
```{% endraw %}

---

## 宏

Jinja2 宏在 `.nexy` 文件中工作：

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

## 降价

`.mdx` 文件呈现为 Markdown，然后包装在布局模板中。标准 Jinja2 语法也适用于 `.mdx` 内部。

---

## 空白控制

Jinja2 的空白控制在 `.nexy` 文件中工作：

{% raw %}```nexy
{%- for item in items -%}
    {{ item }}
{%- endfor -%}
```{% endraw %}

使用 `{{ '{%' }}-` 和 `-{{ '%}' }}` 去除控制块周围的空白。