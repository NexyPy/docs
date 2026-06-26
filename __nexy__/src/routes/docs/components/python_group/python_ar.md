# بايثون في قالب Nexy

يقوم الجزء الأمامي (`---`) بتشغيل لغة Python في وقت الترجمة وعند كل طلب.

---

## ما يمكنك فعله

### استيراد الوحدات
{% raw %}```python
---
import json
from datetime import datetime
from nexy import usePathname
from "@components/card.nexy" import Card
---
```{% endraw %}
### تشغيل التعبيرات
{% raw %}```python
---
items = [1, 2, 3]
now = datetime.now()
is_admin = user.role == "admin"
---
```{% endraw %}
### استخدم الخطافات
{% raw %}```python
---
from nexy import usePathname, useSearchParams, useCookies
pathname = usePathname()
params = useSearchParams()
cookies = useCookies()
---
```{% endraw %}
### بيانات طلب الوصول
{% raw %}```python
---
from fastapi import Request
# request is injected automatically
---
```{% endraw %}
---

## وقت الترجمة مقابل وقت التشغيل

| عملية | متى | مثال |
|---|---|---|
| `import` | تجميع | استيراد المكونات |
| `prop[type]` | تجميع | الدعائم التي تم فحصها من النوع |
| خطاف | طلب | `usePathname()` |
| المتغيرات | طلب | `user = request.user` |

المتغيرات المحددة في المادة الأمامية متوفرة في القالب:
{% raw %}```python
---
from datetime import datetime
year = datetime.now().year
---
<footer>&copy; {{ year }} Nexy</footer>
```{% endraw %}
---

## المنطق المشترك

للحصول على منطق بايثون القابل لإعادة الاستخدام، قم بإنشاء ملف `.py` عادي:
{% raw %}```python
# src/utils/helpers.py
def format_date(dt):
    return dt.strftime("%B %d, %Y")
```{% endraw %}
الاستيراد من أي مكون:
{% raw %}```python
---
from src.utils.helpers import format_date
from datetime import datetime
---
{{ format_date(datetime.now()) }}
```{% endraw %}
{% call Link(href="/docs/components/properties") %}Next: Properties →{% endcall %}