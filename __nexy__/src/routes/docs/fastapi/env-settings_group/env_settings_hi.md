# पर्यावरण और सेटिंग्स

पर्यावरण चर और `.env` फ़ाइलों के साथ कॉन्फ़िगरेशन प्रबंधित करें।

## `.env` फ़ाइलें

नेक्सी स्टार्टअप पर `.env` फ़ाइलों को स्वचालित रूप से पढ़ता है (`python-dotenv` के माध्यम से)।

{% raw %}```env
# .env
DATABASE_URL=postgresql://localhost/mydb
SECRET_KEY=change-me-in-production
DEBUG=true
```{% endraw %}

`os.environ` के माध्यम से उन तक पहुंचें:

{% raw %}```python
import os

DATABASE_URL = os.environ["DATABASE_URL"]
```{% endraw %}

## पाइडेंटिक सेटिंग्स

सत्यापन के साथ टाइप की गई सेटिंग्स के लिए:

{% raw %}```bash
pip install pydantic-settings
```{% endraw %}

{% raw %}```python
# src/settings.py
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str = "sqlite:///dev.db"
    secret_key: str = "dev-key"
    debug: bool = True

    model_config = {"env_file": ".env"}

settings = Settings()
```{% endraw %}

फिर कहीं भी उपयोग करें:

{% raw %}```python
from src.settings import settings

def GET():
    return {"db": settings.database_url}
```{% endraw %}

## NexyConfig में पर्यावरण चर

अपने [Nexy config](/docs/config/nexy) में env vars पास करने के लिए `os.getenv` का उपयोग करें:

{% raw %}```python
import os

class NexyConfig(NexyConfigModel):
    usePort = int(os.getenv("PORT", "3000"))
    useTitle = os.getenv("SITE_TITLE", "My App")
```{% endraw %}

## उत्पादन की सर्वोत्तम प्रथाएँ

- कभी भी `.env` को git में न जोड़ें - `.gitignore` में जोड़ें
- उत्पादन के लिए अपने क्लाउड प्रदाता के गुप्त प्रबंधक या सीआई/सीडी रहस्य का उपयोग करें
- टकराव से बचने के लिए अपने एनवी वर्र्स को उपसर्ग करें (जैसे, `NEXY_`, `APP_`)
- सत्यापन के लिए `pydantic-settings` का उपयोग करें और जबरदस्ती टाइप करें