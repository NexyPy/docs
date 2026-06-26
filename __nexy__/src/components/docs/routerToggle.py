from typing import *
from fastapi import *
from pathlib import Path as __Path
from nexy import Template as __Template
from nexy.i18n.core import current_locale as __current_locale
from nexy.i18n.core import trans as __trans
from nexy.utils.imports.component_import import _Import as __Import
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]

from nexy import usePathname
from src.locales.routes.docs.sidebar import SidebarI18n
def RouterToggle(caller: Any = None, children: str = '') -> str:
    Slot = caller if (locals().get('caller') and callable(caller)) else (lambda: children if locals().get('children') else '')
    trans = __trans
    t = __trans
    pathname = usePathname()
    is_modular = pathname.startswith('/docs/modular')
    s = SidebarI18n()
    routers = {'fbr': {'label': s.router_toggle.fbr_label, 'desc': s.router_toggle.fbr_desc, 'active': not is_modular}, 'modular': {'label': s.router_toggle.modular_label, 'desc': s.router_toggle.modular_desc, 'active': is_modular}}
    
    context = {"pathname": pathname, "usePathname": usePathname, "SidebarI18n": SidebarI18n, "s": s, "routers": routers, "is_modular": is_modular, 'Slot': Slot, 'trans': __trans, '__locale': __current_locale.get()}
    rendered = str(__Template().render("__nexy__/src/components/docs/routerToggle.html", context))
    return rendered
