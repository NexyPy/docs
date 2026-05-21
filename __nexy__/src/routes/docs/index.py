from typing import *
from fastapi import *
from pathlib import Path as __Path
from nexy import Template as __Template , Import as __Import
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]
from __nexy__.src.routes.docs.layout import Layout as __Layout

from __nexy__.src.components.codeblock import Codeblock
def Index(caller: Any = None, children: str = '') -> str:
    Slot = caller if (locals().get('caller') and callable(caller)) else (lambda: children if locals().get('children') else '')

    
    context = {"Codeblock": Codeblock, 'Slot': Slot}
    rendered = str(__Template().render("__nexy__/src/routes/docs/index.md", context))
    styles = """"""
    
    # Rendu final (potentiellement enveloppé par le Layout)
    return str(__Layout(children=rendered)) + styles
