from typing import *
from fastapi import *
from pathlib import Path as __Path
from nexy import Template as __Template
from nexy.i18n.core import current_locale as __current_locale
from nexy.i18n.core import trans as __trans
from nexy.utils.imports.component_import import _Import as __Import
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]

from src.utils import resolve_url
def BlogCard(caller: Any = None, children: str = '') -> str:
    Slot = caller if (locals().get('caller') and callable(caller)) else (lambda: children if locals().get('children') else '')
    trans = __trans
    t = __trans
    src = 'https://cdn.dribbble.com/userupload/21654101/file/original-b78035e70995d79d73418a7a668076eb.jpg?resize=752x564&vertical=center'
    src, srcset = resolve_url('/public/nexy.png')
    
    context = {"resolve_url": resolve_url, "src": src, 'Slot': Slot, 'trans': __trans, '__locale': __current_locale.get()}
    rendered = str(__Template().render("__nexy__/src/components/sections/blogCard.html", context))
    return rendered
