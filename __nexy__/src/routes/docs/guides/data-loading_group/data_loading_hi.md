# डेटा लोड हो रहा है

नेक्सी डेटा लोड करने के लिए दो परतें प्रदान करता है: **संकलन-समय** `.nexy` फ्रंटमैटर में, और **अनुरोध-समय** हुक के माध्यम से।

## संकलन-समय डेटा (फ्रंटमैटर)

`.nexy` फ़ाइलों में `---` ब्लॉक पायथन है जो संकलन समय पर निष्पादित होता है। वहां परिभाषित वेरिएबल टेम्पलेट में उपलब्ध हैं:

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

आप सीधे JSON डेटा भी आयात कर सकते हैं:

{% raw %}```nexy
---
import "./data.json" as data
---
{{ data | tojson }}
```{% endraw %}

## अनुरोध-समय डेटा (हुक)

HTTP अनुरोध के दौरान हुक चलते हैं और अनुरोध संदर्भ तक पहुंच होती है:

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

## एपीआई रूट हैंडलर

डेटाबेस या बाहरी एपीआई से आने वाले डेटा के लिए, `.py` फ़ाइल में एक समर्पित एपीआई हैंडलर बनाएं:

{% raw %}```python
# src/routes/api/items.py
from myapp.db import get_items

def GET():
    return get_items()

def POST(data: dict):
    # data is parsed from request body automatically
    return {"created": True, "id": data.get("id")}
```{% endraw %}

फिर इसे अपने पेज से `fetch` या सर्वर-साइड इनक्लूड के माध्यम से कॉल करें।

## डायनामिक में `useViews` शामिल है

अनुरोध समय पर वर्तमान पृष्ठ के अंदर किसी अन्य पृष्ठ के घटक को प्रस्तुत करें:

{% raw %}```python
from nexy import useViews
sidebar = useViews("/components/sidebar.nexy", {"active": "docs"})
```{% endraw %}

एक `HTMLResponse` लौटाता है जिसे आप अपने टेम्पलेट में एम्बेड कर सकते हैं।