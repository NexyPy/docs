#ग्राफक्यूएल

Nexy `strawberry` लाइब्रेरी के माध्यम से GraphQL का समर्थन करता है।

## स्थापित करना

{% raw %}```bash
pip install strawberry-graphql
```{% endraw %}

## स्कीमा

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

## नेक्सी में माउंट

{% raw %}```python
# In any startup file or nexyconfig.py
from nexy import app
from strawberry.fastapi import GraphQLRouter
from src.graphql import schema

graphql_app = GraphQLRouter(schema)
app.include_router(graphql_app, prefix="/graphql")
```{% endraw %}

## ग्राहक से प्रश्न

{% raw %}```graphql
query {
    user(id: 1) {
        id
        name
    }
}
```{% endraw %}

## प्रमाणन के साथ

{% raw %}```python
from nexy import app
from strawberry.fastapi import GraphQLRouter

async def get_context(request):
    return {"user": request.user}

graphql_app = GraphQLRouter(schema, context_getter=get_context)
```{% endraw %}

संपूर्ण दस्तावेज़ीकरण के लिए [strawberry.rocks](https://strawberry.rocks) देखें।