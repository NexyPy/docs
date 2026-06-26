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
    from __nexy__.src.routes.docs.layout import Layout as __Layout
except ImportError:
    def __Layout(children: str = '', **kwargs) -> str:
        return '<div data-nexy-error="Layout not available"></div>'

from nexy import usePathname
from __nexy__.src.components.link import Link
def Route_handlers_ru(caller: Any = None, children: str = '') -> str:
    Slot = caller if (locals().get('caller') and callable(caller)) else (lambda: children if locals().get('children') else '')
    trans = __trans
    t = __trans
    pathname = usePathname()
    
    context = {"pathname": pathname, "Link": Link, "usePathname": usePathname, 'Slot': Slot, 'trans': __trans, '__locale': __current_locale.get()}
    rendered = str(__Template().render("__nexy__/src/routes/docs/fbrouters/route_handlers_group/route_handlers_ru.md", context))
    return str(__Layout(children=rendered))
