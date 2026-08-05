from typing import *
from fastapi import *
from pathlib import Path as __Path
from nexy import Template as __Template
from nexy.i18n.core import current_locale as __current_locale
from nexy.i18n.core import trans as __trans
from nexy.utils.imports.component_import import _Import as __Import
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]
try:
    from __nexy__.src.routes.layout import Layout as __Layout
except ImportError:
    def __Layout(children: str = '', **kwargs) -> str:
        return '<div data-nexy-error="Layout not available"></div>'

from src.locales.routes.community.layout import HeroI18n, SidebarI18n
from __nexy__.src.components.sections.otherHero import OtherHero
def Layout(children: str = None, caller: Any = None) -> str:
    Slot = caller if (locals().get('caller') and callable(caller)) else (lambda: children if locals().get('children') else '')
    trans = __trans
    t = __trans
    h = HeroI18n()
    s = SidebarI18n()
    title = h.title
    description = h.description
    children = f"<nslot  style='display:contents;'>{children}</nslot>" 
    context = {"children": children, "OtherHero": OtherHero, "SidebarI18n": SidebarI18n, "h": h, "HeroI18n": HeroI18n, "title": title, "s": s, "description": description, 'Slot': Slot, 'trans': __trans, '__locale': __current_locale.get()}
    rendered = str(__Template().render("__nexy__/src/routes/community/layout.html", context))
    return str(__Layout(children=rendered))
