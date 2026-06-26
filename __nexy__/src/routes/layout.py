from typing import *
from fastapi import *
from pathlib import Path as __Path
from nexy import Template as __Template
from nexy.i18n.core import current_locale as __current_locale
from nexy.i18n.core import trans as __trans
from nexy.utils.imports.component_import import _Import as __Import
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]

from __nexy__.src.components.header import Header
from __nexy__.src.components.footer import Footer
from nexy import Vite
def Layout(children: NexyElement = None, caller: Any = None) -> str:
    Slot = caller if (locals().get('caller') and callable(caller)) else (lambda: children if locals().get('children') else '')
    trans = __trans
    t = __trans
    VercelAnalytics = __Import(path='src/components/vercel.tsx', framework='react', symbol='VercelAnalytics')
    children = f"<nslot  style='display:contents;'>{children}</nslot>" 
    context = {"Footer": Footer, "VercelAnalytics": VercelAnalytics, "children": children, "Vite": Vite, "Header": Header, 'Slot': Slot, 'trans': __trans, '__locale': __current_locale.get()}
    rendered = str(__Template().render("__nexy__/src/routes/layout.html", context))
    return rendered
