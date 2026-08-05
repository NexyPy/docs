from typing import *
from fastapi import *
from pathlib import Path as __Path
from nexy import Template as __Template
from nexy.i18n.core import current_locale as __current_locale
from nexy.i18n.core import trans as __trans
from nexy.utils.imports.component_import import _Import as __Import
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]

from src.utils import is_vercel
def Image(src: str = None, srcset: str = None, className: str = None, alt: str = None, caller: Any = None, children: str = '') -> str:
    Slot = caller if (locals().get('caller') and callable(caller)) else (lambda: children if locals().get('children') else '')
    trans = __trans
    t = __trans
    if is_vercel and src.startswith('/public/'):
        src = src.replace('/public/', '/')
        srcset = srcset.replace('/public/', '/') if srcset else None
    
    context = {"srcset": srcset, "alt": alt, "className": className, "is_vercel": is_vercel, "src": src, 'Slot': Slot, 'trans': __trans, '__locale': __current_locale.get()}
    rendered = str(__Template().render("__nexy__/src/components/Image.html", context))
    return rendered
