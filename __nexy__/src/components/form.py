from typing import *
from fastapi import *
from pathlib import Path as __Path
from nexy import Template as __Template , Import as __Import
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]

def Form() -> str:
    
    
    context = {}
    rendered = str(__Template().render("__nexy__//src/components/form.html", context))
    styles = """"""
    return rendered + styles
