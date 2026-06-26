# Depuración

Las aplicaciones Nexy son Python estándar: utilice sus herramientas de depuración habituales.

## `breakpoint()`

Inserte `breakpoint()` en cualquier lugar de su controlador de ruta:

{% raw %}```python
def GET():
    x = 42
    breakpoint()  # drops into pdb
    return {"x": x}
```{% endraw %}

Ejecute `nx dev` y tome la ruta: la terminal cae en `pdb`.

## Código VS

1. Establezca puntos de interrupción en VS Code haciendo clic en el canal
2. Crea un `.vscode/launch.json`:

{% raw %}```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Nexy Dev",
            "type": "debugpy",
            "request": "launch",
            "module": "nexy.cli",
            "args": ["dev"],
            "jinja": true
        }
    ]
}
```{% endraw %}

3. Presione `F5` para iniciar la depuración: los puntos de interrupción funcionan en archivos `.nexy` frontmatter y `.py`.

## Depuración de impresión

{% raw %}```python
---
print(f"Request params: {params}")  # appears in the terminal
---
```{% endraw %}

## Registro de consola

Nexy registra todas las solicitudes en el terminal de forma predeterminada. Agregue sus propios registros:

{% raw %}```python
import logging
logger = logging.getLogger("nexy")

def GET():
    logger.info("Home page loaded")
    return {"ok": True}
```{% endraw %}

## recarga de uvicornio

`nx dev` ejecuta uvicorn con `--reload`: los cambios en los archivos `.py`, `.nexy`, `.mdx` desencadenan un reinicio automático.

## Problemas comunes

| Síntoma | Causa probable |
|---------|-------------|
| Vuelve la ruta 405 | Método HTTP incorrecto o falta `python-multipart` |
| El cuerpo es `None` | Falta el modelo Pydantic o la anotación de tipo |
| 422 Error de validación | Los tipos no coinciden en la ruta/parámetros de consulta |
| Módulo no encontrado | Caché VFS obsoleta: reinicie `nx dev` |