from typing import *
from fastapi import *
from pathlib import Path as __Path
from nexy import Template as __Template , Import as __Import
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]

def Hero() -> str:
    from __nexy__.src.components.card import Card
    from __nexy__.src.components.background import Background

    
    context = {"Background": Background, "Card": Card}
    rendered = str(__Template().render("__nexy__/src/components/sections/home/Hero.html", context))
    styles = """"""
    
    # Rendu final (potentiellement enveloppé par le Layout)
    return rendered + styles
