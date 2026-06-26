# بناء نإكس

تجميع المشروع للإنتاج - تجميع `.nexy`/`.mdx`، وSSG، وتجميع العميل.

{% raw %}```bash
nx build
```{% endraw %}

---

## ماذا يفعل

1. تجميع جميع ملفات `.nexy`/`.mdx` إلى `__nexy__/` (متوازي، متعدد الخيوط)
2. يُنشئ صفحات SSG (إنشاء موقع ثابت) - يعرض مسبقًا HTML للمسارات الثابتة
3. تشغيل بناء إنتاج Vite لمكونات العميل (إذا تم تكوينه)
4. يقوم بإنشاء شجرة المسار المجمعة لتطبيق FastAPI

يذهب الإخراج إلى `__nexy__/`:

{% raw %}```text
__nexy__/
├── server/          — Compiled Python routes
├── client/          — Bundled JS/CSS (Vite)
├── static/          — Pre-rendered HTML (SSG)
└── manifest.json    — Build manifest
```{% endraw %}

---

## الخيارات

| علم | الافتراضي | الوصف |
|------|---------|-------------|
| `--check` | `false` | قم بتشغيل ruff + mypy بعد التجميع |
| `--static` | `false` | تصدير موقع ثابت كامل (بدون خادم) |

---

## مثال

{% raw %}```bash
# Build with type checking
nx build --check

# Build as static site
nx build --static
```{% endraw %}

---

## الاسم المستعار

`nx b`