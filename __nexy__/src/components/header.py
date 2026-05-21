from typing import *
from fastapi import *
from pathlib import Path as __Path
from nexy import Template as __Template , Import as __Import
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]

from nexy import usePathname
from __nexy__.src.components.Image import Image
from __nexy__.src.components.link import Link
def Header(caller: Any = None, children: str = '') -> str:
    Slot = caller if (locals().get('caller') and callable(caller)) else (lambda: children if locals().get('children') else '')
    Language = __Import(path='src/components/language.tsx', framework='react', symbol='Language')
    Search = __Import(path='src/components/search.tsx', framework='react', symbol='Search')
    pathname = usePathname()
    items = [{'label': 'Docs', 'href': '/docs'}, {'label': 'showcase', 'href': '/showcase'}, {'label': 'Blog', 'href': '/blog'}, {'label': 'Community', 'href': '/community'}]
    
    context = {"Image": Image, "Language": Language, "Link": Link, "Search": Search, "items": items, "pathname": pathname, "usePathname": usePathname, 'Slot': Slot}
    rendered = str(__Template().render("__nexy__/src/components/header.html", context))
    styles = """"""
    
    # Rendu final (potentiellement enveloppé par le Layout)
    return rendered + styles
