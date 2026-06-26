# PostgreSQL

PostgreSQL — рекомендуемая рабочая база данных для приложений Nexy.

## Соединение

Настройте соединение PostgreSQL в конфигурации базы данных проекта:

{% raw %}```python
# configs/database.py or .env
DATABASE_URL = "postgresql+asyncpg://user:password"@localhost:5432/mydb"
```{% endraw %}

## С ORM

| ОРМ | Водитель | Строка подключения |
|-----|--------|------------------|
| SQLМодель/SQLАлхимия | `asyncpg` | `postgresql+asyncpg://user:pass"@localhost/db` |
| Черепаха-ОРМ | `asyncpg` | `postgres://user:pass"@localhost/db` |

## Почему PostgreSQL с Nexy

- Полная поддержка асинхронности через `asyncpg`
- Собственные столбцы JSON/JSONB для гибких схем.
- Отлично подходит для производственных развертываний
- Работает со всеми поддерживаемыми ORM.