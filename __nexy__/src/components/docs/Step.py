from typing import *
from fastapi import *
from pathlib import Path as __Path
from nexy import Template as __Template , Import as __Import
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]

def Step(number: int = 1, title: str = '', children: NexyElement = None) -> str:
    
    
    context = {"children": children, "number": number, "title": title}
    rendered = str(__Template().render("__nexy__//src/components/docs/Step.html", context))
    styles = """"""
    return rendered + styles
