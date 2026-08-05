# Usando Componentes

Componentes são arquivos `.nexy` em `src/components/` que você importa para páginas e outros componentes.

## Criando um componente

Um componente é qualquer arquivo `.nexy`. O componente mais simples possível não tem frontmatter — apenas HTML:

{% raw %}```nexy
<!-- src/components/Hello.nexy -->
---
---
<h1>Hello Nexy!</h1>
```{% endraw %}

Mas a maioria dos componentes possui adereços, lógica e um modelo.

## Importando Componentes

Use a sintaxe de importação de componentes do Nexy, que suporta caminhos relativos e aliases configurados:

{% raw %}```nexy
---
from "./Card.nexy" import Card
from "./Header.nexy" import Header
from "@components/Button.nexy" import Button
---
```{% endraw %}

O caminho de importação é relativo ao arquivo atual. `"@/` mapeia para `src/` por padrão (ou o que você configurar em `useAliases`).

**Por que a sintaxe especial?** Porque o compilador precisa saber no momento da construção quais tags PascalCase são componentes versus elementos HTML desconhecidos. O sanitizer transforma essas importações antes que o analisador AST do Python as veja, para que nunca causem erros de sintaxe.

## Componentes de renderização

No modelo, use o nome importado como uma tag HTML:

{% raw %}```nexy
---
from "./Card.nexy" import Card
---
<Card title="Hello" count={5} />
```{% endraw %}

O compilador converte tags PascalCase em chamadas de função Jinja2:

| Modelo | Saída compilada |
|----------|----------------|
| `<Card />` | `{{ '{{' }}Card() {{ '}}' }}` |
| `<Card title="Hi" />` | `{{ '{{' }} Card(title="Hi") {{ '}}' }}` |
| `<Card count={5} />` | `{{ '{{' }} Card(count=5) {{ '}}' }}` |
| `<Card>content</Card>` | `{{ '{%' }} call Card() {{ '%}' }}content{{ '{%' }} endcall {{ '%}' }}` |

**Requisito de nomenclatura**: os nomes dos componentes **devem** começar com uma letra maiúscula. Se você usar letras minúsculas, o compilador as tratará como um elemento HTML normal e não chamará a função do componente. Isso é consistente com a convenção da plataforma web (os elementos personalizados devem ter um hífen; PascalCase é reservado para componentes da estrutura).

## Passando adereços

{% raw %}```nexy
---
from "./Card.nexy" import Card
---
<!-- Static string -->
<Card title="Hello" />

<!-- Dynamic Jinja2 expression -->
<Card title="{{ page_title }}" />

<!-- Unquoted value (expression, not string) -->
<Card count={5} active={true} items={["a", "b"]} />

<!-- Mixed -->
<Card title="{{ page_title }}" count={items|length} />
```{% endraw %}

**Regras de aprovação de atributos**:

| Sintaxe | Tipo de valor | Saída do modelo |
|--------|-----------|----------------|
| `title="Hello"` | Corda | `Card(title="Hello")` |
| `title="{{ '{{' }} var {{ '}}' }}"` | Expressão Jinja2 | `Card(title=var)` |
| `count={5}` | Expressão Python | `Card(count=5)` |
| `active=true` | Palavra-chave (Python bool) | `Card(active=True)` |
| `items={["a"]}` | Expressão Python | `Card(items=["a"])` |

Valores sem aspas que correspondem a literais Python (`true`, `false`, `none`, números) são passados ​​como estão. Todo o resto é uma string.

**Entendi**: `count={0}` passa o número inteiro 0. `count="0"` passa a string `"0"`. Nos modelos Jinja2, `{{ '{%' }} if count {{ '%}' }}` avalia de forma diferente para `0` (falso) vs `"0"` (verdadeiro). Use `{0}` quando precisar de um zero numérico.

## Slot / Crianças

Os componentes que agrupam o conteúdo usam `<slot />` para definir para onde os filhos vão:

{% raw %}```nexy
<!-- Card.nexy -->
---
title:prop[str] = ""
---
<div class="card">
  {{ title }}
  <div class="card-body">
    <slot />
  </div>
</div>
```{% endraw %}

{% raw %}```nexy
<!-- Usage -->
---
from "./Card.nexy" import Card
---
<Card title="My Card">
  <p>This appears inside the slot.</p>
</Card>
```{% endraw %}

**Como funcionam os slots**: O compilador agrupa os filhos em um bloco `{{ '{%' }} call {{ '%}' }}`. O componente os recebe como uma função `caller`. `<slot />` chama `caller()` e gera o resultado.

**Limitações**:
- Apenas um slot sem nome por componente
- Sem slots com escopo (passar funções como adereços)
- Os slots funcionam apenas em arquivos `.nexy`, não em modelos Jinja2 brutos

## Fechamento automático vs empacotamento

Componentes de fechamento automático (sem filhos):

{% raw %}```nexy
<Header title="Blog" />
<Separator />
<Spacer size={16} />
```{% endraw %}

Componentes de embalagem (com crianças):

{% raw %}```nexy
<Card title="Post">
  <p>Content here</p>
</Card>

<Layout>
  <Header />
  <main>Page content</main>
  <Footer />
</Layout>
```{% endraw %}

O compilador detecta tags de fechamento automático (`<Card />`) versus tags com filhos (`<Card>...</Card>`) e gera a sintaxe Jinja2 apropriada.

## Devoluções Antecipadas/Renderização Condicional

Como o componente é uma função Python, você pode retornar no início do frontmatter:

{% raw %}```nexy
---
title:prop[str] = ""
if not title:
    print("Warning: Card rendered without title")
    # Return early — the template still runs but title is empty
---
<div class="card">
  {{ title }}
  <slot />
</div>
```{% endraw %}

Para renderização condicional no modelo, use Jinja2 `{{ '{%' }} if {{ '%}' }}`:

{% raw %}```nexy
---
show_header:prop[bool] = true
---
{% if show_header %}
  <header>
    <slot />
  </header>
{% endif %}
```{% endraw %}

## Melhores práticas

- **Um componente por arquivo** — nomenclatura clara e fácil de encontrar
- **Mantenha os modelos com menos de 50 linhas** — se for mais longo, extraia os subcomponentes
- **Use props em vez de codificação** — torna os componentes reutilizáveis
- **Nomeie arquivos em PascalCase** — `BlogCard.nexy` não `blog_card.nexy`
- **Propriedades padrão para valores opcionais** — `title:prop[str] = ""` não `title:prop[str]`

## Próximo

- [Markup](/docs/components/markup): sintaxe do modelo, atributos dinâmicos, convenções HTML
- [Properties](/docs/components/properties): adereços digitados, padrões, padrões de validação