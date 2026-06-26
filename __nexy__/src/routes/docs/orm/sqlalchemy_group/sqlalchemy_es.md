# SQLAlquimia

**SQLAlchemy** es el ORM maduro y con todas las funciones para Python. Úselo cuando necesite consultas complejas, múltiples bases de datos o proyectos SQLAlchemy existentes.

## Configuración

{% raw %}```python
# configs/database.py
from sqlalchemy.ext.asyncio import create_async_engine

engine = create_async_engine("sqlite+aiosqlite:///dev.db")
```{% endraw %}

## Ejemplo

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

## Migraciones

Utilice Alambique (configurado a través de `nx migrate`):

{% raw %}```bash
nx migrate --init    # Initialize Alembic (first time)
nx migrate           # Create migration
nx migrate --upgrade # Apply
```{% endraw %}

SQLAlchemy le brinda control total sobre consultas, relaciones y agrupaciones de conexiones.