# inicio nx

Ejecuta el servidor de producción utilizando la salida compilada de `nx build`.

{% raw %}```bash
nx start
```{% endraw %}

---

## Qué hace

Inicia un servidor **uvicorn** que sirve la aplicación FastAPI compilada desde `__nexy__/`. Sin recarga automática, sin servidor de desarrollo Vite: solo producción.

---

## Opciones

| Bandera | Predeterminado | Descripción |
|------|---------|-------------|
| `--port` | `3000` | Puerto del servidor |
| `--host` | `127.0.0.1` | Dirección de enlace del servidor |

---

## Variables de entorno

| Variables | Predeterminado | Descripción |
|----------|---------|-------------|
| `NEXY_PORT` | `3000` | Puerto del servidor |
| `NEXY_HOST` | `127.0.0.1` | Dirección de enlace |
| `NEXY_DEBUG` | `false` | Habilitar el modo de depuración |
---

## Ejemplo

{% raw %}```bash
# Production with custom host/port
nx start --host 0.0.0.0 --port 8080
```{% endraw %}

---

## Alias

`nx s`