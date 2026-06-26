# Verwenden von Komponenten

Komponenten sind `.nexy`-Dateien in `src/components/`, die Sie in Seiten und andere Komponenten importieren.

## Eine Komponente erstellen

Eine Komponente ist eine beliebige `.nexy`-Datei. Die einfachste mögliche Komponente hat keine Frontmaterie – nur HTML:

{% raw %}```nexy
<!-- src/components/Hello.nexy -->
---
---
<h1>Hello Nexy!</h1>
```{% endraw %}

Aber die meisten Komponenten verfügen über Requisiten, Logik und eine Vorlage.

## Komponenten importieren

Verwenden Sie die Komponentenimportsyntax von Nexy, die relative Pfade und konfigurierte Aliase unterstützt:

{% raw %}```nexy
---
from "./Card.nexy" import Card
from "./Header.nexy" import Header
from "@components/Button.nexy" import Button
---
```{% endraw %}

Der Importpfad ist relativ zur aktuellen Datei. `"@/` wird standardmäßig `src/` zugeordnet (oder was auch immer Sie in `useAliases` konfigurieren).

**Warum die spezielle Syntax?** Weil der Compiler zum Zeitpunkt der Erstellung wissen muss, welche PascalCase-Tags Komponenten und welche unbekannten HTML-Elemente sind. Der Sanitizer transformiert diese Importe, bevor der AST-Parser von Python sie sieht, sodass sie niemals Syntaxfehler verursachen.

## Rendering-Komponenten

Verwenden Sie in der Vorlage den importierten Namen als HTML-Tag:

{% raw %}```nexy
---
from "./Card.nexy" import Card
---
<Card title="Hello" count={5} />
```{% endraw %}

Der Compiler konvertiert PascalCase-Tags in Jinja2-Funktionsaufrufe:

| Vorlage | Kompilierte Ausgabe |
|----------|----------------|
| `<Card />` | `{{ '{{' }}Card() {{ '}}' }}` |
| `<Card title="Hi" />` | `{{ '{{' }} Card(title="Hi") {{ '}}' }}` |
| `<Card count={5} />` | `{{ '{{' }} Card(count=5) {{ '}}' }}` |
| `<Card>content</Card>` | `{{ '{%' }} call Card() {{ '%}' }}content{{ '{%' }} endcall {{ '%}' }}` |

**Namensanforderung**: Komponentennamen **müssen** mit einem Großbuchstaben beginnen. Wenn Sie Kleinbuchstaben verwenden, behandelt der Compiler es als normales HTML-Element und ruft die Komponentenfunktion nicht auf. Dies steht im Einklang mit der Konvention der Webplattform (benutzerdefinierte Elemente müssen einen Bindestrich haben; PascalCase ist für Framework-Komponenten reserviert).

## Requisiten weitergeben

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

**Attributübergaberegeln**:

| Syntax | Werttyp | Vorlagenausgabe |
|--------|-----------|----------------|
| `title="Hello"` | Zeichenfolge | `Card(title="Hello")` |
| `title="{{ '{{' }} var {{ '}}' }}"` | Jinja2-Ausdruck | `Card(title=var)` |
| `count={5}` | Python-Ausdruck | `Card(count=5)` |
| `active=true` | Schlüsselwort (Python bool) | `Card(active=True)` |
| `items={["a"]}` | Python-Ausdruck | `Card(items=["a"])` |

Werte ohne Anführungszeichen, die mit Python-Literalen übereinstimmen (`true`, `false`, `none`, Zahlen), werden unverändert übergeben. Alles andere ist eine Zeichenfolge.

**Verstanden**: `count={0}` übergibt die Ganzzahl 0. `count="0"` übergibt die Zeichenfolge `"0"`. In Jinja2-Vorlagen wird `{{ '{%' }} if count {{ '%}' }}` für `0` (falsch) und `"0"` (wahr) unterschiedlich ausgewertet. Verwenden Sie `{0}`, wenn Sie eine numerische Null benötigen.

## Slot / Kinder

Komponenten, die Inhalte umschließen, verwenden `<slot />`, um zu definieren, wohin Kinder gehen:

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

**So funktionieren Slots**: Der Compiler schließt untergeordnete Elemente in einen `{{ '{%' }} call {{ '%}' }}`-Block ein. Die Komponente empfängt sie als `caller`-Funktion. `<slot />` ruft `caller()` auf und gibt das Ergebnis aus.

**Einschränkungen**:
- Nur ein unbenannter Steckplatz pro Komponente
- Keine bereichsbezogenen Slots (stattdessen Funktionen als Requisiten übergeben)
– Slots funktionieren nur in `.nexy`-Dateien, nicht in unformatierten Jinja2-Vorlagen

## Selbstschließend vs. Wickeln

Selbstschließende Komponenten (keine Kinder):

{% raw %}```nexy
<Header title="Blog" />
<Separator />
<Spacer size={16} />
```{% endraw %}

Verpackungskomponenten (mit Kindern):

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

Der Compiler erkennt selbstschließende Tags (`<Card />`) im Vergleich zu Tags mit untergeordneten Tags (`<Card>...</Card>`) und generiert die entsprechende Jinja2-Syntax.

## Frühzeitige Rückgaben / Bedingtes Rendering

Da es sich bei der Komponente um eine Python-Funktion handelt, können Sie zu Beginn der Einleitung zurückkehren:

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

Für bedingtes Rendern in der Vorlage verwenden Sie Jinja2 `{{ '{%' }} if {{ '%}' }}`:

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

- **Eine Komponente pro Datei** – klare Benennung, leicht zu finden
- **Vorlagen unter 50 Zeilen halten** – wenn sie länger sind, extrahieren Sie Unterkomponenten
- **Requisiten statt Hardcodierung verwenden** – macht Komponenten wiederverwendbar
- **Dateien in PascalCase benennen** – `BlogCard.nexy` nicht `blog_card.nexy`
- **Standard-Requisiten für optionale Werte** – `title:prop[str] = ""` nicht `title:prop[str]`

## Weiter

- [Markup](/docs/components/markup): Vorlagensyntax, dynamische Attribute, HTML-Konventionen
- [Properties](/docs/components/properties): typisierte Requisiten, Standardwerte, Validierungsmuster