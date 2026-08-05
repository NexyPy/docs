from typing import *
from fastapi import *
from pathlib import Path as __Path
from nexy import Template as __Template
from nexy.i18n.core import current_locale as __current_locale
from nexy.i18n.core import trans as __trans
from nexy.utils.imports.component_import import _Import as __Import
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]

from src.locales.routes.docs.layout import DocsLayoutI18n
from nexy import useToc
def Table_of_contents(caller: Any = None, children: str = '') -> str:
    Slot = caller if (locals().get('caller') and callable(caller)) else (lambda: children if locals().get('children') else '')
    trans = __trans
    t = __trans
    toc_html = useToc()
    dl = DocsLayoutI18n()
    
    context = {"dl": dl, "useToc": useToc, "DocsLayoutI18n": DocsLayoutI18n, "toc_html": toc_html, 'Slot': Slot, 'trans': __trans, '__locale': __current_locale.get()}
    rendered = str(__Template().render("__nexy__/src/components/docs/table_of_contents.html", context))
    return rendered
