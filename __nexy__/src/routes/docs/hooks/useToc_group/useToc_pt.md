#useToc

Gera um índice HTML a partir dos títulos da página atual.

{% raw %}```python
from nexy import useToc

toc_html = useToc()
toc_html = useToc(depth_range="1-4")
```{% endraw %}

---

## Parâmetros

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|---------|------------|
| `depth_range` | `str` | `"2-6"` | Níveis de título a incluir (por exemplo, `"2-4"` para h2 a h4) |

---

## Valor de retorno

`str` — sequência HTML do índice ou sequência vazia se não houver títulos.

---

## Exemplo

{% raw %}```nexy
---
from nexy import useToc
toc = useToc()
---
<aside class="toc">
    <h3>On this page</h3>
    {{ toc | safe }}
</aside>
```{% endraw %}

---

## Notas de uso

- Analisa títulos de markdown do conteúdo da página renderizada
- Retorna string vazia para páginas sem títulos
- Formato do intervalo de profundidade: `"2-6"` significa h2 a h6, `"1-3"` significa h1 a h3