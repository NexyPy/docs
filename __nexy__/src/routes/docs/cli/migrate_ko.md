# nx migrate

Manages database migrations using the configured ORM's migration tool.

{% raw %}```bash
nx migrate
```{% endraw %}

---

## How it works

Nexy detects the configured ORM from `nexyconfig.py` and delegates to the appropriate tool:

| ORM | Migration Tool | Config Field |
|-----|---------------|--------------|
| SQLAlchemy | Alembic | `useORM` |
| SQLModel | Alembic | `useORM` |
| Tortoise-ORM | Aerich | `useORM` |

---

## Commands

| Command | Description |
|---------|-------------|
| `nx migrate` | Create a new migration (auto-detects changes) |
| `nx migrate --init` | Initialize migration tool (Alembic/Aerich) |
| `nx migrate --upgrade` / `-u` | Apply pending migrations |
| `nx migrate -m "message"` | Create migration with a message |

---

## Example

{% raw %}```bash
# Initialize Alembic (first time)
nx migrate --init

# Create a migration after model changes
nx migrate -m "add user table"

# Apply to database
nx migrate --upgrade
```{% endraw %}

---

## Alias

`nx m`