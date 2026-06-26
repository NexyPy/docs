# "@Injectable

Markiert eine Klasse als vom Abhängigkeitsinjektionscontainer von Nexy verwaltet.
{% raw %}```python
from nexy.decorators import Injectable

"@Injectable()
class DatabaseService:
    def query(self, sql: str) -> list[dict]:
        ...
```{% endraw %}
## Unterschrift
{% raw %}```python
Injectable(scope: Scope = Scope.SINGLETON) -> Callable[[type], type]
```{% endraw %}
## Geltungsbereich

| Geltungsbereich | Verhalten |
|-------|-----------|
| `Scope.SINGLETON` (Standard) | Eine in der gesamten App freigegebene Instanz |
| `Scope.REQUEST` | Neue Instanz pro HTTP-Anfrage |
| `Scope.TRANSIENT` | Neue Instanz jedes Mal, wenn sie aufgelöst wird |
{% raw %}```python
from nexy.decorators import Injectable, Scope

"@Injectable(Scope.REQUEST)
class RequestContext:
    def __init__(self):
        self.user_id: str | None = None
```{% endraw %}
## Abhängigkeitsinjektion

Konstruktorparameter werden automatisch aufgelöst, wenn die Typen injizierbar sind:
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
## Behälter

Greifen Sie bei Bedarf direkt auf den Container zu:
{% raw %}```python
from nexy.decorators import Container

service = Container.resolve(DatabaseService)
```{% endraw %}
## Einschränkungen

– `"@Injectable()`-Klassen können außerhalb des DI-Kontexts nicht manuell instanziiert werden
- Zirkuläre Abhängigkeiten erhöhen `RecursionError`
– Konstruktorparameter ohne Standardwerte müssen injizierbare Typen sein