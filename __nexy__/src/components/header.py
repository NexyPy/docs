from typing import *
from fastapi import *
from pathlib import Path as __Path
from nexy import Template as __Template
from nexy.i18n.core import current_locale as __current_locale
from nexy.i18n.core import trans as __trans
from nexy.utils.imports.component_import import _Import as __Import
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]

from src.locales.components.header import HeaderI18n as HeaderLocale
from nexy import usePathname
from __nexy__.src.components.Image import Image
from __nexy__.src.components.link import Link
def Header(caller: Any = None, children: str = '') -> str:
    Slot = caller if (locals().get('caller') and callable(caller)) else (lambda: children if locals().get('children') else '')
    trans = __trans
    t = __trans
    Language = __Import(path='src/components/language.tsx', framework='react', symbol='Language')
    Search = __Import(path='src/components/search.tsx', framework='react', symbol='Search')
    pathname = usePathname()
    h = HeaderLocale()
    items = [{'label': h.docs, 'href': '/docs'}, {'label': h.showcase, 'href': '/showcase'}, {'label': h.blog, 'href': '/blog'}, {'label': h.community, 'href': '/community'}]
    
    context = {"Search": Search, "pathname": pathname, "Link": Link, "Image": Image, "usePathname": usePathname, "h": h, "Language": Language, "HeaderLocale": HeaderLocale, "items": items, 'Slot': Slot, 'trans': __trans, '__locale': __current_locale.get()}
    rendered = str(__Template().render("__nexy__/src/components/header.html", context))
    return rendered
