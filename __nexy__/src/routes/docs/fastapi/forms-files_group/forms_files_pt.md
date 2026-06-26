# Formulários e arquivos

Receba dados de formulários e uploads de arquivos — instale `python-multipart` primeiro.

{% raw %}```bash
pip install python-multipart
```{% endraw %}

## Dados do formulário

{% raw %}```python
from fastapi import Form

def POST(username: str = Form(), password: str = Form()):
    return {"username": username}
```{% endraw %}

### Modelo de formulário

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

## Uploads de arquivos

{% raw %}```python
from fastapi import File, UploadFile

def POST(file: UploadFile = File()):
    contents = file.file.read()
    return {"filename": file.filename, "size": len(contents)}
```{% endraw %}

### Vários arquivos

{% raw %}```python
def POST(files: list[UploadFile] = File()):
    return [f.filename for f in files]
```{% endraw %}

## Formulários + Arquivos juntos

{% raw %}```python
def POST(
    file: UploadFile = File(),
    description: str = Form(),
):
    return {"file": file.filename, "description": description}
```{% endraw %}

## Limitações

- `python-multipart` **não** está incluído por padrão — instale-o explicitamente
- Os manipuladores FBR funcionam de forma idêntica — mesmas importações, mesmas anotações
- O tamanho do arquivo é limitado pelo servidor (padrão na configuração Uvicorn / Gunicorn)