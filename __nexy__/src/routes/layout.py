from typing import *
from fastapi import *
from pathlib import Path as __Path
from nexy import Template as __Template , Import as __Import
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]

from __nexy__.src.components.header import Header
from __nexy__.src.components.footer import Footer
from nexy import Vite
def Layout(children: NexyElement = None, caller: Any = None) -> str:
    Slot = caller if (locals().get('caller') and callable(caller)) else (lambda: children if locals().get('children') else '')
    VercelAnalytics = __Import(path='src/components/vercel.tsx', framework='react', symbol='VercelAnalytics')
    children = f"<nslot  style='display:contents;'>{children}</nslot>" 
    context = {"Footer": Footer, "Header": Header, "VercelAnalytics": VercelAnalytics, "Vite": Vite, "children": children, 'Slot': Slot}
    rendered = str(__Template().render("__nexy__/src/routes/layout.html", context))
    styles = """"""
    
    # Rendu final (potentiellement enveloppé par le Layout)
    return rendered + styles
