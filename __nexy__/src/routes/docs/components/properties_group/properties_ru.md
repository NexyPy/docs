# Свойства (реквизит)

Реквизит — это то, как данные передаются в компонент. Они делают компоненты многоразовыми — один и тот же компонент `Card` может отображать разный контент в зависимости от полученных реквизитов.

## Объявление реквизита

Свойства объявляются во фронтальной части с использованием синтаксиса `:prop[type]`:

{% raw %}```nexy
---
title:prop[str]
count:prop[int] = 0
items:prop[list] = []
active:prop[bool] = false
---
{{ title }}
<span>Count: {{ count }}</span>
```{% endraw %}

Каждое объявление становится параметром сгенерированной функции Python с соответствующей аннотацией типа.

## Обязательное или необязательное

{% raw %}```nexy
---
# Required — must be passed, no default
name:prop[str]

# Optional — has a default value
name:prop[str] = "Guest"
age:prop[int] = 0
items:prop[list] = []
settings:prop[dict] = {}
active:prop[bool] = false
---
```{% endraw %}

Если требуемое свойство не передается при использовании компонента, Python вызывает `TypeError` во время рендеринга. Сообщение об ошибке включает имя компонента и отсутствующий аргумент.

**Когда требуется реквизит**: Когда без него компонент не имеет смысла. `BlogCard` без `title` не работает — сделайте его обязательным. `Button` без `variant` может по умолчанию иметь значение `"primary"`.

## Поддерживаемые типы

| Тип | Литерал по умолчанию | Заметки |
|------|----------------|-------|
| `str` | `""` | Строковые значения |
| `int` | `0` | Целые значения |
| `float` | `0.0` | Плавающие значения |
| `bool` | `false` | `true`/`false` (не `True`/`False`) |
| `list` | `[]` | Значения списка |
| `dict` | `{}` | Значения Dict |
| `Any` | `None` | Любой тип |

Аннотация типа используется для документации и поддержки IDE. Во время выполнения Python динамически типизируется — аннотация не определяет тип. Если вы передадите строку, в которой ожидается int, она завершится ошибкой, когда шаблон попытается использовать ее арифметически, а не на уровне объявления свойства.

## Передача реквизита от родителей

{% raw %}```nexy
---
from nexy import useQuery
from "./Card.nexy" import Card

query = useQuery()
posts = [...]  # from database
---
{% for post in posts %}
  <Card
    title="{{ post.title }}"
    date="{{ post.date }}"
    slug="{{ post.slug }}"
    tags={post.tags}
    published={post.published}
  />
{% endfor %}
```{% endraw %}

**Правила**:

- **Строковые значения** используют `key="value"` или `key="{{ '{{' }} jinja_expr {{ '}}' }}"`.
- **Выражения** используют `key={expr}` — кавычек нет, значение анализируется как Python.
- **Логические значения**: используйте `active=true` (строчные), а не `active=True` или `active="true"`.
- **Списки/слова**: `items={["a", "b"]}` или `settings={"key": "val"}`

## Значения по умолчанию и изменяемые объекты

Распространенная ошибка Python: **не используйте изменяемые значения по умолчанию**, которые являются общими для всех вызовов:

{% raw %}```python
# BAD — in Python, this list is created once and shared
def Card(items: list = []):
    items.append("new")  # Modifies the default!
```{% endraw %}

Nexy сделает это за вас. Сгенерированная функция использует `None` в качестве внутреннего значения по умолчанию и создает новую копию при каждом вызове:

{% raw %}```python
# What Nexy actually generates
def Card(items: list = None):
    if items is None:
        items = []
```{% endraw %}

Таким образом, `items:prop[list] = []` безопасно использовать — каждый вызов компонента получает свой собственный список.

## Динамические реквизиты с `{{ '{{' }} {{ '}}' }}`

Используйте выражения Jinja2 для динамических значений:

{% raw %}```nexy
<Card title="{{ post.title }}" />
<Card count={posts|length} />
<Card active={user.role == "admin"} />
<Card style={{"color": "red" if urgent else "blue"}} />
```{% endraw %}

Компилятор преобразует значения атрибутов, содержащие `{{ '{{' }} {{ '}}' }}`, в конкатенацию строк Jinja2:

{% raw %}```
title="{{ post.title }}"  →  title=post.title
```{% endraw %}

Для значений `{...}` без кавычек содержимое передается напрямую как выражение Python.

## Реквизиты на страницах MDX

Страницы (файлы `.mdx` в `src/routes/`) также могут объявлять реквизиты:

{% raw %}```mdx
---
title:prop[str] = "Untitled"
section:prop[str] = "docs"
---

# {{ title }}

Page content...
```{% endraw %}

Свойства страницы обычно задаются макетом или передаются через `useViews()`. Они менее распространены, чем свойства компонентов, поскольку вместо этого страницы обычно получают данные из перехватчиков и запросов к базе данных.

## Распространение реквизита

Передайте dict как несколько реквизитов, используя синтаксис распространения Jinja2 в шаблоне:

{% raw %}```nexy
---
from nexy import useQuery
from "./Card.nexy" import Card

post = {"title": "Hello", "date": "2026-01-15", "slug": "hello-world"}
---
<Card {{ post }} />
<!-- Expands to: Card(title="Hello", date="2026-01-15", slug="hello-world") -->
```{% endraw %}

Это работает через обнаружение сокращений компилятором: когда он видит `{{ '{{' }} ...props {{ '}}' }}` в ключе атрибута, он расширяет его до `**props`.

## Полный пример: компонент кнопки

{% raw %}```nexy
<!-- src/components/Button.nexy -->
---
label:prop[str] = "Click"
variant:prop[str] = "primary"
size:prop[str] = "md"
disabled:prop[bool] = false
---
<button
  class="btn btn--{{ variant }} btn--{{ size }}"
  {{ 'disabled' if disabled else '' }}
  onclick="{{ attrs.onclick if attrs else '' }}"
>
  {{ label }}
  <slot />
</button>

<style>
.btn { padding: 0.5rem 1rem; border-radius: 6px; border: none; cursor: pointer; }
.btn--primary { background: #3b82f6; color: white; }
.btn--secondary { background: #6b7280; color: white; }
.btn--sm { font-size: 0.875rem; }
.btn--md { font-size: 1rem; }
</style>
```{% endraw %}

Использование:

{% raw %}```nexy
---
from "./Button.nexy" import Button
---
<Button label="Save" variant="primary" size="sm" />
<Button label="Cancel" variant="secondary" />
<Button label="Submit" disabled={true}>
  <span class="spinner" />
</Button>
```{% endraw %}

## Далее

- [Conditional Rendering](/docs/components/conditional): if/for в шаблонах
- [Component Modules](/docs/components/modules): организация компонентов.