from typing import *
from fastapi import *
from pathlib import Path as __Path
from nexy import Template as __Template , Import as __Import
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]

def DocLayout(title: str = 'Nexy Documentation', description: str = 'The ultimate fullstack framework documentation', lang: str = 'en', slug: str = '', children: NexyElement = None) -> str:
    from __nexy__.src.components.docs.sidebar import Sidebar
    from __nexy__.src.components.docs.search import Search
    from __nexy__.src.components.docs.theme import Theme
    from nexy import Vite
    import os
    current_lang = lang
    if not current_lang and slug:
        parts = slug.strip('/').split('/')
        if parts:
            current_lang = parts[0]

    
    context = {"Search": Search, "Sidebar": Sidebar, "Theme": Theme, "Vite": Vite, "children": children, "current_lang": current_lang, "description": description, "lang": lang, "os": os, "slug": slug, "title": title}
    rendered = str(__Template().render("__nexy__/src/components/docs/DocLayout.html", context))
    styles = """"""
    
    # Rendu final (potentiellement enveloppé par le Layout)
    return rendered + styles
