# "@Injetável

Marca uma classe como gerenciada pelo contêiner de injeção de dependência do Nexy.
{% raw %}```python
from nexy.decorators import Injectable

"@Injectable()
class DatabaseService:
    def query(self, sql: str) -> list[dict]:
        ...
```{% endraw %}
## Assinatura
{% raw %}```python
Injectable(scope: Scope = Scope.SINGLETON) -> Callable[[type], type]
```{% endraw %}
## Escopo

| Escopo | Comportamento |
|-------|-----------|
| `Scope.SINGLETON` (padrão) | Uma instância compartilhada no aplicativo |
| `Scope.REQUEST` | Nova instância por solicitação HTTP |
| `Scope.TRANSIENT` | Nova instância sempre que for resolvida |
{% raw %}```python
from nexy.decorators import Injectable, Scope

"@Injectable(Scope.REQUEST)
class RequestContext:
    def __init__(self):
        self.user_id: str | None = None
```{% endraw %}
## Injeção de dependência

Os parâmetros do construtor são resolvidos automaticamente quando os tipos são injetáveis:
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
## Contêiner

Acesse o contêiner diretamente, se necessário:
{% raw %}```python
from nexy.decorators import Container

service = Container.resolve(DatabaseService)
```{% endraw %}
## Restrições

- As classes `"@Injectable()` não podem ser instanciadas manualmente fora do contexto DI
- Dependências circulares aumentam `RecursionError`
- Os parâmetros do construtor sem padrões devem ser tipos injetáveis