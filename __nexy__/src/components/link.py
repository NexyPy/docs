from typing import *
from fastapi import *
from pathlib import Path as __Path
from nexy import Template as __Template , Import as __Import
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]

def Link(href: str = '', caller: callable = None, target: str = '', className: str = None) -> str:


    
    context = {"caller": caller, "className": className, "href": href, "target": target}
    rendered = str(__Template().render("__nexy__/src/components/link.html", context))
    styles = """"""
    
    # Rendu final (potentiellement enveloppé par le Layout)
    return rendered + styles
