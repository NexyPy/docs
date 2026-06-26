#خلف الوكيل

عند التشغيل خلف Nginx أو Caddy أو Cloudflare أو موازن التحميل، قم بتكوين Nexy ليثق في الرؤوس المُعاد توجيهها.

## الرؤوس المعاد توجيهها

{% raw %}```python
# nexyconfig.py
from nexy.core.models import NexyConfigModel

class NexyConfig(NexyConfigModel):
    useTrustedHost = {
        "allowed_hosts": ["*"],
    }
```{% endraw %}

##يوفيكورن

عند الركض مع `nx start` أو مباشرة مع uvicorn، قم بتمرير علامة `--proxy-headers`:

{% raw %}```bash
nx start --proxy-headers

# or
uvicorn nexy.app:app --proxy-headers --forwarded-allow-ips="*"
```{% endraw %}

## مسار الجذر

إذا تم تثبيت تطبيقك على مسار فرعي (على سبيل المثال، `https://example.com/myapp/`):

{% raw %}```python
# nexyconfig.py
from nexy import app

app.root_path = "/myapp"
```{% endraw %}

## مثال إنجينكس

{% raw %}```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```{% endraw %}

## التأثيرات

عند التكوين بشكل صحيح:
- `request.url` يعكس عنوان URL الأصلي، وليس عنوان URL الداخلي
- تستخدم عمليات إعادة التوجيه النظام الصحيح (https)
- تحديد المعدل واكتشاف عنوان IP للعميل يستخدم عنوان IP الحقيقي للعميل
- تم إنشاء عناوين URL لمستندات OpenAPI بشكل صحيح