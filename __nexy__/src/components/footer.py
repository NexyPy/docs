from typing import *
from fastapi import *
from pathlib import Path as __Path
from nexy import Template as __Template
from nexy.i18n.core import current_locale as __current_locale
from nexy.i18n.core import trans as __trans
from nexy.utils.imports.component_import import _Import as __Import
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]

from src.locales.components.header import HeaderI18n
from src.locales.components.footer import FooterI18n as FooterLocale
from __nexy__.src.components.Image import Image
from __nexy__.src.components.link import Link
def Footer(caller: Any = None, children: str = '') -> str:
    Slot = caller if (locals().get('caller') and callable(caller)) else (lambda: children if locals().get('children') else '')
    trans = __trans
    t = __trans
    Theme = __Import(path='src/components/theme.tsx', framework='react', symbol='Theme')
    Form = __Import(path='src/components/form.tsx', framework='react', symbol='Form')
    h = HeaderI18n()
    f = FooterLocale()
    Resources = [{'label': h.docs, 'href': '/docs'}, {'label': h.learn, 'href': '/learn'}, {'label': h.showcase, 'href': '/showcase'}, {'label': h.blog, 'href': '/blog'}]
    Community = [{'label': f.team, 'href': '/community/team'}, {'label': f.governance, 'href': '/community/governance'}, {'label': f.contributors, 'href': '/community/contributor'}, {'label': f.github, 'href': 'https://github.com/NexyPy/nexy'}]
    Items = [{'title': f.resources, 'items': Resources}, {'title': f.community, 'items': Community}]
    
    context = {"Link": Link, "Image": Image, "Resources": Resources, "Community": Community, "Theme": Theme, "h": h, "Form": Form, "Items": Items, "HeaderI18n": HeaderI18n, "f": f, "FooterLocale": FooterLocale, 'Slot': Slot, 'trans': __trans, '__locale': __current_locale.get()}
    rendered = str(__Template().render("__nexy__/src/components/footer.html", context))
    return rendered
