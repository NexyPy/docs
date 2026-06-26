# नेक्सी के साथ मार्कअप लिखना

गतिशील सामग्री के लिए नेक्सी टेम्प्लेट **HTML** + **Jinja2** का उपयोग करते हैं।
यदि आप HTML और Jinja2 जानते हैं, तो आप Nexy टेम्प्लेट पहले से ही जानते हैं।

---

## पाठ प्रक्षेप
{% raw %}```html
{{ title }}
{{ description }}
```{% endraw %}
वेरिएबल फ्रंटमैटर से या प्रॉप्स से आते हैं।

---

## फ़िल्टर

Jinja2 फ़िल्टर मानों को परिवर्तित करते हैं:
{% raw %}```html
{{ content | safe }}
{{ name | upper }}
{{ price | round(2) }}
```{% endraw %}
`| safe` एक स्ट्रिंग को सुरक्षित HTML (कोई स्वचालित-एस्केपिंग नहीं) के रूप में चिह्नित करता है।

---

## लूप के लिए
{% raw %}```html
<ul>
{% for item in items %}
    {{ item.name }}
{% endfor %}
</ul>
```{% endraw %}
---

## यदि/अन्यथा
{% raw %}```html
{% if user %}
    <p>Welcome, {{ user.name }}!</p>
{% else %}
    <a href="/login">Sign in</a>
{% endif %}
```{% endraw %}
---

## टेम्पलेट्स में घटक

घटकों का उपयोग HTML तत्वों की तरह किया जाता है:
{% raw %}```html
<div class="card">
    <Card title="Hello">
        <p>Child content</p>
    </Card>
</div>
```{% endraw %}
`Slot` घटक बच्चों को प्रस्तुत करता है (मॉड्यूल देखें)।

---

## कच्चे जेएस ब्लॉक

`{{ '{{' }} '{{ '{{' }}' {{ '}}' }}` को Jinja2 पार्सिंग से बचाने के लिए `{{ '{{' }} '' {{ '}}' }}` का उपयोग करें (JS फ्रेमवर्क को एम्बेड करते समय आवश्यक):
{% raw %}```html
{% raw %}
<script>
const data = {{ json_data }};
</script>
{% endraw %}{{ '{%' }} endraw {{ '%}' }}{% raw %}
```{% endraw %}
{% call Link(href="/docs/components/python") %}Next: Python in template →{% endcall %}