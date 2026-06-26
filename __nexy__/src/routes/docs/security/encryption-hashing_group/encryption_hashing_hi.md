# एन्क्रिप्शन और हैशिंग

नेक्सी अपना स्वयं का क्रिप्टो शिप नहीं करता है - पायथन की मानक लाइब्रेरी और विश्वसनीय तृतीय-पक्ष पैकेज का उपयोग करें।

## हैशिंग

### हैशलिब (stdlib)

{% raw %}```python
import hashlib

hash = hashlib.sha256(b"data").hexdigest()
```{% endraw %}

### बीक्रिप्ट

{% raw %}```bash
pip install bcrypt
```{% endraw %}

{% raw %}```python
import bcrypt

hashed = bcrypt.hashpw(b"password", bcrypt.gensalt())
bcrypt.checkpw(b"password", hashed)  # True
```{% endraw %}

## एन्क्रिप्शन

### क्रिप्टोग्राफी (फरनेट सममित)

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

## पर्यावरण चर

कभी भी हार्डकोड कुंजियाँ नहीं। पर्यावरण चर का प्रयोग करें:

{% raw %}```python
import os

secret = os.environ["SECRET_KEY"]
```{% endraw %}

विकास के लिए, नेक्सी `.env` फ़ाइलों को स्वचालित रूप से पढ़ता है।