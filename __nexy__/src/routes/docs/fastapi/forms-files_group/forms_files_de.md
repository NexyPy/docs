# Formulare und Dateien

Formulardaten und Datei-Uploads empfangen – zuerst `python-multipart` installieren.

{% raw %}```bash
pip install python-multipart
```{% endraw %}

## Formulardaten

{% raw %}```python
from fastapi import Form

def POST(username: str = Form(), password: str = Form()):
    return {"username": username}
```{% endraw %}

### Formularmodell

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

## Datei-Uploads

{% raw %}```python
from fastapi import File, UploadFile

def POST(file: UploadFile = File()):
    contents = file.file.read()
    return {"filename": file.filename, "size": len(contents)}
```{% endraw %}

### Mehrere Dateien

{% raw %}```python
def POST(files: list[UploadFile] = File()):
    return [f.filename for f in files]
```{% endraw %}

## Formulare + Dateien zusammen

{% raw %}```python
def POST(
    file: UploadFile = File(),
    description: str = Form(),
):
    return {"file": file.filename, "description": description}
```{% endraw %}

## Einschränkungen

- `python-multipart` ist standardmäßig **nicht** enthalten – installieren Sie es explizit
– FBR-Handler funktionieren identisch – gleiche Importe, gleiche Anmerkungen
- Die Dateigröße ist durch den Server begrenzt (Standardeinstellungen in der Uvicorn-/Gunicorn-Konfiguration).