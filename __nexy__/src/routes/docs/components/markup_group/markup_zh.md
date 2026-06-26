# 使用 Nexy 编写标记

Nexy 模板使用 **HTML** + **Jinja2** 来呈现动态内容。
如果您了解 HTML 和 Jinja2，那么您就已经了解 Nexy 模板。

---

## 文本插值
{% raw %}```html
{{ title }}
{{ description }}
```{% endraw %}
变量来自 frontmatter 或 props。

---

## 过滤器

Jinja2 过滤变换值：
{% raw %}```html
{{ content | safe }}
{{ name | upper }}
{{ price | round(2) }}
```{% endraw %}
`| safe` 将字符串标记为安全 HTML（无自动转义）。

---

## For 循环
{% raw %}```html
<ul>
{% for item in items %}
    {{ item.name }}
{% endfor %}
</ul>
```{% endraw %}
---

## 如果/否则
{% raw %}```html
{% if user %}
    <p>Welcome, {{ user.name }}!</p>
{% else %}
    <a href="/login">Sign in</a>
{% endif %}
```{% endraw %}
---

## 模板中的组件

组件的使用方式与 HTML 元素类似：
{% raw %}```html
<div class="card">
    <Card title="Hello">
        <p>Child content</p>
    </Card>
</div>
```{% endraw %}
`Slot` 组件渲染子组件（请参阅模块）。

---

## 原始 JS 块

使用 `{{ '{{' }} '' {{ '}}' }}` 保护 `{{ '{{' }} '{{ '{{' }}' {{ '}}' }}` 免受 Jinja2 解析（嵌入 JS 框架时需要）：
{% raw %}```html
{% raw %}
<script>
const data = {{ json_data }};
</script>
{% endraw %}{{ '{%' }} endraw {{ '%}' }}{% raw %}
```{% endraw %}
{% call Link(href="/docs/components/python") %}Next: Python in template →{% endcall %}