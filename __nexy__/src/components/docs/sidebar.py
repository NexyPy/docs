from typing import *
from fastapi import *
from pathlib import Path as __Path
from nexy import Template as __Template , Import as __Import
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]

from src.mocks.docs.sidebar import SIDE_BAR
from __nexy__.src.components.link import Link
def Sidebar(caller: Any = None, children: str = '') -> str:
    Slot = caller if (locals().get('caller') and callable(caller)) else (lambda: children if locals().get('children') else '')

    
    context = {"Link": Link, "SIDE_BAR": SIDE_BAR, 'Slot': Slot}
    rendered = str(__Template().render("__nexy__/src/components/docs/sidebar.html", context))
    styles = """"""
    
    # Rendu final (potentiellement enveloppé par le Layout)
    return rendered + styles
