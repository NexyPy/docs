# useSession

Retorna o dicionário da sessão da solicitação atual. As sessões são apoiadas por cookies assinados — sem armazenamento no servidor.

{% raw %}```python
from nexy import useSession

session = useSession()
```{% endraw %}

---

## Valor de retorno

`dict` — os dados da sessão do cookie assinado. Retorna um ditado vazio se não existir nenhuma sessão.

---

## Exemplo

{% raw %}```nexy
---
from nexy import useSession
session = useSession()
user_id = session.get("user_id")
---
{% if user_id %}
    <p>Logged in as user {{ user_id }}</p>
{% else %}
    <p>Guest</p>
{% endif %}
```{% endraw %}

---

## Escrevendo dados da sessão

{% raw %}```python
session = useSession()
session["user_id"] = 123
session["role"] = "admin"
del session["_flash"]
```{% endraw %}

---

## Padrão de mensagens Flash

{% raw %}```python
session = useSession()
flashes = session.get("_flashes", [])
flashes.append("Item saved!")
session["_flashes"] = flashes
```{% endraw %}

---

## Notas de uso

- Requer configuração de `useSession` em `nexyconfig.py`
- Os dados da sessão são assinados, mas **não criptografados**
- Sem armazenamento no servidor – tudo está no cookie