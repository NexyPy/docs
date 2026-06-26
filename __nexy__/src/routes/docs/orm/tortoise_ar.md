# Tortoise-ORM

**Tortoise-ORM** is an async-native ORM inspired by Django's ORM. Easy to learn, works well with FastAPI/Nexy.

## Configuration

{% raw %}```python
TORTOISE_ORM = {
    "connections": {"default": "sqlite://dev.db"},
    "apps": {"models": {"models": ["models", "aerich.models"], "default_connection": "default"}},
}
```{% endraw %}

## Example

{% raw %}```python
from tortoise import fields
from tortoise.models import Model

class User(Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=100)
    email = fields.CharField(max_length=100)
```{% endraw %}

## Migrations

Tortoise-ORM uses **Aerich** (configured via `nx migrate`):

{% raw %}```bash
nx migrate --init    # Initialize Aerich (first time)
nx migrate           # Create migration
nx migrate --upgrade # Apply
```{% endraw %}

Tortoise-ORM is a great choice if you're coming from Django and want a familiar API with async support.