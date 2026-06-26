# Komplettlösung zur Authentifizierung

Dieser Leitfaden erstellt die Anmeldung, Abmeldung und ein geschütztes Dashboard mithilfe sitzungsbasierter Authentifizierung von Grund auf.

## 1. Aktivieren Sie die Sitzungs-Middleware

Aktivieren Sie in `nexyconfig.py` `useSession` – die signierten Cookie-Sitzungen von Starlette:

{% raw %}```python
class NexyConfig(NexyConfigModel):
    useSession = {"secret_key": "change-me-in-production"}
```{% endraw %}

Optionen finden Sie unter [Session config](/docs/config/session).

## 2. Backend und Konfiguration authentifizieren

Erstellen Sie ein Backend, das die Benutzer-ID aus der Sitzung liest:

{% raw %}```python
# src/auth.py
from starlette.authentication import AuthCredentials, AuthenticationBackend, SimpleUser

class SessionAuthBackend(AuthenticationBackend):
    async def authenticate(self, conn):
        user_id = conn.session.get("user_id")
        if user_id:
            return AuthCredentials(["authenticated"]), SimpleUser(user_id)
        return None
```{% endraw %}

Fügen Sie es zur Konfiguration hinzu:

{% raw %}```python
class NexyConfig(NexyConfigModel):
    useSession = {"secret_key": "change-me"}
    useAuth = {"backend": SessionAuthBackend()}
```{% endraw %}

Weitere Backend-Typen (Token, JWT) finden Sie unter [Authentication reference](/docs/security/authentication).

## 3. Anmeldeseite

{% raw %}```nexy
# src/routes/login.nexy
---
from nexy import useSession
from src.db import authenticate_user

def POST(username: str, password: str):
    user = authenticate_user(username, password)
    if not user:
        return {"error": "Invalid credentials"}
    session = useSession()
    session["user_id"] = user.id
    return Redirect("/dashboard")
---
<form method="POST">
  <input name="username" placeholder="Username">
  <input name="password" type="password" placeholder="Password">
  <button>Sign in</button>
</form>
```{% endraw %}

## 4. Geschütztes Dashboard

Schützen Sie das Dashboard mit einem Wächter – gibt bei Authentifizierung `{"user": ...}` zurück, andernfalls 401:

{% raw %}```nexy
# src/routes/dashboard.nexy
---
from nexy.decorators import UseGuard
from starlette.authentication import requires

"@UseGuard(requires("authenticated"))
def GET(request):
    return {"user": request.user.username}
---
<h1>Dashboard</h1>
<p>Welcome, {{ user }}!</p>
```{% endraw %}

Informationen zum Schreiben benutzerdefinierter Schutzvorrichtungen finden Sie unter [Authorization](/docs/security/authorization) und unter ["@UseGuard reference](/docs/decorators/useguard).

## 5. Abmelden

Löschen Sie die Sitzung, um sich abzumelden:

{% raw %}```nexy
# src/routes/logout.nexy
---
from nexy import useSession

def POST():
    session = useSession()
    session.clear()
    return Redirect("/login")
---
```{% endraw %}

## 6. Bedingte Benutzeroberfläche in Vorlagen

Überprüfen Sie die Sitzung direkt in einer beliebigen `.nexy`-Vorlage:

{% raw %}```nexy
---
from nexy import useSession
session = useSession()
---
<header>
  {% if session.get("user_id") %}
    <a href="/dashboard">Dashboard</a>
    <form method="POST" action="/logout">
      <button>Sign out</button>
    </form>
  {% else %}
    <a href="/login">Sign in</a>
  {% endif %}
</header>
```{% endraw %}

Siehe [useSession hook](/docs/hooks/useSession).

## Was kommt als nächstes?

- [Authentication reference](/docs/security/authentication) – Authentifizierungs-Backends, JWT, OAuth
- [Authorization / Guards](/docs/security/authorization) – benutzerdefinierte Schutzvorrichtungen, Zielfernrohre
- [JWT](/docs/security/jwt) – tokenbasierte Authentifizierung
- [Session config](/docs/config/session)