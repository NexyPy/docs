# ГрафQL

Nexy поддерживает GraphQL через библиотеку `strawberry`.

## Установить

{% raw %}```bash
pip install strawberry-graphql
```{% endraw %}

## Схема

{% raw %}```python
# src/graphql.py
import strawberry

"@strawberry.type
class User:
    id: int
    name: str

"@strawberry.type
class Query:
    "@strawberry.field
    def user(self, id: int) -> User:
        return User(id=id, name="Alice")

schema = strawberry.Schema(query=Query)
```{% endraw %}

## Маунт в Некси

{% raw %}```python
# In any startup file or nexyconfig.py
from nexy import app
from strawberry.fastapi import GraphQLRouter
from src.graphql import schema

graphql_app = GraphQLRouter(schema)
app.include_router(graphql_app, prefix="/graphql")
```{% endraw %}

## Запрос от клиента

{% raw %}```graphql
query {
    user(id: 1) {
        id
        name
    }
}
```{% endraw %}

## С авторизацией

{% raw %}```python
from nexy import app
from strawberry.fastapi import GraphQLRouter

async def get_context(request):
    return {"user": request.user}

graphql_app = GraphQLRouter(schema, context_getter=get_context)
```{% endraw %}

Полную документацию смотрите в [strawberry.rocks](https://strawberry.rocks).