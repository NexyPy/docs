# عمليات إعادة التوجيه (معيارية)

إعادة توجيه الطلبات الواردة إلى عناوين URL الأخرى في وحدات التحكم.

## إعادة التوجيه الأساسية

{% raw %}```python
from fastapi.responses import RedirectResponse
from nexy.decorators import Controller

"@Controller("/admin")
class AdminController:
    def GET(self):
        return RedirectResponse("/login")
```{% endraw %}

## مع رمز الحالة

{% raw %}```python
from fastapi.responses import RedirectResponse
from nexy.decorators import Controller

"@Controller("/old-path")
class RedirectController:
    def GET(self):
        return RedirectResponse("/new-path", status_code=308)
```{% endraw %}

## إعادة التوجيه المشروط

{% raw %}```python
from fastapi.responses import RedirectResponse
from nexy.decorators import Controller

"@Controller("/dashboard")
class DashboardController:
    def GET(self, request):
        if not request.user.is_authenticated:
            return RedirectResponse("/login")
        return {"admin": True}
```{% endraw %}

## مرجع رمز الحالة

| الكود | الاسم | حالة الاستخدام |
|------|------|----------|
| 301 | انتقل نهائيا | تغيير عنوان URL الدائم |
| 302 | تم العثور عليه (افتراضي) | إعادة توجيه مؤقتة |
| 307 | إعادة توجيه مؤقتة | يحافظ على طريقة HTTP |
| 308 | إعادة توجيه دائمة | يحافظ على طريقة HTTP |

## الأنماط الشائعة

- إعادة توجيه المصادقة: المستخدمون غير المصادق عليهم → `/login`
- عناوين URL القديمة: المسارات القديمة ← المسارات الجديدة (301)
- إعادة التوجيه بعد الإرسال: بعد النموذج POST → صفحة النجاح (303)