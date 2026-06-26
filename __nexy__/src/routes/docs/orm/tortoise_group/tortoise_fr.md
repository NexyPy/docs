# Tortue-ORM

**Tortoise-ORM** est un ORM asynchrone natif inspiré de l'ORM de Django. Facile à apprendre, fonctionne bien avec FastAPI/Nexy.

##Configuration

{% raw %}```python
TORTOISE_ORM = {
    "connections": {"default": "sqlite://dev.db"},
    "apps": {"models": {"models": ["models", "aerich.models"], "default_connection": "default"}},
}
```{% endraw %}

## Exemple

{% raw %}```python
from tortoise import fields
from tortoise.models import Model

class User(Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=100)
    email = fields.CharField(max_length=100)
```{% endraw %}

## Migration

Tortoise-ORM utilise **Aerich** (configuré via `nx migrate`) :

{% raw %}```bash
nx migrate --init    # Initialize Aerich (first time)
nx migrate           # Create migration
nx migrate --upgrade # Apply
```{% endraw %}

Tortoise-ORM est un excellent choix si vous venez de Django et souhaitez une API familière avec prise en charge asynchrone.