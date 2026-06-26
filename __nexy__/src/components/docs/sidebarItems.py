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
def SidebarItems(SIDE_BAR_Items: list = None, className: str = None, caller: Any = None, children: str = '') -> str:
    Slot = caller if (locals().get('caller') and callable(caller)) else (lambda: children if locals().get('children') else '')
    trans = __trans
    t = __trans
    pathname = usePathname()
    
    context = {"className": className, "pathname": pathname, "SIDE_BAR_Items": SIDE_BAR_Items, "usePathname": usePathname, 'Slot': Slot, 'trans': __trans, '__locale': __current_locale.get()}
    rendered = str(__Template().render("__nexy__/src/components/docs/sidebarItems.html", context))
    return rendered
