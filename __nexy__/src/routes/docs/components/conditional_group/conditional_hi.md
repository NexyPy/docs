# सशर्त प्रतिपादन

Jinja2 के `{{ '{{' }} '' {{ '}}' }}` और `{{ '{{' }} '' {{ '}}' }}` का उपयोग करके शर्तों के आधार पर नियंत्रित करें कि क्या प्रस्तुत होता है।

---

## यदि / एलिफ़ / अन्यथा
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

## टर्नरी
{% raw %}```html
{{ "Admin" if user.role == "admin" else "User" }}
```{% endraw %}
---

## लूप के लिए
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
सूची खाली होने पर `{{ '{{' }} '' {{ '}}' }}` रेंडर करता है।

---

## सशर्त गुण
{% raw %}```html
<button {{ "disabled" if not can_submit else "" }}>
    Submit
</button>
```{% endraw %}
---

## सीएसएस दृश्यता

क्लाइंट-साइड टॉगलिंग के लिए, जावास्क्रिप्ट के साथ संयोजन करें:
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

## पैटर्न: राज्य-आधारित प्रतिपादन

शक्तिशाली यूआई के लिए प्रॉप्स, शर्तें और लूप को मिलाएं:
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