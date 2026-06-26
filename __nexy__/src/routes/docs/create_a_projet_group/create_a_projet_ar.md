#بداية سريعة

أنشئ مشروع Nexy في ثوانٍ — لا يلزم التثبيت الشامل.

## المتطلبات الأساسية

- **بايثون 3.11+**
- **[uv](https://docs.astral.sh/uv/)** (مدير الحزم)
- **Node.js 18+** (لمكونات العميل وTailwind CSS)

## إنشاء مشروع

{% raw %}```bash
uvx nexy new
```{% endraw %}

أو حدد اسمًا مباشرةً:

{% raw %}```bash
uvx nexy new my-app
```{% endraw %}

يقوم `uvx` بتنزيل Nexy وتشغيله سريعًا - لا يوجد شيء يمكن تثبيته عالميًا.

## المطالبات التفاعلية

بعد تشغيل الأمر، يرشدك Nexy خلال عملية إعداد المشروع:

### 1. جهاز التوجيه

{% raw %}```text

» Use file-based router? (Y/n)
```{% endraw %}

- **نعم** — التوجيه المستند إلى الملفات (FBR): الصفحات عبارة عن ملفات في `routes/`
- **لا** — التوجيه المعياري: وحدات تحكم ووحدات مع أدوات تزيين

### 2. نوع المشروع

{% raw %}```bash
» Choose the type of project

  ʋ Web (monolith web app)

    API (RESTful API)
```{% endraw %}

### 3. إطار عمل العميل (الويب فقط)

{% raw %}```bash

» Use a client component? (Y/n)

```{% endraw %}

إذا كانت الإجابة بنعم:

{% raw %}```bash

» Choose the client framework

  ʋ React

    Vue

    Svelte

    Solid

    Preact

    None
```{% endraw %}

يتم تكوين Tailwind CSS تلقائيًا عند تحديد إطار عمل العميل.

### 4. ORM وقاعدة البيانات

{% raw %}```bash

» Choose an ORM

  ʋ SQLModel

    SQLAlchemy

    Tortoise-ORM

    None
```{% endraw %}

إذا تم تحديد ORM:

{% raw %}```bash

» Choose database

  ʋ SQLite

    PostgreSQL

    MySQL

» Database URL (sqlite:///dev.db)
```{% endraw %}

## ابدأ تشغيل خادم التطوير

{% raw %}```bash
cd my-app

nexy dev
```{% endraw %}

افتح [http://localhost:3000](http://localhost:3000) لرؤية تطبيقك.

## الخطوات التالية

مشروعك جاهز. توجه إلى [Project Structure](/docs/projet_structure) لفهم التخطيط، أو انتقل مباشرة إلى المبنى:

- [Your First Page](/docs/fbrouters/pages) — التوجيه المستند إلى الملف
- [Your First Controller](/docs/modular/controllers) — التوجيه المعياري