from typing import *
from fastapi import *
from pathlib import Path as __Path
from nexy import Template as __Template , Import as __Import
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]

def ShowcaseCard() -> str:
    src = 'https://cdn.dribbble.com/userupload/21654101/file/original-b78035e70995d79d73418a7a668076eb.jpg?resize=752x564&vertical=center'

    
    context = {"src": src}
    rendered = str(__Template().render("__nexy__/src/components/sections/showcaseCard.html", context))
    styles = """"""
    
    # Rendu final (potentiellement enveloppé par le Layout)
    return rendered + styles
