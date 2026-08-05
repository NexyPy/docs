from typing import *
from fastapi import *
from pathlib import Path as __Path
from nexy import Template as __Template
from nexy.i18n.core import current_locale as __current_locale
from nexy.i18n.core import trans as __trans
from nexy.utils.imports.component_import import _Import as __Import
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]

from __nexy__.src.components.docs.sidebarItems import SidebarItems
from __nexy__.src.components.docs.routerToggle import RouterToggle
from src.mocks.docs.sidebar import build_sections
from src.locales.routes.docs.sidebar import SidebarI18n
from nexy import usePathname
def Sidebar(caller: Any = None, children: str = '') -> str:
    Slot = caller if (locals().get('caller') and callable(caller)) else (lambda: children if locals().get('children') else '')
    trans = __trans
    t = __trans
    pathname = usePathname()
    is_modular = pathname.startswith('/docs/modular')
    s = SidebarI18n()
    
    context = {"build_sections": build_sections, "pathname": pathname, "SidebarItems": SidebarItems, "usePathname": usePathname, "SidebarI18n": SidebarI18n, "is_modular": is_modular, "RouterToggle": RouterToggle, "s": s, 'Slot': Slot, 'trans': __trans, '__locale': __current_locale.get()}
    rendered = str(__Template().render("__nexy__/src/components/docs/sidebar.html", context))
    return rendered
