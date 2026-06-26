# nx-Build

Kompiliert das Projekt für die Produktion – `.nexy`/`.mdx` Kompilierung, SSG und Client-Bündelung.

{% raw %}```bash
nx build
```{% endraw %}

---

## Was es tut

1. Kompiliert alle `.nexy`/`.mdx` Dateien zu `__nexy__/` (parallel, Multithreaded)
2. Erzeugt SSG-Seiten (statische Site-Generierung) – rendert HTML für statische Routen vor
3. Führt den Vite-Produktions-Build für Client-Komponenten aus (sofern konfiguriert).
4. Erzeugt den kompilierten Routenbaum für die FastAPI-App

Die Ausgabe geht an `__nexy__/`:

{% raw %}```text
__nexy__/
├── server/          — Compiled Python routes
├── client/          — Bundled JS/CSS (Vite)
├── static/          — Pre-rendered HTML (SSG)
└── manifest.json    — Build manifest
```{% endraw %}

---

## Optionen

| Flagge | Standard | Beschreibung |
|------|---------|-------------|
| `--check` | `false` | Nach der Kompilierung ruff + mypy ausführen |
| `--static` | `false` | Vollständiger statischer Site-Export (kein Server) |

---

## Beispiel

{% raw %}```bash
# Build with type checking
nx build --check

# Build as static site
nx build --static
```{% endraw %}

---

## Alias

`nx b`