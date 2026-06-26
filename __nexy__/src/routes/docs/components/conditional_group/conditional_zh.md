# 条件渲染

使用 Jinja2 的 `{{ '{{' }} '' {{ '}}' }}` 和 `{{ '{{' }} '' {{ '}}' }}` 根据条件控制渲染内容。

---

## 如果/elif/else
{% raw %}```
---
is_logged_in: prop[bool] = False
---
{% if is_logged_in %}
    <p>Welcome back!</p>
{% else %}
    <a href="/login">Sign in</a>
{% endif %}
```{% endraw %}
---

## 三元
{% raw %}```html
{{ "Admin" if user.role == "admin" else "User" }}
```{% endraw %}
---

## For 循环
{% raw %}```
---
tags: prop[list] = []
---
<ul>
{% for tag in tags %}
    {{ tag }}
{% else %}
    <li>No tags</li>
{% endfor %}
</ul>
```{% endraw %}
`{{ '{{' }} '' {{ '}}' }}` 当列表为空时呈现。

---

## 条件属性
{% raw %}```html
<button {{ "disabled" if not can_submit else "" }}>
    Submit
</button>
```{% endraw %}
---

## CSS 可见性

对于客户端切换，请与 JavaScript 结合使用：
{% raw %}```
---
---
<div id="toggle-me" class="hidden">Content</div>
<button onclick="document.getElementById('toggle-me').classList.toggle('hidden')">
    Toggle
</button>
<style>
.hidden { display: none; }
</style>
```{% endraw %}
---

## 模式：基于状态的渲染

组合 props、条件和循环以获得强大的 UI：
{% raw %}```
---
items: prop[list] = []
empty_message: prop[str] = "No items"
---
{% if items %}
    <ul>
    {% for item in items %}
        <li class="{{ 'active' if item.active else '' }}">
            {{ item.name }}
        </li>
    {% endfor %}
    </ul>
{% else %}
    <p class="empty">{{ empty_message }}</p>
{% endif %}
```{% endraw %}
{% call Link(href="/docs/components/modules") %}Next: Module System →{% endcall %}