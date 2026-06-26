# توليد العملاء

قم بإنشاء حزم SDK للعميل الآمن من مخطط OpenAPI الخاص بك.

## إنشاء عميل FastAPI

يتضمن FastAPI أمر `generate_client` الذي يقوم بإخراج عملاء TypeScript/JavaScript:

{% raw %}```bash
pip install fastapi
fastapi-codegen --input openapi.json --output ./client
```{% endraw %}

أو استخدم `openapi-generator`:

{% raw %}```bash
npm install "@openapitools/openapi-generator-cli
npx openapi-generator-cli generate \
    -i http://localhost:3000/openapi.json \
    -g typescript-fetch \
    -o ./client
```{% endraw %}

##نيكسي + liblab

[عنوان URL لـ Nexy OpenAPI] → يقوم [liblab](https://liblab.com) بإنشاء أدوات تطوير البرامج (SDK) بلغات متعددة.

## جلب يدوي

للحالات البسيطة، استخدم `fetch` مباشرة:

{% raw %}```typescript
const res = await fetch("/api/items/1");
const item = await res.json();
```{% endraw %}

## مكتبة العميل

يقوم Nexy بإنشاء أغلفة TypeScript لـ [Actions](/docs/guides/actions) في `./actions/`. بالنسبة لمعالجات المسار، استخدم عميل HTTP المفضل لديك (`fetch`، `axios`، `httpx`).

## اللغات

| أداة | اللغات |
|------|-----------|
| `openapi-generator` | تايب سكريبت، بايثون، جافا، غو، سي#، روست، 50+ |
| `liblab` | تايب سكريبت، بايثون، جو، جافا، كوتلين، C# |
| `fastapi-codegen` | تايب سكريبت (جلب / أكسيوس) |