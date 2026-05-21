from typing import *
from fastapi import *
from pathlib import Path as __Path
from nexy import Template as __Template , Import as __Import
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]


def ShowcaseCard(caller: Any = None, children: str = '') -> str:
    Slot = caller if (locals().get('caller') and callable(caller)) else (lambda: children if locals().get('children') else '')
    src = 'https://cdn.dribbble.com/userupload/21654101/file/original-b78035e70995d79d73418a7a668076eb.jpg?resize=752x564&vertical=center'
    src = 'https://cdn.dribbble.com/userupload/47594505/file/a5197266701f4116e5f60a7498d8bcfb.png?resize=2048x1536&vertical=center'
    
    context = {"src": src, 'Slot': Slot}
    rendered = str(__Template().render("__nexy__/src/components/sections/showcaseCard.html", context))
    styles = """"""
    
    # Rendu final (potentiellement enveloppé par le Layout)
    return rendered + styles
