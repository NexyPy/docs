from typing import *
from fastapi import *
from pathlib import Path as __Path
from nexy import Template as __Template , Import as __Import
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]

from src.utils import is_vercel
def Image(src: str = None, srcset: str = None, className: str = None, alt: str = None, caller: Any = None, children: str = '') -> str:
    Slot = caller if (locals().get('caller') and callable(caller)) else (lambda: children if locals().get('children') else '')
    if is_vercel and src.startswith('/public/'):
        src = src.replace('/public/', '/')
        srcset = srcset.replace('/public/', '/') if srcset else None
    
    context = {"alt": alt, "className": className, "is_vercel": is_vercel, "src": src, "srcset": srcset, 'Slot': Slot}
    rendered = str(__Template().render("__nexy__/src/components/Image.html", context))
    styles = """"""
    
    # Rendu final (potentiellement enveloppé par le Layout)
    return rendered + styles
