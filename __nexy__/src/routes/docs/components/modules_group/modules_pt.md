# Sistema de Módulo

O sistema de módulos do Nexy permite importar e exportar componentes em todo o seu projeto.

---

## Importando um componente

Use a sintaxe `import` no frontmatter:

{% raw %}```python
---
from "@components/card.nexy" import Card
from "@components/button.nexy" import Button
---
```{% endraw %}

O alias `"@` é resolvido para `src/` (configurável em `nexyconfig.py`).

---

## Exportações nomeadas

Por padrão, um arquivo `.nexy` exporta seu modelo como um componente com o nome do arquivo:

| Arquivo | Nome de exportação |
|---|---|
| `card.nexy` | `Card` |
| `button.nexy` | `Button` |
| `table_of_contents.nexy` | `Table_of_contents` |

---

## Slot (crianças)

O componente `Slot` renderiza o conteúdo filho passado entre tags de abertura/fechamento:

{% raw %}```nexy
<div class="card">
    {{ title }}
    <Slot />
</div>
```{% endraw %}

Uso:

{% raw %}```html
<Card title="Hello">
    <p>This goes into the Slot.</p>
</Card>
```{% endraw %}

---

## Importar aliases

Use `as` para evitar conflitos de nomenclatura:

{% raw %}```python
---
from "@components/button.nexy" import Button as Btn
from "@components/icon-button.nexy" import Button as IconBtn
---
```{% endraw %}

{% raw %}```html
<Btn label="Save" />
<IconBtn label="Delete" icon="trash" />
```{% endraw %}

---

## Reexportação

Crie um arquivo de índice que agregue componentes:

{% raw %}```python
from "@components/button.nexy" import Button as Btn
from "@components/icon-button.nexy" import Button as IconBtn
```{% endraw %}

{% raw %}```html
<Btn label="Save" />
<IconBtn label="Delete" icon="trash" />
```{% endraw %}

Outros arquivos são importados deste barril:

{% raw %}```python
---
from "@components/index.nexy" import Card, Button
---
```{% endraw %}

-----

## Importações dinâmicas

Para frameworks do lado do cliente (React, Solid), Nexy gera a árvore de importação automaticamente durante a construção. Você não precisa gerenciar os pontos de entrada manualmente - o compilador detecta o uso de `.tsx`/`.jsx` e conecta o Vite ou esbuild de acordo.