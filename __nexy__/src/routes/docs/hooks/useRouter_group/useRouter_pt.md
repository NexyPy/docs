#useRouter

Retorna um objeto com contexto de roteamento para a solicitação atual.

{% raw %}```python
from nexy import useRouter

router = useRouter()
```{% endraw %}

---

## Valor de retorno

`dict` com as seguintes chaves:

| Chave | Tipo | Descrição |
|-----|------|-------------|
| `path` | `str` | Caminho do URL atual |
| `base_url` | `str` | URL base do servidor |
| `url_for` | `callable \| None` | Função `url_for` do FastAPI para pesquisa reversa de URL |

---

## Exemplo

{% raw %}```nexy
---
from nexy import useRouter
router = useRouter()
---
<p>Current path: {{ router.path }}</p>
<p>Base URL: {{ router.base_url }}</p>
```{% endraw %}

---

## Pesquisa reversa de URL

{% raw %}```python
router = useRouter()
if router.url_for:
    url = router.url_for("read_article", slug="hello-world")
```{% endraw %}

---

## Notas de uso

- `url_for` pode estar `None` fora do contexto da solicitação
- Usa `request.app.url_for` do FastAPI nos bastidores