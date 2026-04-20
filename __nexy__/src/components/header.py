from typing import *
from fastapi import *
from pathlib import Path as __Path
from nexy import Template as __Template , Import as __Import
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]

def Header() -> str:
        items = [{'label': 'showcase', 'href': '#'}, {'label': 'Docs', 'href': '#'}, {'label': 'Community', 'href': '#'}]
    
    context = {"items": items}
    rendered = str(__Template().render("__nexy__//src/components/header.html", context))
    styles = """"""
    return rendered + styles
