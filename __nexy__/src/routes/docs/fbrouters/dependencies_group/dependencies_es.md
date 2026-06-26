# Dependencias

Un archivo `dependencies.py` dentro de `src/routes/` recopila dependencias FastAPI comunes que se aplican automáticamente a cada ruta en el árbol de directorios.

---

## `dependencies = [...]`

Defina los invocables y enumerelos en una variable `dependencies` a nivel de módulo:
{% raw %}```python
# src/routes/dashboard/dependencies.py
from fastapi import Request, HTTPException

def get_db():
    return {"connection": "ok"}

def require_auth(request: Request):
    if not request.headers.get("Authorization"):
        raise HTTPException(status_code=401)

dependencies = [get_db, require_auth]
```{% endraw %}
Solo se aplican los elementos enumerados en `dependencies`; se ignoran las funciones básicas.

---

## Herencia (fusionar, no anular)

Nexy sube **desde el archivo de ruta hasta `src/routes/` y **fusiona** cada lista `dependencies` encontrada:
{% raw %}```
src/routes/
├── dependencies.py              # [log_request]
└── dashboard/
    ├── dependencies.py          # [require_auth]
    ├── index.nexy               # gets [Depends(log_request), Depends(require_auth)]
    └── settings.nexy            # same
```{% endraw %}
Los archivos `dependencies.py` secundarios **no anulan** los padres. Todas las listas están combinadas. Si aparece el mismo nombre de dependencia en ambos, FastAPI genera `ValueError` al inicio (parámetro duplicado).

---

## Usando en una página

En las páginas `.nexy`, las dependencias se ejecutan automáticamente antes del renderizado; no es necesario importarlas ni llamarlas:
{% raw %}```nexy
---
---
<h1>Dashboard</h1>
```{% endraw %}
Los valores resueltos **no** están disponibles como variables de plantilla. Las dependencias se ejecutan para efectos secundarios (verificaciones de autenticación, registro, configuración de conexión de base de datos).

Para los controladores `.py`, las dependencias se ejecutan como efectos secundarios: sus valores de retorno **no** se inyectan en el controlador. Para acceder al valor de una dependencia, agregue `Depends()` en la firma de la función:
{% raw %}```python
# src/routes/dashboard/users.py
from fastapi import Depends
from .dependencies import get_db

def GET(db=Depends(get_db)):
    return {"db": db["connection"]}
```{% endraw %}
Si el mismo invocable aparece tanto en `dependencies = [...]` como en la firma del controlador, FastAPI lo ejecuta una vez y comparte el resultado.

---
{% call Link(href="/docs/fbrouters/middlewares") %}Next: Middlewares →{% endcall %}