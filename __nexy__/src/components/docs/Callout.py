from typing import *
from fastapi import *
from pathlib import Path as __Path
from nexy import Template as __Template , Import as __Import
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]

def Callout(type: str = 'note', title: str = '', children: NexyElement = None) -> str:
    
    
    context = {"children": children, "title": title, "type": type}
    rendered = str(__Template().render("__nexy__//src/components/docs/Callout.html", context))
    styles = """"""
    return rendered + styles
