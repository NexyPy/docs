# Generate Clients

Generate type-safe client SDKs from your OpenAPI schema.

## FastAPI's generate client

FastAPI includes a `generate_client` command that outputs TypeScript/JavaScript clients:

{% raw %}```bash
pip install fastapi
fastapi-codegen --input openapi.json --output ./client
```{% endraw %}

Or use `openapi-generator`:

{% raw %}```bash
npm install "@openapitools/openapi-generator-cli
npx openapi-generator-cli generate \
    -i http://localhost:3000/openapi.json \
    -g typescript-fetch \
    -o ./client
```{% endraw %}

## Nexy + liblab

[Nexy OpenAPI URL] → [liblab](https://liblab.com) generates SDKs in multiple languages.

## Manual fetch

For simple cases, use `fetch` directly:

{% raw %}```typescript
const res = await fetch("/api/items/1");
const item = await res.json();
```{% endraw %}

## Client library

Nexy generates TypeScript wrappers for [Actions](/docs/guides/actions) in `./actions/`. For route handlers, use your preferred HTTP client (`fetch`, `axios`, `httpx`).

## Languages

| Tool | Languages |
|------|-----------|
| `openapi-generator` | TypeScript, Python, Java, Go, C#, Rust, 50+ |
| `liblab` | TypeScript, Python, Go, Java, Kotlin, C# |
| `fastapi-codegen` | TypeScript (Fetch / Axios) |