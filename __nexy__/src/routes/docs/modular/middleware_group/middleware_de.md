# Middleware

Middleware fängt Anfragen ab, bevor sie den Controller erreichen (und Antworten danach). Verwenden Sie es für übergreifende Anliegen, die für viele Routen gelten: Protokollierung, Timing, CORS, Komprimierung, Header-Manipulation.

Wie Guards sind Middleware in Nexy **FastAPI-Abhängigkeiten** – aufrufbare Elemente, die die Anfrage/Antwort ändern oder die Anfrage abbrechen können.

## Warum Middleware?

Sie können die Protokollierung in jeder Controller-Methode hinzufügen:

{% raw %}```python
class UsersController:
    def GET(self):
        print(f"→ GET /users")          # Duplicated
        return [...]

class PostsController:
    def GET(self):
        print(f"→ GET /posts")          # Duplicated
        return [...]
```{% endraw %}

Middleware extrahiert dies in ein einziges aufrufbares Element, das einmal angewendet wird:

{% raw %}```python
class LoggingMiddleware:
    async def __call__(self, request: Request):
        print(f"→ {request.method} {request.url.path}")

"@Controller("/users")
"@Middleware(LoggingMiddleware())
class UsersController:
    def GET(self):
        return [...]
```{% endraw %}

## Middleware erstellen

Middleware ist ein Callable, das einen `Request` benötigt. Es kann `request.state` ändern, `HTTPException` zum Abbrechen auslösen oder durch die Rückgabe von `None` passieren:

{% raw %}```python
class LoggingMiddleware:
    async def __call__(self, request: Request):
        print(f"→ {request.method} {request.url.path}")
```{% endraw %}

Für das Timing können Sie `request.state` verwenden, um Daten an die Antwort zu übergeben:

{% raw %}```python
import time

class TimingMiddleware:
    async def __call__(self, request: Request):
        request.state.start_time = time.time()
```{% endraw %}

Fügen Sie dann einen Antwort-Hook über den `Response`-Parameter von FastAPI hinzu:

{% raw %}```python
class TimingMiddleware:
    async def __call__(self, request: Request, call_next):
        start = time.time()
        response = await call_next(request)
        elapsed = time.time() - start
        response.headers["X-Response-Time"] = f"{elapsed:.3f}s"
        return response
```{% endraw %}

**Gotcha**: Das `call_next`-Muster funktioniert für Middleware, die den gesamten Anfrage-/Antwortzyklus umschließt. Einfache Middleware, die nur vor dem Handler ausgeführt wird, benötigt nur `request`.

## Anwenden von Middleware

### Controller-Ebene

{% raw %}```python
from nexy.decorators import Controller, Middleware

"@Controller("/users")
"@Middleware(LoggingMiddleware())
class UsersController:
    def GET(self):
        return [...]
```{% endraw %}

### Methodenebene

{% raw %}```python
"@Controller("/users")
class UsersController:
    "@Middleware(TimingMiddleware())
    def GET(self):
        import time
        time.sleep(1)
        return {"done": True}
```{% endraw %}

### Modulebene

Registrieren Sie Middleware im Modul für alle Routen:

{% raw %}```python
# auth_module.py
from nexy.decorators import Module

"@Module()
class AuthModule:
    controllers = [AuthController]
```{% endraw %}

Middleware auf Modulebene wird nicht direkt über `"@Module()`-Attribute unterstützt. Für Middleware, die für alle Routen gilt, verwenden Sie die Methoden- oder Controller-Ebene oder registrieren Sie sich global über `nexyconfig.py`.

## Globale Middleware

Registrieren Sie Middleware für jede Route in der App über `nexyconfig.py`:

{% raw %}```python
# nexyconfig.py
config = {
    "useMiddlewares": [
        (CORSMiddleware, {"allow_origins": ["*"]}),
        (LoggingMiddleware, {}),
    ]
}
```{% endraw %}

Jeder Eintrag ist ein Tupel von `(middleware_class, kwargs)`. Die Kwargs werden an den Konstruktor der Middleware übergeben.

## Integrierte Middleware

Nexy enthält mehrere integrierte Middleware, die über `nexyconfig.py` konfiguriert werden kann:

| Konfigurationsschlüssel | Middleware | Beschreibung |
|------------|-----------|-------------|
| `useCORS` | `CORSMiddleware` | Ursprungsübergreifende Ressourcenfreigabe |
| `useGZip` | `GZipMiddleware` | Antwortkomprimierung |
| `useTrustedHost` | `TrustedHostMiddleware` | Host-Header-Validierung |
| `useSession` | `SessionMiddleware` | Cookie-basierte Sitzungen |
| `useHTTPSRedirect` | `HTTPSRedirectMiddleware` | HTTPS erzwingen |

{% raw %}```python
# nexyconfig.py
config = {
    "useCORS": {"allow_origins": ["https://myapp.com"]},
    "useGZip": {"minimum_size": 1000},
    "useTrustedHost": {"allowed_hosts": ["myapp.com"]},
    "useSession": {"secret_key": "your-secret-key", "max_age": 3600},
}
```{% endraw %}

Integrierte Middleware wird auf globaler Ebene vor jeder benutzerdefinierten Middleware ausgeführt.

## Middleware vs. Guards

| Aspekt | Middleware | Wache |
|--------|-----------|-------|
| Führt aus | Vor dem Handler | Vor dem Handler (nach der Middleware) |
| Hauptzweck | Protokollierung, Header, Komprimierung | Authentifizierung, Autorisierung, Zugriffskontrolle |
| Muster | `__call__(self, request)` | `__call__(self, request)` |
| Abbruch | Erhöhen Sie `HTTPException` | Erhöhen Sie `HTTPException` |
| Daten übergeben | `request.state` | `request.state` |

In der Praxis werden Middleware und Guards auf die gleiche Weise implementiert (FastAPI-Abhängigkeiten). Die Unterscheidung ist konzeptioneller Natur: Middleware modifiziert Anfragen/Antworten, Wächter treffen Entscheidungen zur Zugriffskontrolle.

## Fehlerbehandlung in Middleware

Middleware kann mithilfe des `call_next`-Musters Fehler abfangen und benutzerdefinierte Antworten zurückgeben:

{% raw %}```python
class ErrorHandlerMiddleware:
    async def __call__(self, request: Request, call_next):
        try:
            return await call_next(request)
        except Exception as e:
            return JSONResponse(
                status_code=500,
                content={"error": str(e)},
            )
```{% endraw %}

## Best Practices

1. **Ein Problem pro Middleware** – Protokollierung, Timing, CORS. Keine einzige „große Middleware“.
2. **Middleware schnell halten** – Middleware blockiert die Anfrage. Teure Operationen gehören in den Handler.
3. **Verwenden Sie `request.state` zum Übergeben von Daten** – dies ist die Standardmethode zum Teilen von Daten zwischen Middleware, Wächtern und Handlern.
4. **Bevorzugen Sie Guards für die Authentifizierung** – konzeptionell klarer als Middleware für die Zugriffskontrolle.
5. **Middleware isoliert testen** – ein simuliertes `Request` erstellen, die Middleware aufrufen, Nebenwirkungen feststellen.

## Nächste Schritte

- [Guards](/docs/modular/guards) – Authentifizierung und Autorisierung
- [Controllers](/docs/modular/controllers) – Routenhandler definieren
- [Modules](/docs/modular/modules) – in Funktionsmodulen organisieren