# Kunden generieren

Generieren Sie typsichere Client-SDKs aus Ihrem OpenAPI-Schema.

## FastAPIs Generierungsclient

FastAPI enthält einen `generate_client`-Befehl, der TypeScript/JavaScript-Clients ausgibt:

{% raw %}```bash
pip install fastapi
fastapi-codegen --input openapi.json --output ./client
```{% endraw %}

Oder verwenden Sie `openapi-generator`:

{% raw %}```bash
npm install "@openapitools/openapi-generator-cli
npx openapi-generator-cli generate \
    -i http://localhost:3000/openapi.json \
    -g typescript-fetch \
    -o ./client
```{% endraw %}

## Nexy + liblab

[Nexy OpenAPI URL] → [liblab](https://liblab.com) generiert SDKs in mehreren Sprachen.

## Manueller Abruf

Für einfache Fälle verwenden Sie `fetch` direkt:

{% raw %}```typescript
const res = await fetch("/api/items/1");
const item = await res.json();
```{% endraw %}

## Client-Bibliothek

Nexy generiert TypeScript-Wrapper für [Actions](/docs/guides/actions) in `./actions/`. Verwenden Sie für Routenhandler Ihren bevorzugten HTTP-Client (`fetch`, `axios`, `httpx`).

## Sprachen

| Werkzeug | Sprachen |
|------|-----------|
| `openapi-generator` | TypeScript, Python, Java, Go, C#, Rust, 50+ |
| `liblab` | TypeScript, Python, Go, Java, Kotlin, C# |
| `fastapi-codegen` | TypeScript (Abrufen / Axios) |