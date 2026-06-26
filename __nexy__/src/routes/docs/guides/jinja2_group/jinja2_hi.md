# जिन्जा2

नेक्सी अपने टेम्पलेट इंजन के रूप में **Jinja2** का उपयोग करता है। प्रत्येक `.nexy` फ़ाइल का टेम्प्लेट ब्लॉक Jinja2 टेम्प्लेट के रूप में प्रस्तुत किया गया है।

---

## सिंटेक्स

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

## टेम्पलेट संदर्भ

टेम्पलेट संदर्भ में शामिल हैं:

- फ्रंटमैटर में घोषित सभी प्रॉप्स (`item: prop[type]`)
- ऑटो-इंजेक्टेड सहायक: `Slot`, `trans`, `t`, `__current_locale`, `__Import`, `__Template`
- अतिरिक्त प्रॉप्स: `caller`, `children`

---

## फ़िल्टर

सभी Jinja2 अंतर्निर्मित फ़िल्टर उपलब्ध हैं:

{% raw %}```nexy
{{ description | truncate(100) }}
{{ created_at | date(format="short") }}
{{ content | safe }}
{{ name | title }}
```{% endraw %}

---

## मैक्रोज़

Jinja2 मैक्रोज़ `.nexy` फ़ाइलों में काम करते हैं:

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

## मार्कडाउन

`.mdx` फ़ाइलें मार्कडाउन के रूप में प्रस्तुत की जाती हैं और फिर लेआउट टेम्पलेट में लपेटी जाती हैं। मानक Jinja2 सिंटैक्स `.mdx` के अंदर भी काम करता है।

---

## व्हाइटस्पेस नियंत्रण

Jinja2 का व्हाइटस्पेस नियंत्रण `.nexy` फ़ाइलों में काम करता है:

{% raw %}```nexy
{%- for item in items -%}
    {{ item }}
{%- endfor -%}
```{% endraw %}

नियंत्रण ब्लॉकों के आसपास रिक्त स्थान हटाने के लिए `{{ '{%' }}-` और `-{{ '%}' }}` का उपयोग करें।