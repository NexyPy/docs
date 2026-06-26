#“@Injectable

将类标记为由 Nexy 的依赖项注入容器管理。
{% raw %}```python
from nexy.decorators import Injectable

"@Injectable()
class DatabaseService:
    def query(self, sql: str) -> list[dict]:
        ...
```{% endraw %}
＃＃ 签名
{% raw %}```python
Injectable(scope: Scope = Scope.SINGLETON) -> Callable[[type], type]
```{% endraw %}
## 范围

|范围 |行为 |
|------|----------|
| `Scope.SINGLETON`（默认）|跨应用程序共享一个实例 |
| `Scope.REQUEST` |每个 HTTP 请求的新实例 |
| `Scope.TRANSIENT` |每次解决都会有新实例 |
{% raw %}```python
from nexy.decorators import Injectable, Scope

"@Injectable(Scope.REQUEST)
class RequestContext:
    def __init__(self):
        self.user_id: str | None = None
```{% endraw %}
## 依赖注入

当类型可注入时，构造函数参数会自动解析：
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
## 容器

如果需要，可以直接访问容器：
{% raw %}```python
from nexy.decorators import Container

service = Container.resolve(DatabaseService)
```{% endraw %}
## 限制

- `"@Injectable()` 类无法在 DI 上下文之外手动实例化
- 循环依赖提高`RecursionError`
- 没有默认值的构造函数参数必须是可注入类型