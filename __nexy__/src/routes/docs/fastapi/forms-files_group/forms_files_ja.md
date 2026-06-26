# フォームとファイル

フォーム データとファイルのアップロードを受信します。最初に `python-multipart` をインストールします。

{% raw %}```bash
pip install python-multipart
```{% endraw %}

## フォームデータ

{% raw %}```python
from fastapi import Form

def POST(username: str = Form(), password: str = Form()):
    return {"username": username}
```{% endraw %}

### フォームモデル

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

## ファイルのアップロード

{% raw %}```python
from fastapi import File, UploadFile

def POST(file: UploadFile = File()):
    contents = file.file.read()
    return {"filename": file.filename, "size": len(contents)}
```{% endraw %}

### 複数のファイル

{% raw %}```python
def POST(files: list[UploadFile] = File()):
    return [f.filename for f in files]
```{% endraw %}

## フォームとファイルを一緒に

{% raw %}```python
def POST(
    file: UploadFile = File(),
    description: str = Form(),
):
    return {"file": file.filename, "description": description}
```{% endraw %}

## 制限事項

- `python-multipart` はデフォルトでは**含まれていません** - 明示的にインストールします
- FBR ハンドラーは同じように動作します - 同じインポート、同じアノテーション
- ファイル サイズはサーバーによって制限されます (Uvicorn / Gunicorn 構成のデフォルト)