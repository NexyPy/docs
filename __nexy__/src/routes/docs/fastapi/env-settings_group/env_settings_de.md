# Umgebung und Einstellungen

Verwalten Sie die Konfiguration mit Umgebungsvariablen und `.env`-Dateien.

## `.env` files

Nexy liest `.env`-Dateien automatisch beim Start (über `python-dotenv`).

{% raw %}```env
# .env
DATABASE_URL=postgresql://localhost/mydb
SECRET_KEY=change-me-in-production
DEBUG=true
```{% endraw %}

Greifen Sie über `os.environ` darauf zu:

{% raw %}```python
import os

DATABASE_URL = os.environ["DATABASE_URL"]
```{% endraw %}

## Pydantic-Einstellungen

Für typisierte Einstellungen mit Validierung:

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

Dann verwenden Sie überall:

{% raw %}```python
from src.settings import settings

def GET():
    return {"db": settings.database_url}
```{% endraw %}

## Umgebungsvariablen in NexyConfig

Verwenden Sie `os.getenv`, um Umgebungsvariablen an Ihr [Nexy config](/docs/config/nexy) zu übergeben:

{% raw %}```python
import os

class NexyConfig(NexyConfigModel):
    usePort = int(os.getenv("PORT", "3000"))
    useTitle = os.getenv("SITE_TITLE", "My App")
```{% endraw %}

## Best Practices für die Produktion

- Niemals `.env` an Git übergeben – zu `.gitignore` hinzufügen
- Verwenden Sie für die Produktion den Secret Manager Ihres Cloud-Anbieters oder CI/CD-Geheimnisse
- Stellen Sie Ihren Umgebungsvariablen ein Präfix voran (z. B. `NEXY_`, `APP_`), um Kollisionen zu vermeiden
- Verwenden Sie `pydantic-settings` zur Validierung und Typerzwingung