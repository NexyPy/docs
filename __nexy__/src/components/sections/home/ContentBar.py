from typing import *
from fastapi import *
from pathlib import Path as __Path
from nexy import Template as __Template , Import as __Import
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]

def ContentBar() -> str:
    items = ['Websocket', 'HTTP', 'Jinja2', 'Vitejs', 'Mdx', 'Production']

    
    context = {"items": items}
    rendered = str(__Template().render("__nexy__/src/components/sections/home/ContentBar.html", context))
    styles = """"""
    
    # Rendu final (potentiellement enveloppé par le Layout)
    return rendered + styles
