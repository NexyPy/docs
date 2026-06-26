# Formularios y archivos

Reciba datos de formularios y cargas de archivos: instale `python-multipart` primero.

{% raw %}```bash
pip install python-multipart
```{% endraw %}

## Datos del formulario

{% raw %}```python
from fastapi import Form

def POST(username: str = Form(), password: str = Form()):
    return {"username": username}
```{% endraw %}

### Modelo de formulario

{% raw %}```python
from pydantic import BaseModel
from fastapi import Form, Depends

class LoginForm(BaseModel):
    username: str
    password: str

    "@classmethod
    def as_form(cls, username: str = Form(), password: str = Form()):
        return cls(username=username, password=password)

def POST(form: LoginForm = Depends(LoginForm.as_form)):
    ...
```{% endraw %}

## Cargas de archivos

{% raw %}```python
from fastapi import File, UploadFile

def POST(file: UploadFile = File()):
    contents = file.file.read()
    return {"filename": file.filename, "size": len(contents)}
```{% endraw %}

### Múltiples archivos

{% raw %}```python
def POST(files: list[UploadFile] = File()):
    return [f.filename for f in files]
```{% endraw %}

## Formularios + Archivos juntos

{% raw %}```python
def POST(
    file: UploadFile = File(),
    description: str = Form(),
):
    return {"file": file.filename, "description": description}
```{% endraw %}

## Limitaciones

- `python-multipart` **no** está incluido de forma predeterminada: instálelo explícitamente
- Los controladores FBR funcionan de manera idéntica: las mismas importaciones, las mismas anotaciones
- El tamaño del archivo está limitado por el servidor (valor predeterminado en la configuración de Uvicorn/Gunicorn)