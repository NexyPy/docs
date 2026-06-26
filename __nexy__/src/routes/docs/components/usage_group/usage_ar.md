# استخدام المكونات

المكونات هي ملفات `.nexy` في `src/components/` تقوم باستيرادها إلى الصفحات والمكونات الأخرى.

## إنشاء مكون

المكون هو أي ملف `.nexy`. أبسط مكون ممكن ليس له واجهة أمامية - فقط HTML:

{% raw %}```nexy
<!-- src/components/Hello.nexy -->
---
---
<h1>Hello Nexy!</h1>
```{% endraw %}

لكن معظم المكونات لها دعائم ومنطق ونموذج.

## استيراد المكونات

استخدم بناء جملة استيراد مكونات Nexy، والذي يدعم المسارات النسبية والأسماء المستعارة التي تم تكوينها:

{% raw %}```nexy
---
from "./Card.nexy" import Card
from "./Header.nexy" import Header
from "@components/Button.nexy" import Button
---
```{% endraw %}

مسار الاستيراد متعلق بالملف الحالي. `"@/` يعين `src/` افتراضيًا (أو أي شيء قمت بتكوينه في `useAliases`).

**لماذا هذه الصيغة الخاصة؟** لأن المترجم يحتاج إلى معرفة أي علامات PascalCase هي مكونات مقابل عناصر HTML غير المعروفة في وقت الإنشاء. يقوم المطهر بتحويل هذه الواردات قبل أن يراها محلل Python AST، لذلك لا تسبب أخطاء في بناء الجملة أبدًا.

## مكونات العرض

في القالب، استخدم الاسم المستورد كعلامة HTML:

{% raw %}```nexy
---
from "./Card.nexy" import Card
---
<Card title="Hello" count={5} />
```{% endraw %}

يقوم المترجم بتحويل علامات PascalCase إلى استدعاءات دالة Jinja2:

| القالب | الإخراج المترجمة |
|----------|----------------|
| `<Card />` | `{{ '{{' }}Card() {{ '}}' }}` |
| `<Card title="Hi" />` | `{{ '{{' }} Card(title="Hi") {{ '}}' }}` |
| `<Card count={5} />` | `{{ '{{' }} Card(count=5) {{ '}}' }}` |
| `<Card>content</Card>` | `{{ '{%' }} call Card() {{ '%}' }}content{{ '{%' }} endcall {{ '%}' }}` |

**متطلبات التسمية**: أسماء المكونات **يجب** أن تبدأ بحرف كبير. إذا كنت تستخدم أحرفًا صغيرة، فسيعاملها المترجم كعنصر HTML عادي ولا يستدعي وظيفة المكون. يتوافق هذا مع تقليد منصة الويب (يجب أن تحتوي العناصر المخصصة على واصلة؛ أما PascalCase محجوز لمكونات إطار العمل).

## تمرير الدعائم

{% raw %}```nexy
---
from "./Card.nexy" import Card
---
<!-- Static string -->
<Card title="Hello" />

<!-- Dynamic Jinja2 expression -->
<Card title="{{ page_title }}" />

<!-- Unquoted value (expression, not string) -->
<Card count={5} active={true} items={["a", "b"]} />

<!-- Mixed -->
<Card title="{{ page_title }}" count={items|length} />
```{% endraw %}

**قواعد تمرير السمات**:

| بناء الجملة | نوع القيمة | إخراج القالب |
|--------|----------|----------------|
| `title="Hello"` | سلسلة | `Card(title="Hello")` |
| `title="{{ '{{' }} var {{ '}}' }}"` | تعبير Jinja2 | `Card(title=var)` |
| `count={5}` | تعبير بايثون | `Card(count=5)` |
| `active=true` | الكلمة المفتاحية (بيثون بول) | `Card(active=True)` |
| `items={["a"]}` | تعبير بايثون | `Card(items=["a"])` |

يتم تمرير القيم غير المقتبسة التي تطابق القيم الحرفية لـ Python (`true`، `false`، `none`، أرقام) كما هي. كل شيء آخر هو سلسلة.

**مسكتك**: `count={0}` يمرر العدد الصحيح 0. `count="0"` يمرر السلسلة `"0"`. في قوالب Jinja2، يتم تقييم `{{ '{%' }} if count {{ '%}' }}` بشكل مختلف لـ `0` (خطأ) مقابل `"0"` (صحيح). استخدم `{0}` عندما تحتاج إلى صفر رقمي.

## فتحة / أطفال

تستخدم المكونات التي تقوم بتغليف المحتوى `<slot />` لتحديد المكان الذي يذهب إليه الأطفال:

{% raw %}```nexy
<!-- Card.nexy -->
---
title:prop[str] = ""
---
<div class="card">
  {{ title }}
  <div class="card-body">
    <slot />
  </div>
</div>
```{% endraw %}

{% raw %}```nexy
<!-- Usage -->
---
from "./Card.nexy" import Card
---
<Card title="My Card">
  <p>This appears inside the slot.</p>
</Card>
```{% endraw %}

**كيفية عمل الفتحات**: يقوم المترجم بتغليف الأطفال في كتلة `{{ '{%' }} call {{ '%}' }}`. يستقبلها المكون كدالة `caller`. `<slot />` يستدعي `caller()` ويخرج النتيجة.

**القيود**:
- فتحة واحدة فقط غير مسماة لكل مكون
- لا توجد فتحات محددة النطاق (وظائف التمرير كدعائم بدلاً من ذلك)
- تعمل الفتحات فقط في ملفات `.nexy`، وليس في قوالب Jinja2 الأولية

## الإغلاق الذاتي مقابل التغليف

مكونات الإغلاق الذاتي (بدون أطفال):

{% raw %}```nexy
<Header title="Blog" />
<Separator />
<Spacer size={16} />
```{% endraw %}

مكونات التغليف (مع الأطفال):

{% raw %}```nexy
<Card title="Post">
  <p>Content here</p>
</Card>

<Layout>
  <Header />
  <main>Page content</main>
  <Footer />
</Layout>
```{% endraw %}

يكتشف المترجم علامات الإغلاق الذاتي (`<Card />`) مقابل العلامات ذات الأطفال (`<Card>...</Card>`) ويقوم بإنشاء بناء جملة Jinja2 المناسب.

## الإرجاع المبكر / العرض المشروط

نظرًا لأن المكون عبارة عن دالة بايثون، فيمكنك العودة مبكرًا إلى المادة الأمامية:

{% raw %}```nexy
---
title:prop[str] = ""
if not title:
    print("Warning: Card rendered without title")
    # Return early — the template still runs but title is empty
---
<div class="card">
  {{ title }}
  <slot />
</div>
```{% endraw %}

للعرض الشرطي في القالب، استخدم Jinja2 `{{ '{%' }} if {{ '%}' }}`:

{% raw %}```nexy
---
show_header:prop[bool] = true
---
{% if show_header %}
  <header>
    <slot />
  </header>
{% endif %}
```{% endraw %}

## أفضل الممارسات

- **مكون واحد لكل ملف** — تسمية واضحة، يسهل العثور عليها
- **احتفظ بالنماذج أقل من 50 سطرًا** — إذا كانت أطول، فاستخرج المكونات الفرعية
- **استخدم الدعائم بدلاً من الترميز الثابت** — يجعل المكونات قابلة لإعادة الاستخدام
- **تسمية الملفات في PascalCase** — `BlogCard.nexy` وليس `blog_card.nexy`
- **الدعائم الافتراضية للقيم الاختيارية** — `title:prop[str] = ""` وليس `title:prop[str]`

## التالي

- [Markup](/docs/components/markup): بناء جملة القالب، والسمات الديناميكية، واصطلاحات HTML
- [Properties](/docs/components/properties): الدعائم المكتوبة، والافتراضيات، وأنماط التحقق من الصحة