# "@Inyectable

Marca una clase como administrada por el contenedor de inyección de dependencias de Nexy.
{% raw %}```python
from nexy.decorators import Injectable

"@Injectable()
class DatabaseService:
    def query(self, sql: str) -> list[dict]:
        ...
```{% endraw %}
## Firma
{% raw %}```python
Injectable(scope: Scope = Scope.SINGLETON) -> Callable[[type], type]
```{% endraw %}
## Alcance

| Alcance | Comportamiento |
|-------|-----------|
| `Scope.SINGLETON` (predeterminado) | Una instancia compartida en toda la aplicación |
| `Scope.REQUEST` | Nueva instancia por solicitud HTTP |
| `Scope.TRANSIENT` | Nueva instancia cada vez que se resuelve |
{% raw %}```python
from nexy.decorators import Injectable, Scope

"@Injectable(Scope.REQUEST)
class RequestContext:
    def __init__(self):
        self.user_id: str | None = None
```{% endraw %}
## Inyección de dependencia

Los parámetros del constructor se resuelven automáticamente cuando los tipos son inyectables:
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
## Contenedor

Acceda al contenedor directamente si es necesario:
{% raw %}```python
from nexy.decorators import Container

service = Container.resolve(DatabaseService)
```{% endraw %}
## Restricciones

- Las clases `"@Injectable()` no se pueden crear instancias manualmente fuera del contexto DI
- Las dependencias circulares aumentan `RecursionError`
- Los parámetros del constructor sin valores predeterminados deben ser tipos inyectables.