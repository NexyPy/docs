# मिडिलवेयर

मिडलवेयर एक परत है जो हर अनुरोध से पहले और बाद में चलती है - लॉगिंग, प्रमाणीकरण, सीओआरएस हेडर और अन्य वैश्विक चिंताओं के लिए उपयोगी।

---

## एक मिडलवेयर बनाना

नेक्सी में, मिडलवेयर को स्टारलेट के `BaseHTTPMiddleware` या कॉलेबल्स के माध्यम से परिभाषित किया गया है:
{% raw %}```python
# src/middlewares.py
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request

class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        print(f"→ {request.method} {request.url.path}")
        response = await call_next(request)
        print(f"← {response.status_code}")
        return response
```{% endraw %}
---

## एक मिडलवेयर पंजीकृत करना

`nexyconfig.py` में, `(MiddlewareClass, kwargs_dict)` टुपल्स की सूची पास करें:
{% raw %}```python
from nexy.core.models import NexyConfigModel
from src.middlewares import LoggingMiddleware

class NexyConfig(NexyConfigModel):
    useMiddlewares = [
        (LoggingMiddleware, {}),
    ]
```{% endraw %}
---

## निष्पादन आदेश

मिडलवेयर घोषणा क्रम में चलते हैं, एक **स्टैक** बनाते हैं (स्टारलेट की तरह):
{% raw %}```text
Request → MW1 → MW2 → Route → MW2 → MW1 → Response
```{% endraw %}
---

## निर्देशिका-स्तरीय मिडलवेयर (FBR)

FBR के साथ, आप एक निर्देशिका के भीतर `dependencies.py` में मिडलवेयर लॉजिक रख सकते हैं:
{% raw %}```python
# routes/api/dependencies.py
from fastapi import Request

async def verify_api_key(request: Request):
    if request.headers.get("X-API-Key") != "secret":
        from fastapi import HTTPException
        raise HTTPException(status_code=403)
```{% endraw %}
`/api/` के अंतर्गत प्रत्येक पृष्ठ को यह चेक स्वचालित रूप से प्राप्त होता है।
{% call Link(href="/docs/fbrouters/route_handlers") %}Next: Route Handlers →{% endcall %}