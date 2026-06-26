# SQLМодель

SQLModel — рекомендуемая ORM для новых проектов Nexy — модели Pydantic также служат моделями баз данных.

---

## Настраивать

{% raw %}```bash
uv add sqlmodel
```{% endraw %}

{% raw %}```python
from sqlmodel import create_engine, Session

DATABASE_URL = "sqlite:///dev.db"
engine = create_engine(DATABASE_URL)
```{% endraw %}

---

## Модели

{% raw %}```python
from sqlmodel import SQLModel, Field

class User(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    name: str
    email: str

class Hero(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    secret_name: str
    age: int | None = None
```{% endraw %}

---

## Использование в маршрутах

{% raw %}```python
# src/routes/users.py
from fastapi import Depends
from sqlmodel import Session, select
from src.models import User
from src.database import engine

def get_session():
    with Session(engine) as session:
        yield session

def GET(db=Depends(get_session)):
    users = db.exec(select(User)).all()
    return users

def POST(user: User, db=Depends(get_session)):
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
```{% endraw %}

---

## Миграции

Используйте Alembic (настраивается вручную или через `nx migrate`):

{% raw %}```bash
nx migrate --init    # Initialize Alembic (first time)
nx migrate           # Create migration
nx migrate --upgrade # Apply
```{% endraw %}

---

## Ресурсы

- [SQLModel docs](https://sqlmodel.tiangolo.com/)
- [FastAPI + SQLModel](https://fastapi.tiangolo.com/tutorial/sql-databases/)