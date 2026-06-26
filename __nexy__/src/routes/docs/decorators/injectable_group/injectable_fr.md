# "@Injectable

Marque une classe comme gérée par le conteneur d'injection de dépendances de Nexy.
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
## Portée

| Portée | Comportement |
|-------|---------------|
| `Scope.SINGLETON` (par défaut) | Une instance partagée dans l'application |
| `Scope.REQUEST` | Nouvelle instance par requête HTTP |
| `Scope.TRANSIENT` | Nouvelle instance à chaque fois résolue |
{% raw %}```python
from nexy.decorators import Injectable, Scope

"@Injectable(Scope.REQUEST)
class RequestContext:
    def __init__(self):
        self.user_id: str | None = None
```{% endraw %}
## Injection de dépendances

Les paramètres du constructeur sont résolus automatiquement lorsque les types sont injectables :
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
## Conteneur

Accédez directement au conteneur si nécessaire :
{% raw %}```python
from nexy.decorators import Container

service = Container.resolve(DatabaseService)
```{% endraw %}
##Restrictions

- Les classes `"@Injectable()` ne peuvent pas être instanciées manuellement en dehors du contexte DI
- Les dépendances circulaires augmentent `RecursionError`
- Les paramètres du constructeur sans valeurs par défaut doivent être des types injectables