# "@البرامج الوسيطة (FBR)

قم بتطبيق استدعاءات البرامج الوسيطة على وظيفة المسار.

## عقد الوسيطة

يمكن استدعاء البرنامج الوسيط باستخدام `__call__(self, request)`. يتلقى كائن FastAPI `Request` ويعمل قبل المعالج.

{% raw %}```python
class LoggingMiddleware:
    def __call__(self, request) -> None:
        print(f"Request: {request.method} {request.url}")
```{% endraw %}

## الوسيطة على وظيفة

{% raw %}```python
from nexy.decorators import Middleware

"@Middleware(LoggingMiddleware())
def GET():
    ...
```{% endraw %}

## برمجيات وسيطة متعددة

{% raw %}```python
from nexy.decorators import Middleware

"@Middleware(LoggingMiddleware(), TimerMiddleware())
def GET():
    ...
```{% endraw %}

## إمضاء

{% raw %}```python
Middleware(*middlewares: Callable[..., Any]) -> Callable[[Any], Any]
```{% endraw %}

تعمل البرامج الوسيطة كـ FastAPI `Depends` — ويتم تشغيلها قبل المعالج. على عكس الحراس، فإن البرامج الوسيطة مخصصة للتأثيرات الجانبية (التسجيل والتوقيت)، وليس لحظر الطلبات (على الرغم من أنها يمكن أن تزيد `HTTPException`).

---

أنظر أيضا: [Middlewares](/docs/fbrouters/middlewares)، ["@Middleware reference](/docs/decorators/middleware)