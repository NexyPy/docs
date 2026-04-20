from typing import *
from fastapi import *
from pathlib import Path as __Path
from nexy import Template as __Template , Import as __Import
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]

def Footer() -> str:
        Theme = __Import(path='src/components/theme.tsx', framework='react', symbol='Theme')
    
    context = {"Theme": Theme}
    rendered = str(__Template().render("__nexy__//src/components/footer.html", context))
    styles = """"""
    return rendered + styles
