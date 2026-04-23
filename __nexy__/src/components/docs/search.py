from typing import *
from fastapi import *
from pathlib import Path as __Path
from nexy import Template as __Template , Import as __Import
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]

def Search(placeholder: str = 'Search documentation...', shortcut: str = 'Ctrl+K') -> str:
    
    
    context = {"placeholder": placeholder, "shortcut": shortcut}
    rendered = str(__Template().render("__nexy__//src/components/docs/search.html", context))
    styles = """"""
    return rendered + styles
