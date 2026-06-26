# Verschlüsselung und Hashing

Nexy liefert keine eigene Krypto – verwenden Sie die Standardbibliothek von Python und vertrauenswürdige Pakete von Drittanbietern.

## Hashing

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

## Verschlüsselung

### Kryptographie (Fernet-symmetrisch)

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

## Umgebungsvariablen

Schlüssel niemals fest codieren. Umgebungsvariablen verwenden:

{% raw %}```python
import os

secret = os.environ["SECRET_KEY"]
```{% endraw %}

Für die Entwicklung liest Nexy `.env`-Dateien automatisch.