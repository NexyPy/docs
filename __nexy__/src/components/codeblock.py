from typing import *
from fastapi import *
from pathlib import Path as __Path
from nexy import Template as __Template , Import as __Import
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]


def Codeblock(tabs: Union[str, list] = '', caller: Any = None, children: str = '') -> str:
    Slot = caller if (locals().get('caller') and callable(caller)) else (lambda: children if locals().get('children') else '')
    is_str = isinstance(tabs, str)
    
    context = {"is_str": is_str, "tabs": tabs, 'Slot': Slot}
    rendered = str(__Template().render("__nexy__/src/components/codeblock.html", context))
    styles = """"""
    
    # Rendu final (potentiellement enveloppé par le Layout)
    return rendered + styles
