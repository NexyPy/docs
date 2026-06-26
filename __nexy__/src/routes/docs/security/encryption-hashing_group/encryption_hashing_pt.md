# Criptografia e hash

Nexy não envia sua própria criptografia – use a biblioteca padrão do Python e pacotes confiáveis de terceiros.

## Hashing

### hashlib (stdlib)

{% raw %}```python
import hashlib

hash = hashlib.sha256(b"data").hexdigest()
```{% endraw %}

###bcrypt

{% raw %}```bash
pip install bcrypt
```{% endraw %}

{% raw %}```python
import bcrypt

hashed = bcrypt.hashpw(b"password", bcrypt.gensalt())
bcrypt.checkpw(b"password", hashed)  # True
```{% endraw %}

## Criptografia

### criptografia (simétrica Fernet)

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

## Variáveis de ambiente

Nunca codifique chaves. Use variáveis ​​de ambiente:

{% raw %}```python
import os

secret = os.environ["SECRET_KEY"]
```{% endraw %}

Para desenvolvimento, Nexy lê arquivos `.env` automaticamente.