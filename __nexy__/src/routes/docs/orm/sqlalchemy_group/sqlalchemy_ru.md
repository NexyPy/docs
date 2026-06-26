# SQLАлхимия

**SQLAlchemy** — это зрелая полнофункциональная ORM для Python. Используйте его, когда вам нужны сложные запросы, несколько баз данных или существующие проекты SQLAlchemy.

## Конфигурация

{% raw %}```python
# configs/database.py
from sqlalchemy.ext.asyncio import create_async_engine

engine = create_async_engine("sqlite+aiosqlite:///dev.db")
```{% endraw %}

## Пример

{% raw %}```python
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String)
```{% endraw %}

## Миграции

Используйте Alembic (настраивается через `nx migrate`):

{% raw %}```bash
nx migrate --init    # Initialize Alembic (first time)
nx migrate           # Create migration
nx migrate --upgrade # Apply
```{% endraw %}

SQLAlchemy дает вам полный контроль над запросами, связями и пулами соединений.