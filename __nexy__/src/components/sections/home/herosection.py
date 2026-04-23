from typing import *
from fastapi import *
from pathlib import Path as __Path
from nexy import Template as __Template , Import as __Import
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]

def Herosection() -> str:
        ReactCard = __Import(path='src/components/card.tsx', framework='react', symbol='Card')
    from __nexy__.src.components.card import Card
    from __nexy__.src.components.background import Background
    from __nexy__.src.components.sections.home.separetor import Separetor
    
    context = {"Background": Background, "Card": Card, "ReactCard": ReactCard, "Separetor": Separetor}
    rendered = str(__Template().render("__nexy__//src/components/sections/home/herosection.html", context))
    styles = """"""
    return rendered + styles
