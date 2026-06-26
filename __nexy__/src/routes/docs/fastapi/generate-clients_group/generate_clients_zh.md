# 生成客户端

从 OpenAPI 架构生成类型安全的客户端 SDK。

## FastAPI 的生成客户端

FastAPI 包含一个输出 TypeScript/JavaScript 客户端的 `generate_client` 命令：

{% raw %}```bash
pip install fastapi
fastapi-codegen --input openapi.json --output ./client
```{% endraw %}

或者使用`openapi-generator`：

{% raw %}```bash
npm install "@openapitools/openapi-generator-cli
npx openapi-generator-cli generate \
    -i http://localhost:3000/openapi.json \
    -g typescript-fetch \
    -o ./client
```{% endraw %}

## Nexy + liblab

[Nexy OpenAPI URL] → [liblab](https://liblab.com) 生成多种语言的 SDK。

## 手动获取

对于简单情况，直接使用`fetch`：

{% raw %}```typescript
const res = await fetch("/api/items/1");
const item = await res.json();
```{% endraw %}

## 客户端库

Nexy 为 `./actions/` 中的 [Actions](/docs/guides/actions) 生成 TypeScript 包装器。对于路由处理程序，请使用您首选的 HTTP 客户端（`fetch`、`axios`、`httpx`）。

## 语言

|工具|语言 |
|------|------------|
| `openapi-generator` | TypeScript、Python、Java、Go、C#、Rust、50+ |
| `liblab` | TypeScript、Python、Go、Java、Kotlin、C# |
| `fastapi-codegen` | TypeScript（获取/Axios）|