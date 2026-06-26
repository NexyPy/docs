# Using Components

Components are `.nexy` files in `src/components/` that you import into pages and other components.

## Creating a Component

A component is any `.nexy` file. The simplest possible component has no frontmatter — just HTML:

{% raw %}```nexy
<!-- src/components/Hello.nexy -->
---
---
<h1>Hello Nexy!</h1>
```{% endraw %}

But most components have props, logic, and a template.

## Importing Components

Use Nexy's component import syntax, which supports relative paths and configured aliases:

{% raw %}```nexy
---
from "./Card.nexy" import Card
from "./Header.nexy" import Header
from "@components/Button.nexy" import Button
---
```{% endraw %}

The import path is relative to the current file. `"@/` maps to `src/` by default (or whatever you configure in `useAliases`).

**Why the special syntax?** Because the compiler needs to know at build time which PascalCase tags are components versus unknown HTML elements. The sanitizer transforms these imports before Python's AST parser sees them, so they never cause syntax errors.

## Rendering Components

In the template, use the imported name as an HTML tag:

{% raw %}```nexy
---
from "./Card.nexy" import Card
---
<Card title="Hello" count={5} />
```{% endraw %}

The compiler converts PascalCase tags to Jinja2 function calls:

| Template | Compiled output |
|----------|----------------|
| `<Card />` | `{{ '{{' }}Card() {{ '}}' }}` |
| `<Card title="Hi" />` | `{{ '{{' }} Card(title="Hi") {{ '}}' }}` |
| `<Card count={5} />` | `{{ '{{' }} Card(count=5) {{ '}}' }}` |
| `<Card>content</Card>` | `{{ '{%' }} call Card() {{ '%}' }}content{{ '{%' }} endcall {{ '%}' }}` |

**Naming requirement**: Component names **must** start with an uppercase letter. If you use lowercase, the compiler treats it as a regular HTML element and doesn't call the component function. This is consistent with the web platform convention (custom elements must have a hyphen; PascalCase is reserved for framework components).

## Passing Props

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

**Attribute passing rules**:

| Syntax | Value type | Template output |
|--------|-----------|----------------|
| `title="Hello"` | String | `Card(title="Hello")` |
| `title="{{ '{{' }} var {{ '}}' }}"` | Jinja2 expression | `Card(title=var)` |
| `count={5}` | Python expression | `Card(count=5)` |
| `active=true` | Keyword (Python bool) | `Card(active=True)` |
| `items={["a"]}` | Python expression | `Card(items=["a"])` |

Unquoted values that match Python literals (`true`, `false`, `none`, numbers) are passed as-is. Everything else is a string.

**Gotcha**: `count={0}` passes the integer 0. `count="0"` passes the string `"0"`. In Jinja2 templates, `{{ '{%' }} if count {{ '%}' }}` evaluates differently for `0` (falsy) vs `"0"` (truthy). Use `{0}` when you need a numeric zero.

## Slot / Children

Components that wrap content use `<slot />` to define where children go:

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

**How slots work**: The compiler wraps children in a `{{ '{%' }} call {{ '%}' }}` block. The component receives them as a `caller` function. `<slot />` calls `caller()` and outputs the result.

**Limitations**:
- Only one unnamed slot per component
- No scoped slots (pass functions as props instead)
- Slots only work in `.nexy` files, not in raw Jinja2 templates

## Self-Closing vs Wrapping

Self-closing components (no children):

{% raw %}```nexy
<Header title="Blog" />
<Separator />
<Spacer size={16} />
```{% endraw %}

Wrapping components (with children):

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

The compiler detects self-closing tags (`<Card />`) vs tags with children (`<Card>...</Card>`) and generates the appropriate Jinja2 syntax.

## Early Returns / Conditional Rendering

Since the component is a Python function, you can return early in the frontmatter:

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

For conditional rendering in the template, use Jinja2 `{{ '{%' }} if {{ '%}' }}`:

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

## Best Practices

- **One component per file** — clear naming, easy to find
- **Keep templates under 50 lines** — if it's longer, extract sub-components
- **Use props instead of hardcoding** — makes components reusable
- **Name files in PascalCase** — `BlogCard.nexy` not `blog_card.nexy`
- **Default props for optional values** — `title:prop[str] = ""` not `title:prop[str]`

## Next

- [Markup](/docs/components/markup): template syntax, dynamic attributes, HTML conventions
- [Properties](/docs/components/properties): typed props, defaults, validation patterns