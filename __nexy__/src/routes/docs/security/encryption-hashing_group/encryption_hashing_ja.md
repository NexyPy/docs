# 暗号化とハッシュ

Nexy は独自の暗号を出荷していません。Python の標準ライブラリと信頼できるサードパーティのパッケージを使用します。

## ハッシュ化

### ハッシュライブラリ (stdlib)

{% raw %}```python
import hashlib

hash = hashlib.sha256(b"data").hexdigest()
```{% endraw %}

### bcrypt

{% raw %}```bash
pip install bcrypt
```{% endraw %}

{% raw %}```python
import bcrypt

hashed = bcrypt.hashpw(b"password", bcrypt.gensalt())
bcrypt.checkpw(b"password", hashed)  # True
```{% endraw %}

## 暗号化

### 暗号化 (フェルネット対称)

{% raw %}```bash
pip install cryptography
```{% endraw %}

{% raw %}```python
from cryptography.fernet import Fernet

key = Fernet.generate_key()
cipher = Fernet(key)

token = cipher.encrypt(b"secret data")
cipher.decrypt(token)  # b"secret data"
```{% endraw %}

## 環境変数

決してキーをハードコードしないでください。環境変数を使用します。

{% raw %}```python
import os

secret = os.environ["SECRET_KEY"]
```{% endraw %}

開発のために、Nexy は `.env` ファイルを自動的に読み取ります。