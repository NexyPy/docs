from typing import *
from fastapi import *
from pathlib import Path as __Path
from nexy import Template as __Template , Import as __Import
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]

def Header() -> str:
        Language = __Import(path='src/components/language.tsx', framework='react', symbol='Language')
    Search = __Import(path='src/components/search.tsx', framework='react', symbol='Search')
    from __nexy__.src.components.Image import Image
    items = [{'label': 'Docs', 'href': '/docs'}, {'label': 'showcase', 'href': '/showcase'}, {'label': 'Blog', 'href': '/blog'}, {'label': 'Community', 'href': '/community'}]
    
    context = {"Image": Image, "Language": Language, "Search": Search, "items": items}
    rendered = str(__Template().render("__nexy__//src/components/header.html", context))
    styles = """"""
    return rendered + styles
