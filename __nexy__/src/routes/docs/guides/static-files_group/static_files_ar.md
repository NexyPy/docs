# الملفات الثابتة

يقدم Nexy ملفات ثابتة من الدليل `public/` في جذر المشروع الخاص بك.

## كيف يعمل

يتم عرض أي ملف موضوع في `public/` على مسار URL الجذر:

{% raw %}```text
public/
├── logo.svg           →  /logo.svg
├── images/
│   └── hero.jpg       →  /images/hero.jpg
├── fonts/
│   └── inter.woff2    →  /fonts/inter.woff2
└── robots.txt         →  /robots.txt
```{% endraw %}

لا حاجة للتكوين. يتم عرض الملفات الموجودة في `public/` تلقائيًا.

## دليل الأصول

بالنسبة للأصول المجمعة (CSS، JS من Vite)، استخدم الدليل `assets/` أو قم بتكوين الإخراج في `vite.config.ts`. يقوم Nexy بتثبيتها عند `/assets/`.

## الرجوع إلى الملفات الثابتة

في قوالب `.nexy`:

{% raw %}```nexy
<img src="/logo.svg" alt="Logo" />
<link rel="stylesheet" href="/styles/global.css" />
```{% endraw %}

في معالجات المسار أو الواجهة الأمامية لـ Python، تكون المسارات مرتبطة بجذر المشروع.

##الإنتاج

أثناء `nx build`، يتم نسخ الدليل `public/` إلى `__nexy__/public/`. يخدم خادم الإنتاج الخاص بك هذه الملفات مباشرةً، دون الحاجة إلى تجميعها.