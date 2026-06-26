# "@Injectable

Marks a class as managed by Nexy's dependency injection container.
{% raw %}```python
from nexy.decorators import Injectable

"@Injectable()
class DatabaseService:
    def query(self, sql: str) -> list[dict]:
        ...
```{% endraw %}
## Signature
{% raw %}```python
Injectable(scope: Scope = Scope.SINGLETON) -> Callable[[type], type]
```{% endraw %}
## Scope

| Scope | Behaviour |
|-------|-----------|
| `Scope.SINGLETON` (default) | One instance shared across the app |
| `Scope.REQUEST` | New instance per HTTP request |
| `Scope.TRANSIENT` | New instance every time it's resolved |
{% raw %}```python
from nexy.decorators import Injectable, Scope

"@Injectable(Scope.REQUEST)
class RequestContext:
    def __init__(self):
        self.user_id: str | None = None
```{% endraw %}
## Dependency injection

Constructor parameters are resolved automatically when the types are injectable:
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
## Container

Access the container directly if needed:
{% raw %}```python
from nexy.decorators import Container

service = Container.resolve(DatabaseService)
```{% endraw %}
## Restrictions

- `"@Injectable()` classes cannot be instantiated manually outside of DI context
- Circular dependencies raise `RecursionError`
- Constructor parameters without defaults must be injectable types