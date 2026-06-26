# Генерация клиентов

Создавайте типобезопасные клиентские SDK на основе схемы OpenAPI.

## Создание клиента FastAPI

FastAPI включает команду `generate_client`, которая выводит клиенты TypeScript/JavaScript:

{% raw %}```bash
pip install fastapi
fastapi-codegen --input openapi.json --output ./client
```{% endraw %}

Или используйте `openapi-generator`:

{% raw %}```bash
npm install "@openapitools/openapi-generator-cli
npx openapi-generator-cli generate \
    -i http://localhost:3000/openapi.json \
    -g typescript-fetch \
    -o ./client
```{% endraw %}

##Nexy + liblab

[URL-адрес Nexy OpenAPI] → [liblab](https://liblab.com) генерирует SDK на нескольких языках.

## Получение вручную

В простых случаях используйте `fetch` напрямую:

{% raw %}```typescript
const res = await fetch("/api/items/1");
const item = await res.json();
```{% endraw %}

## Клиентская библиотека

Nexy генерирует оболочки TypeScript для [Actions](/docs/guides/actions) в `./actions/`. Для обработчиков маршрутов используйте предпочитаемый вами HTTP-клиент (`fetch`, `axios`, `httpx`).

## Языки

| Инструмент | Языки |
|------|-----------|
| `openapi-generator` | TypeScript, Python, Java, Go, C#, Rust, 50+ |
| `liblab` | TypeScript, Python, Go, Java, Kotlin, C# |
| `fastapi-codegen` | TypeScript (Fetch/Axios) |