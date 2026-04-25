from typing import *
from fastapi import *
from pathlib import Path as __Path
from nexy import Template as __Template , Import as __Import
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]

def WhatSection() -> str:
        from __nexy__.src.components.background import Background
    
    context = {"Background": Background}
    rendered = str(__Template().render("__nexy__//src/components/sections/home/WhatSection.html", context))
    styles = """"""
    return rendered + styles
