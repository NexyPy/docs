from typing import *
from fastapi import *
from pathlib import Path as __Path
from nexy import Template as __Template , Import as __Import
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]

def Footer() -> str:
        Theme = __Import(path='src/components/theme.tsx', framework='react', symbol='Theme')
    from __nexy__.src.components.form import Form
    Resources = [{'label': 'Docs', 'href': '/docs'}, {'label': 'Learn', 'href': '/learn'}, {'label': 'Showcase', 'href': '/showcase'}, {'label': 'Blog', 'href': '/blog'}, {'label': 'Team', 'href': '/team'}]
    More = [{'label': 'Community', 'href': '/community'}, {'label': 'Governance', 'href': '/governance'}, {'label': 'GitHub', 'href': 'https://github.com/NexyPy/nexy'}]
    Items = [{'title': 'Resources', 'items': Resources}, {'title': 'More', 'items': More}]
    
    context = {"Form": Form, "Items": Items, "More": More, "Resources": Resources, "Theme": Theme}
    rendered = str(__Template().render("__nexy__//src/components/footer.html", context))
    styles = """"""
    return rendered + styles
