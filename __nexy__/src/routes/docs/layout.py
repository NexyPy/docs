from typing import *
from fastapi import *
from pathlib import Path as __Path
from nexy import Template as __Template , Import as __Import
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]
from __nexy__.src.routes.layout import Layout as __Layout

from __nexy__.src.components.docs.sidebar import Sidebar
from __nexy__.src.components.docs.table_of_contents import Table_of_contents
def Layout(children: str = None, caller: Any = None) -> str:
    Slot = caller if (locals().get('caller') and callable(caller)) else (lambda: children if locals().get('children') else '')

    children = f"<nslot  style='display:contents;'>{children}</nslot>" 
    context = {"Sidebar": Sidebar, "Table_of_contents": Table_of_contents, "children": children, 'Slot': Slot}
    rendered = str(__Template().render("__nexy__/src/routes/docs/layout.html", context))
    styles = """"""
    
    # Rendu final (potentiellement enveloppé par le Layout)
    return str(__Layout(children=rendered)) + styles
