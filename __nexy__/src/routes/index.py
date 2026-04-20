from typing import *
from fastapi import *
from pathlib import Path as __Path
from nexy import Template as __Template , Import as __Import
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]

def Index() -> str:
        ReactCard = __Import(path='src/components/card.tsx', framework='react', symbol='Card')
    from __nexy__.src.components.card import Card
    from __nexy__.src.components.background import Background
    
    context = {"Background": Background, "Card": Card, "ReactCard": ReactCard}
    rendered = str(__Template().render("__nexy__//src/routes/index.html", context))
    styles = """"""
    return rendered + styles
