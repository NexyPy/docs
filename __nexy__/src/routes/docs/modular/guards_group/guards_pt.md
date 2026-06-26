# Guardas

Os guardas determinam se uma solicitação deve chegar ao manipulador de rota. Eles são executados **antes do método do controlador** — perfeitos para autenticação, autorização, limitação de taxa e controle de acesso.

Os guardas do Nexy são **dependências FastAPI**. Eles são chamáveis ​​(classes com `__call__` ou funções autônomas) que recebem a solicitação e passam ou geram uma HTTPException.

## Por que guardas?

Sem guardas, você verificaria a autenticação em todos os métodos do controlador:

{% raw %}```python
class AdminController:
    def GET(self):
        if not is_authenticated(request):
            raise HTTPException(401)
        return {"role": "admin"}

    def delete(self, id: int):
        if not is_authenticated(request):
            raise HTTPException(401)
        return None
```{% endraw %}

Um guarda extrai isso em uma chamada reutilizável:

{% raw %}```python
class AuthGuard:
    async def __call__(self, request: Request):
        token = request.headers.get("Authorization")
        if not token:
            raise HTTPException(401)
```{% endraw %}

Aplicado uma vez, protege todas as rotas no controlador:

{% raw %}```python
"@Controller("/admin")
"@UseGuard(AuthGuard())
class AdminController:
    def GET(self):
        return {"role": "admin"}
```{% endraw %}

## Criando uma Guarda

Um guard é um callable que recebe um `Request` e retorna `None` ou aumenta:

{% raw %}```python
from starlette.exceptions import HTTPException
from starlette.requests import Request

class AuthGuard:
    async def __call__(self, request: Request):
        token = request.headers.get("Authorization")
        if not token or not token.startswith("Bearer "):
            raise HTTPException(401, "Missing or invalid token")
```{% endraw %}

O guarda aumenta `HTTPException` para bloquear a solicitação. Se retornar normalmente, a solicitação prossegue.

**Entendi**: `__call__` pode ser sincronizado ou assíncrono – o roteador lida com ambos. Use async quando seu guarda precisar chamar um banco de dados ou API externa.

## Aplicando Guardas

### Nível do controlador — protege todas as rotas

{% raw %}```python
from nexy.decorators import Controller, UseGuard

"@Controller("/admin")
"@UseGuard(AuthGuard())
class AdminController:
    def GET(self):
        return {"role": "admin"}

    def delete(self, id: int):
        return None
```{% endraw %}

### Nível de método — protege rotas específicas

{% raw %}```python
"@Controller("/users")
class UsersController:
    "@UseGuard(AuthGuard())
    def GET(self):
        return {"email": "user"@example.com"}

    # No guard on public routes
    def post(self, data: dict):
        return {"message": "No auth required"}
```{% endraw %}

### Vários guardas – todos devem passar

{% raw %}```python
"@Controller("/admin")
"@UseGuard(AuthGuard(), RateLimitGuard())
class AdminController:
    ...
```{% endraw %}

Os guardas executam na ordem em que estão listados. Se `AuthGuard` aumentar, `RateLimitGuard` nunca será executado.

**Entendi**: os protetores no nível do método são executados APÓS os protetores no nível do controlador - e somente se os protetores no nível do controlador passarem.

## Guardas com Parâmetros

Crie uma fábrica de guardas para guardas parametrizadas:

{% raw %}```python
class RoleGuard:
    def __init__(self, required_role: str):
        self.required_role = required_role

    async def __call__(self, request: Request):
        user_role = request.headers.get("X-Role", "guest")
        if user_role != self.required_role:
            raise HTTPException(403, f"Requires {self.required_role} role")
```{% endraw %}

Aplicar com argumentos:

{% raw %}```python
"@Controller("/admin")
"@UseGuard(RoleGuard("admin"))
class AdminController:
    def GET(self):
        return {"role": "admin"}
```{% endraw %}

## Guardas como Funções

Guardas simples podem ser funções independentes:

{% raw %}```python
async def rate_limit(request: Request):
    client_ip = request.client.host if request.client else "unknown"
    if is_rate_limited(client_ip):
        raise HTTPException(429, "Too many requests")

"@Controller("/api")
"@UseGuard(rate_limit)
class ApiController:
    def GET(self):
        return {"data": [...]}
```{% endraw %}

## Contexto de proteção

Os guardas recebem o objeto Starlette `Request` completo, dando acesso a cabeçalhos, parâmetros de consulta, sessão e muito mais.

Defina o estado da solicitação em um guarda para uso downstream:

{% raw %}```python
class AuthGuard:
    async def __call__(self, request: Request):
        token = request.headers.get("Authorization", "").removeprefix("Bearer ")
        user = await verify_token(token)
        if not user:
            raise HTTPException(401)
        request.state.user = user

# In the controller:
class UsersController:
    def GET(self, request: Request):
        return {"user": request.state.user}
```{% endraw %}

## Guarda vs Middleware

| Aspecto | Guarda | Middleware |
|--------|-------|--------|
| Executa | Antes do manipulador, depois do middleware | Diante dos guardas e do condutor |
| Finalidade | Autenticação, autorização, controle de acesso | Registro, manipulação de cabeçalho, CORS |
| Retorno | `None` ou aumentar `HTTPException` | `None` ou aumentar `HTTPException` |
| Solicitar acesso | Completo via parâmetro `Request` | Completo via parâmetro `Request` |

**Quando escolher uma proteção versus middleware**: Se a lógica determinar "esta solicitação deve prosseguir?" (autenticação, verificação de função, limite de taxa), use um guarda. Se a lógica modificar a solicitação/resposta independentemente (registro, CORS), use middleware.

## Melhores práticas

1. **Um guarda por preocupação** — `AuthGuard`, `RoleGuard`, `RateLimitGuard`. Não `SecurityGuard` que faz tudo.
2. **Use códigos de status descritivos** — 401 para autenticação ausente/inválida, 403 para permissões insuficientes, 429 para limitação de taxa.
3. **Evite efeitos colaterais** — os guardas devem verificar as permissões, não modificar o estado (exceto `request.state`).
4. **Verificações caras de cache** — instâncias de proteção singleton com caches na memória.
5. **Teste os guardas isoladamente** — crie uma simulação de `Request`, chame o guarda, afirme que ele aumenta ou passa.

## Próximas etapas

- [Middleware](/docs/modular/middleware) — solicita ganchos de pipeline
- [Controllers](/docs/modular/controllers) — definir manipuladores de rota
- [Modules](/docs/modular/modules) — organize em módulos de recursos