# páginas

Uma página é uma rota que retorna HTML. No Nexy, as páginas são arquivos `.nexy` ou `.mdx` em `src/routes/`.

> As páginas são distintas de **Route Handlers** (arquivos `.py`) que retornam JSON ou dados brutos.

---

## Criando uma página

Coloque um arquivo `.nexy` ou `.mdx` em `src/routes/`:
{% raw %}```bash
src/
└── routes/
    └── index.nexy       →  /
```{% endraw %}
{% raw %}```html
<!-- index.nexy -->
<h1>Hello Nexy!</h1>
```{% endraw %}
Não é necessário registro de rota — o arquivo **é** a rota.

---

## Páginas em `.nexy`

Um arquivo `.nexy` pode conter frontmatter Python e um modelo HTML:
{% raw %}```
---
items: prop[list] = []
---
<ul>
{% for item in items %}
    {{ item }}
{% endfor %}
</ul>
```{% endraw %}
---

## Páginas em `.mdx`

Os arquivos `.mdx` combinam Markdown com componentes Nexy:
{% raw %}```mdx
---
from "@components/link.nexy" import Link
---

# My Article

<Link href="/docs">Back to docs</Link>
```{% endraw %}
Esta página que você está lendo é em si um arquivo `.mdx` — o sumário, a barra lateral e a localização atual são manipulados pelo layout.

---

## Arquivos especiais não roteáveis

Alguns arquivos dentro de `routes/` não criam rotas:

| Arquivo | Função |
|---|---|
| `__init__.py` | Marcador de pacote Python |
| `layout.nexy` | Wrapper de layout compartilhado |
| `dependencies.py` | Dependências compartilhadas |
{% call Link(href="/docs/fbrouters/layouts") %}Next: Layouts →{% endcall %}