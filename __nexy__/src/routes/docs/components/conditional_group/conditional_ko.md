# 조건부 렌더링

Jinja2의 `{{ '{{' }} '' {{ '}}' }}` 및 `{{ '{{' }} '' {{ '}}' }}`를 사용하여 조건에 따라 렌더링할 내용을 제어합니다.

---

## If / elif / else
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

## 삼항
{% raw %}```html
{{ "Admin" if user.role == "admin" else "User" }}
```{% endraw %}
---

## For 루프
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
`{{ '{{' }} '' {{ '}}' }}`는 목록이 비어 있을 때 렌더링됩니다.

---

## 조건부 속성
{% raw %}```html
<button {{ "disabled" if not can_submit else "" }}>
    Submit
</button>
```{% endraw %}
---

## CSS 가시성

클라이언트 측 토글의 경우 JavaScript와 결합하십시오.
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

## 패턴: 상태 기반 렌더링

강력한 UI를 위해 소품, 조건 및 루프를 결합합니다.
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