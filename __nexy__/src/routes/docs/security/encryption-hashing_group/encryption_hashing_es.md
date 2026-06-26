# Cifrado y hash

Nexy no envía su propia criptografía: utilice la biblioteca estándar de Python y paquetes de terceros confiables.

## Hash

### hashlib (stdlib)

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

## Cifrado

### criptografía (Fernet simétrica)

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

## Variables de entorno

Nunca codifique las claves. Utilice variables de entorno:

{% raw %}```python
import os

secret = os.environ["SECRET_KEY"]
```{% endraw %}

Para el desarrollo, Nexy lee archivos `.env` automáticamente.