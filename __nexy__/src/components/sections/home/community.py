from typing import *
from fastapi import *
from pathlib import Path as __Path
from nexy import Template as __Template
from nexy.i18n.core import current_locale as __current_locale
from nexy.i18n.core import trans as __trans
from nexy.utils.imports.component_import import _Import as __Import
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]

from __nexy__.src.components.link import Link
from src.utils import resolve_url
def Community(caller: Any = None, children: str = '') -> str:
    Slot = caller if (locals().get('caller') and callable(caller)) else (lambda: children if locals().get('children') else '')
    trans = __trans
    t = __trans
    creator = 'https://avatars.githubusercontent.com/u/108950035?s=400&u=8c53eecafb5ed2d9e0a4ff4c6275710fcf1bf029&v=4'
    contributor = resolve_url('/community')
    menbre = resolve_url('/community')
    
    context = {"contributor": contributor, "Link": Link, "menbre": menbre, "resolve_url": resolve_url, "creator": creator, 'Slot': Slot, 'trans': __trans, '__locale': __current_locale.get()}
    rendered = str(__Template().render("__nexy__/src/components/sections/home/community.html", context))
    return rendered
