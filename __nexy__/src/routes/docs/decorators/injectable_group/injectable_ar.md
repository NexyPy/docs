# "@الحقن

وضع علامة على فئة على أنها مُدارة بواسطة حاوية حقن التبعية الخاصة بـ Nexy.
{% raw %}```python
from nexy.decorators import Injectable

"@Injectable()
class DatabaseService:
    def query(self, sql: str) -> list[dict]:
        ...
```{% endraw %}
## إمضاء
{% raw %}```python
Injectable(scope: Scope = Scope.SINGLETON) -> Callable[[type], type]
```{% endraw %}
## النطاق

| النطاق | السلوك |
|-------|-----------|
| `Scope.SINGLETON` (افتراضي) | تمت مشاركة مثيل واحد عبر التطبيق |
| `Scope.REQUEST` | مثيل جديد لكل طلب HTTP |
| `Scope.TRANSIENT` | مثيل جديد في كل مرة يتم حلها |
{% raw %}```python
from nexy.decorators import Injectable, Scope

"@Injectable(Scope.REQUEST)
class RequestContext:
    def __init__(self):
        self.user_id: str | None = None
```{% endraw %}
## حقن التبعية

يتم حل معلمات المُنشئ تلقائيًا عندما تكون الأنواع قابلة للحقن:
{% raw %}```python
"@Injectable()
class UserService:
    def __init__(self, db: DatabaseService):  # DatabaseService resolved by Container
        self.db = db

"@Injectable()
class DatabaseService:
    def connect(self) -> None:
        ...
```{% endraw %}
##حاوية

الوصول إلى الحاوية مباشرة إذا لزم الأمر:
{% raw %}```python
from nexy.decorators import Container

service = Container.resolve(DatabaseService)
```{% endraw %}
## القيود

- لا يمكن إنشاء فئات `"@Injectable()` يدويًا خارج سياق DI
- التبعيات الدائرية ترفع `RecursionError`
- يجب أن تكون معلمات المنشئ بدون الإعدادات الافتراضية من الأنواع القابلة للحقن