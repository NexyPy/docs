from typing import *
from fastapi import *
from pathlib import Path as __Path
from nexy import Template as __Template , Import as __Import
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]

def Index() -> str:
        from __nexy__.src.components.codeblock import Codeblock
    
    context = {"Codeblock": Codeblock}
    rendered = str(__Template().render("__nexy__//src/routes/docs/index.md", context))
    styles = """"""
    return rendered + styles
