from typing import *
from fastapi import *
from pathlib import Path as __Path
from nexy import Template as __Template , Import as __Import
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]

from __nexy__.src.components.card import Card
from __nexy__.src.components.link import Link
from __nexy__.src.components.background import Background
from __nexy__.src.components.sections.home.heroright import Heroright
def Hero(caller: Any = None, children: str = '') -> str:
    Slot = caller if (locals().get('caller') and callable(caller)) else (lambda: children if locals().get('children') else '')

    
    context = {"Background": Background, "Card": Card, "Heroright": Heroright, "Link": Link, 'Slot': Slot}
    rendered = str(__Template().render("__nexy__/src/components/sections/home/Hero.html", context))
    styles = """"""
    
    # Rendu final (potentiellement enveloppé par le Layout)
    return rendered + styles
