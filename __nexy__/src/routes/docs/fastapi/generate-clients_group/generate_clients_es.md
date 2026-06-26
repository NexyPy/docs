# Generar Clientes

Genere SDK de cliente con seguridad de tipos desde su esquema OpenAPI.

## Cliente de generación de FastAPI

FastAPI incluye un comando `generate_client` que genera clientes TypeScript/JavaScript:

{% raw %}```bash
pip install fastapi
fastapi-codegen --input openapi.json --output ./client
```{% endraw %}

O utilice `openapi-generator`:

{% raw %}```bash
npm install "@openapitools/openapi-generator-cli
npx openapi-generator-cli generate \
    -i http://localhost:3000/openapi.json \
    -g typescript-fetch \
    -o ./client
```{% endraw %}

## Nexy + liblab

[URL de Nexy OpenAPI] → [liblab](https://liblab.com) genera SDK en varios idiomas.

## Recuperación manual

Para casos simples, use `fetch` directamente:

{% raw %}```typescript
const res = await fetch("/api/items/1");
const item = await res.json();
```{% endraw %}

## Biblioteca cliente

Nexy genera envoltorios de TypeScript para [Actions](/docs/guides/actions) en `./actions/`. Para los controladores de ruta, utilice su cliente HTTP preferido (`fetch`, `axios`, `httpx`).

## Idiomas

| Herramienta | Idiomas |
|------|-----------|
| `openapi-generator` | TypeScript, Python, Java, Go, C#, Rust, 50+ |
| `liblab` | TypeScript, Python, Go, Java, Kotlin, C# |
| `fastapi-codegen` | TypeScript (Buscar / Axios) |