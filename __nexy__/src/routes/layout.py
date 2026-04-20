from typing import *
from fastapi import *
from pathlib import Path as __Path
from nexy import Template as __Template , Import as __Import
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]

def Layout(children: NexyElement = None) -> str:
        from __nexy__.src.components.header import Header
    from __nexy__.src.components.footer import Footer
    from nexy import Vite
    
    context = {"Footer": Footer, "Header": Header, "Vite": Vite, "children": children}
    rendered = str(__Template().render("__nexy__//src/routes/layout.html", context))
    styles = """"""
    return rendered + styles
