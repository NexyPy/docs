from typing import *
from fastapi import *
from pathlib import Path as __Path
from nexy import Template as __Template , Import as __Import
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]

def Card(className: str = None, caller: callable = None) -> str:
    
    
    context = {"caller": caller, "className": className}
    rendered = str(__Template().render("__nexy__//src/components/card.html", context))
    styles = """"""
    return rendered + styles
