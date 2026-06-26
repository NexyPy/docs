# Erstellen und Bereitstellen

`nx build` kompiliert Ihr Projekt für die Produktion. `nx start` führt den Produktionsserver aus.

## Bauen

{% raw %}```bash
nx build
```{% endraw %}

Kompiliert `.nexy`/`.mdx`-Dateien, bündelt Frontend-Assets und generiert einen Routenbaum. Die Ausgabe geht an `__nexy__/`.

Flags und Optionen finden Sie unter [CLI: build](/docs/cli/build).

## Start

{% raw %}```bash
nx start
```{% endraw %}

Startet den Uvicorn-Produktionsserver.

Siehe [CLI: start](/docs/cli/start) für Flags (`--port`, `--host`, `--env`).

## Bereitstellen

Docker, VPS, Fly.io, Railway, Render – plattformspezifische Anweisungen finden Sie im [Deploy guide](/docs/guides/deploy).

## Statischer Export

Bei vollständig statischen Websites wird jede Seite während der Erstellung vorab in HTML gerendert. Stellen Sie `__nexy__/static/` mit einem beliebigen statischen Dateiserver bereit.