from typing import *
from fastapi import *
from pathlib import Path as __Path
from nexy import Template as __Template , Import as __Import
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]

from __nexy__.src.components.Image import Image
from __nexy__.src.components.link import Link
def Footer(caller: Any = None, children: str = '') -> str:
    Slot = caller if (locals().get('caller') and callable(caller)) else (lambda: children if locals().get('children') else '')
    Theme = __Import(path='src/components/theme.tsx', framework='react', symbol='Theme')
    Form = __Import(path='src/components/form.tsx', framework='react', symbol='Form')
    Resources = [{'label': 'Docs', 'href': '/docs'}, {'label': 'Learn', 'href': '/learn'}, {'label': 'Showcase', 'href': '/showcase'}, {'label': 'Blog', 'href': '/blog'}]
    Community = [{'label': 'Team', 'href': '/community/team'}, {'label': 'Governance', 'href': '/community/governance'}, {'label': 'Contributors', 'href': '/community/contributor'}, {'label': 'GitHub', 'href': 'https://github.com/NexyPy/nexy'}]
    Items = [{'title': 'Resources', 'items': Resources}, {'title': 'Community', 'items': Community}]
    es = 89
    
    context = {"Community": Community, "Form": Form, "Image": Image, "Items": Items, "Link": Link, "Resources": Resources, "Theme": Theme, "es": es, 'Slot': Slot}
    rendered = str(__Template().render("__nexy__/src/components/footer.html", context))
    styles = """"""
    
    # Rendu final (potentiellement enveloppé par le Layout)
    return rendered + styles
