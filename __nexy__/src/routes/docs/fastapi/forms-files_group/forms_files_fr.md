# Formulaires et fichiers

Recevez les données du formulaire et les téléchargements de fichiers : installez d'abord `python-multipart`.

{% raw %}```bash
pip install python-multipart
```{% endraw %}

## Données du formulaire

{% raw %}```python
from fastapi import Form

def POST(username: str = Form(), password: str = Form()):
    return {"username": username}
```{% endraw %}

### Modèle de formulaire

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

## Téléchargements de fichiers

{% raw %}```python
from fastapi import File, UploadFile

def POST(file: UploadFile = File()):
    contents = file.file.read()
    return {"filename": file.filename, "size": len(contents)}
```{% endraw %}

### Plusieurs fichiers

{% raw %}```python
def POST(files: list[UploadFile] = File()):
    return [f.filename for f in files]
```{% endraw %}

## Formulaires + Fichiers ensemble

{% raw %}```python
def POST(
    file: UploadFile = File(),
    description: str = Form(),
):
    return {"file": file.filename, "description": description}
```{% endraw %}

## Limites

- `python-multipart` n'est **pas** inclus par défaut — installez-le explicitement
- Les gestionnaires FBR fonctionnent de la même manière : mêmes importations, mêmes annotations
- La taille du fichier est limitée par le serveur (par défaut dans la configuration Uvicorn / Gunicorn)