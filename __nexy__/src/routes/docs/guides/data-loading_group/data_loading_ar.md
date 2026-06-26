# تحميل البيانات

يوفر Nexy طبقتين لتحميل البيانات: **وقت الترجمة** في المادة الأمامية `.nexy`، و**وقت الطلب** عبر الخطافات.

## بيانات وقت الترجمة (المسألة الأمامية)

الكتلة `---` في ملفات `.nexy` هي لغة Python التي يتم تنفيذها في وقت الترجمة. المتغيرات المحددة هناك متوفرة في القالب:

{% raw %}```nexy
---
import json
from src.data import get_items
items = get_items()
total = len(items)
---
<ul>
{% for item in items %}
  {{ item.name }}
{% endfor %}
</ul>
<p>Total: {{ total }} items</p>
```{% endraw %}

يمكنك أيضًا استيراد بيانات JSON مباشرةً:

{% raw %}```nexy
---
import "./data.json" as data
---
{{ data | tojson }}
```{% endraw %}

## بيانات وقت الطلب (الخطافات)

تعمل الخطافات أثناء طلب HTTP ولها حق الوصول إلى سياق الطلب:

{% raw %}```python
from nexy import useQuery, useSearchParams, useSession, useCookies

# URL path parameters (from [param] in filename)
id = useQuery("id")

# Query string parameters
params = useSearchParams()  # {"page": "1", "sort": "asc"}

# Session data (requires session middleware)
user = useSession().get("user")

# Cookies
token = useCookies().get("token")
```{% endraw %}

## معالجات مسار API

بالنسبة للبيانات التي تأتي من قاعدة بيانات أو واجهة برمجة تطبيقات خارجية، قم بإنشاء معالج API مخصص في ملف `.py`:

{% raw %}```python
# src/routes/api/items.py
from myapp.db import get_items

def GET():
    return get_items()

def POST(data: dict):
    # data is parsed from request body automatically
    return {"created": True, "id": data.get("id")}
```{% endraw %}

ثم اتصل بها من صفحتك عبر `fetch` أو تضمين من جانب الخادم.

## يتضمن ديناميكيًا مع `useViews`

عرض مكون صفحة أخرى داخل الصفحة الحالية في وقت الطلب:

{% raw %}```python
from nexy import useViews
sidebar = useViews("/components/sidebar.nexy", {"active": "docs"})
```{% endraw %}

يُرجع `HTMLResponse` الذي يمكنك تضمينه في القالب الخاص بك.