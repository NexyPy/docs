from typing import *
from fastapi import *
from pathlib import Path as __Path
from nexy import Template as __Template , Import as __Import
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]
from __nexy__.src.routes.layout import Layout as __Layout

def Index() -> str:
    from __nexy__.src.components.sections.otherHero import OtherHero
    from __nexy__.src.components.sections.blogCard import BlogCard
    from __nexy__.src.components.sections.separator import Separator
    title = 'The Nexy Blog'
    description = 'Read the latest news about all Nexy solutions, from framework announcements to integration tutorials'

    
    context = {"BlogCard": BlogCard, "OtherHero": OtherHero, "Separator": Separator, "description": description, "title": title}
    rendered = str(__Template().render("__nexy__/src/routes/blog/index.html", context))
    styles = """"""
    
    # Rendu final (potentiellement enveloppé par le Layout)
    return str(__Layout(children=rendered)) + styles
