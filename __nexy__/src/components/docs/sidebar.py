from typing import *
from fastapi import *
from pathlib import Path as __Path
from nexy import Template as __Template , Import as __Import
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]

def Sidebar(lang: str = 'en') -> str:
        import os
    import re

    def get_dynamic_sidebar(current_lang: str):
        base_path = '_docs'
        lang_path = os.path.join(base_path, current_lang)
        if not os.path.exists(lang_path):
            lang_path = os.path.join(base_path, 'en')
            current_lang = 'en'
        if not os.path.exists(lang_path):
            return []
        sidebar_items = []
        try:
            entries = sorted(os.listdir(lang_path))
        except Exception:
            return []
        for entry in entries:
            entry_path = os.path.join(lang_path, entry)
            label = re.sub('^\\d+\\.\\s*', '', entry).replace('.mdx', '').replace('.md', '')
            slug_part = label.lower().replace(' ', '-')
            if os.path.isdir(entry_path):
                section = {'title': label, 'items': []}
                sub_entries = sorted(os.listdir(entry_path))
                for sub in sub_entries:
                    if sub.endswith(('.md', '.mdx')):
                        sub_label = re.sub('^\\d+\\.\\s*', '', sub).replace('.mdx', '').replace('.md', '')
                        sub_slug = sub_label.lower().replace(' ', '-')
                        section['items'].append({'label': sub_label, 'href': f'/docs/{current_lang}/{slug_part}/{sub_slug}'})
                if section['items']:
                    sidebar_items.append(section)
            elif entry.endswith(('.md', '.mdx')):
                sidebar_items.append({'label': label, 'href': f'/docs/{current_lang}/{slug_part}'})
        return sidebar_items
    items = get_dynamic_sidebar(lang)
    
    context = {"get_dynamic_sidebar": get_dynamic_sidebar, "items": items, "lang": lang, "os": os, "re": re}
    rendered = str(__Template().render("__nexy__//src/components/docs/sidebar.html", context))
    styles = """"""
    return rendered + styles
