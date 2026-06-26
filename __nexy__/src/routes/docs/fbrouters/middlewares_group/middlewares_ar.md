#الوسيطة

البرنامج الوسيط عبارة عن طبقة يتم تشغيلها قبل وبعد كل طلب، وهي مفيدة للتسجيل والمصادقة ورؤوس CORS وغيرها من الاهتمامات العالمية.

---

## إنشاء وسيطة

في Nexy، يتم تعريف البرامج الوسيطة عبر `BaseHTTPMiddleware` الخاصة بـ Starlette أو كقابلة للاستدعاء:
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

## تسجيل الوسيطة

في `nexyconfig.py`، قم بتمرير قائمة `(MiddlewareClass, kwargs_dict)` من المجموعات:
{% raw %}```python
from nexy.core.models import NexyConfigModel
from src.middlewares import LoggingMiddleware

class NexyConfig(NexyConfigModel):
    useMiddlewares = [
        (LoggingMiddleware, {}),
    ]
```{% endraw %}
---

##أمر التنفيذ

تعمل البرامج الوسيطة بترتيب الإعلان، وتشكل **مكدس** (مثل Starlette):
{% raw %}```text
Request → MW1 → MW2 → Route → MW2 → MW1 → Response
```{% endraw %}
---

## البرمجيات الوسيطة على مستوى الدليل (FBR)

باستخدام FBR، يمكنك وضع منطق البرامج الوسيطة في `dependencies.py` داخل الدليل:
{% raw %}```python
# routes/api/dependencies.py
from fastapi import Request

async def verify_api_key(request: Request):
    if request.headers.get("X-API-Key") != "secret":
        from fastapi import HTTPException
        raise HTTPException(status_code=403)
```{% endraw %}
كل صفحة ضمن `/api/` ترث هذا الاختيار تلقائيًا.
{% call Link(href="/docs/fbrouters/route_handlers") %}Next: Route Handlers →{% endcall %}