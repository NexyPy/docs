# كتابة العلامات مع Nexy

تستخدم قوالب Nexy **HTML** + **Jinja2** للمحتوى الديناميكي.
إذا كنت تعرف HTML وJinja2، فأنت تعرف بالفعل قوالب Nexy.

---

## استيفاء النص
{% raw %}```html
{{ title }}
{{ description }}
```{% endraw %}
تأتي المتغيرات من المادة الأمامية أو من الدعائم.

---

## المرشحات

تقوم مرشحات Jinja2 بتحويل القيم:
{% raw %}```html
{{ content | safe }}
{{ name | upper }}
{{ price | round(2) }}
```{% endraw %}
يقوم `| safe` بوضع علامة على السلسلة على أنها HTML آمن (بدون هروب تلقائي).

---

## للحلقات
{% raw %}```html
<ul>
{% for item in items %}
    {{ item.name }}
{% endfor %}
</ul>
```{% endraw %}
---

##إذا/إلا
{% raw %}```html
{% if user %}
    <p>Welcome, {{ user.name }}!</p>
{% else %}
    <a href="/login">Sign in</a>
{% endif %}
```{% endraw %}
---

## المكونات في القوالب

يتم استخدام المكونات مثل عناصر HTML:
{% raw %}```html
<div class="card">
    <Card title="Hello">
        <p>Child content</p>
    </Card>
</div>
```{% endraw %}
يعرض المكون `Slot` الأطفال (انظر الوحدات).

---

## كتل JS الخام

استخدم `{{ '{{' }} '' {{ '}}' }}` لحماية `{{ '{{' }} '{{ '{{' }}' {{ '}}' }}` من تحليل Jinja2 (مطلوب عند تضمين أطر عمل JS):
{% raw %}```html
{% raw %}
<script>
const data = {{ json_data }};
</script>
{% endraw %}{{ '{%' }} endraw {{ '%}' }}{% raw %}
```{% endraw %}
{% call Link(href="/docs/components/python") %}Next: Python in template →{% endcall %}