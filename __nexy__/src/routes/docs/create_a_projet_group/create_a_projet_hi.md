# त्वरित शुरुआत

कुछ ही सेकंड में एक नेक्सी प्रोजेक्ट बनाएं - किसी वैश्विक इंस्टॉल की आवश्यकता नहीं है।

## पूर्वावश्यकताएँ

- **पायथन 3.11+**
- **[uv](https://docs.astral.sh/uv/)** (पैकेज मैनेजर)
- **नोड.जेएस 18+** (क्लाइंट घटकों और टेलविंड सीएसएस के लिए)

## एक प्रोजेक्ट बनाएं

{% raw %}```bash
uvx nexy new
```{% endraw %}

या सीधे एक नाम निर्दिष्ट करें:

{% raw %}```bash
uvx nexy new my-app
```{% endraw %}

`uvx` नेक्सी को तुरंत डाउनलोड और चलाता है - विश्व स्तर पर इंस्टॉल करने के लिए कुछ भी नहीं।

## इंटरएक्टिव संकेत

कमांड चलाने के बाद, नेक्सी आपको प्रोजेक्ट सेटअप के बारे में बताता है:

### 1. राउटर

{% raw %}```text

» Use file-based router? (Y/n)
```{% endraw %}

- **हां** — फ़ाइल-आधारित रूटिंग (एफबीआर): पेज `routes/` में फ़ाइलें हैं
- **नहीं** - मॉड्यूलर रूटिंग: डेकोरेटर के साथ नियंत्रक और मॉड्यूल

### 2. प्रोजेक्ट प्रकार

{% raw %}```text

» Choose the type of project

  ʋ Web (monolith web app)

    API (RESTful API)
```{% endraw %}

### 3. क्लाइंट फ्रेमवर्क (केवल वेब)

{% raw %}```text

» Use a client component? (Y/n)
```{% endraw %}

यदि हां:

{% raw %}```text

» Choose the client framework

  ʋ React

    Vue

    Svelte

    Solid

    Preact

    None
```{% endraw %}

जब क्लाइंट फ्रेमवर्क चुना जाता है तो टेलविंड सीएसएस स्वतः कॉन्फ़िगर हो जाता है।

### 4. ओआरएम और डेटाबेस

{% raw %}```text

» Choose an ORM

  ʋ SQLModel

    SQLAlchemy

    Tortoise-ORM

    None
```{% endraw %}

यदि कोई ORM चुना गया है:

{% raw %}```text

» Choose database

  ʋ SQLite

    PostgreSQL

    MySQL

» Database URL (sqlite:///dev.db)
```{% endraw %}

## डेव सर्वर प्रारंभ करें

{% raw %}```bash
cd my-app

nexy dev
```{% endraw %}

अपना ऐप देखने के लिए [http://localhost:3000](http://localhost:3000) खोलें।

## अगले चरण

आपका प्रोजेक्ट तैयार है. लेआउट को समझने के लिए [Project Structure](/docs/projet_structure) पर जाएँ, या सीधे बिल्डिंग में जाएँ:

- [Your First Page](/docs/fbrouters/pages) - फ़ाइल-आधारित रूटिंग
- [Your First Controller](/docs/modular/controllers) - मॉड्यूलर रूटिंग