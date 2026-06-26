# GraphQL

Nexy 通过 `strawberry` 库支持 GraphQL。

＃＃ 安装

{% raw %}```bash
pip install strawberry-graphql
```{% endraw %}

## 架构

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

## 在 Nexy 挂载

{% raw %}```python
# In any startup file or nexyconfig.py
from nexy import app
from strawberry.fastapi import GraphQLRouter
from src.graphql import schema

graphql_app = GraphQLRouter(schema)
app.include_router(graphql_app, prefix="/graphql")
```{% endraw %}

## 客户端查询

{% raw %}```graphql
query {
    user(id: 1) {
        id
        name
    }
}
```{% endraw %}

## 带有授权

{% raw %}```python
from nexy import app
from strawberry.fastapi import GraphQLRouter

async def get_context(request):
    return {"user": request.user}

graphql_app = GraphQLRouter(schema, context_getter=get_context)
```{% endraw %}

有关完整文档，请参阅 [strawberry.rocks](https://strawberry.rocks)。