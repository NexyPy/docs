# "@الوحدة النمطية

يقوم بتجميع وحدات التحكم والموفرين والوحدات الفرعية في FastAPI `APIRouter`.
{% raw %}```python
from nexy.decorators import Module, Controller

"@Controller("/users")
class UsersController:
    def GET(self) -> list[dict]:
        return [{"id": 1}]

"@Module(prefix="/api")
class AppModule:
    controllers = [UsersController]
    providers = [DatabaseService]
    imports = [AuthModule]
    exports = [UsersController]
```{% endraw %}
## إمضاء
{% raw %}```python
Module(prefix: str = "") -> Callable[[type], APIRouter]
```{% endraw %}
## سمات الطبقة

| السمة | اكتب | مطلوب | الوصف |
|-----------|------|--------|-------------|
| `controllers` | `list[type]` | نعم | فئات المراقب للتسجيل |
| `providers` | `list[type]` | لا | خدمات الحقن للتسجيل في حاوية DI |
| `imports` | `list[APIRouter]` | لا | الوحدات الفرعية (التي تم إرجاعها بواسطة `"@Module`) لتضمين |
| `exports` | `list[type]` | لا | موفري الخدمة للتصدير لاستخدامهم في استيراد الوحدات النمطية |

## كيف يعمل

1. يتم إنشاء مثيل للموفرين عبر `Container.resolve()`
2. يتم تضمين الوحدات الفرعية المستوردة في جهاز التوجيه الأصلي
3. يتم تخزين الصادرات على `router.__module_exports__`
4. يتم تسجيل أساليب كل وحدة تحكم كمسارات

## مثال على الواردات/الصادرات
{% raw %}```python
from nexy.decorators import Injectable, Module

"@Injectable()
class SharedService:
    def get_data(self) -> str:
        return "shared"

"@Module(prefix="/shared")
class SharedModule:
    controllers = [SharedController]
    providers = [SharedService]
    exports = [SharedService]

"@Module(prefix="/api")
class AppModule:
    controllers = [AppController]
    imports = [SharedModule]  # SharedModule router included
```{% endraw %}