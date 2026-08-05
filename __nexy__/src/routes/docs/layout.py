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
    from __nexy__.src.routes.layout import Layout as __Layout
except ImportError:
    def __Layout(children: str = '', **kwargs) -> str:
        return '<div data-nexy-error="Layout not available"></div>'

from src.locales.routes.docs.layout import DocsLayoutI18n
from nexy import usePathname
from src.mocks.docs.sidebar import build_sections
from src.locales.routes.docs.sidebar import SidebarI18n
from __nexy__.src.components.docs.sidebar import Sidebar
from __nexy__.src.components.docs.table_of_contents import Table_of_contents
from __nexy__.src.components.link import Link
def Layout(children: str = None, caller: Any = None) -> str:
    Slot = caller if (locals().get('caller') and callable(caller)) else (lambda: children if locals().get('children') else '')
    trans = __trans
    t = __trans
    dl = DocsLayoutI18n()
    s = SidebarI18n()
    pathname = usePathname()
    is_modular = pathname.startswith('/docs/modular')
    mode = 'modular' if is_modular else 'fbr'
    all_sections = build_sections(s, mode)
    flat_items = []
    for section in all_sections:
        for item in section['items']:
            if item.get('href') and item['href'] != '#':
                flat_items.append({**item, 'section': section.get('title', '')})
    rel_path = pathname[len('/docs'):] or '/'
    current_idx = -1
    for i, item in enumerate(flat_items):
        if item['href'] == rel_path:
            current_idx = i
            break
    prev_item = flat_items[current_idx - 1] if current_idx > 0 else None
    next_item = flat_items[current_idx + 1] if 0 <= current_idx < len(flat_items) - 1 else None
    children = f"<nslot  style='display:contents;'>{children}</nslot>" 
    context = {"build_sections": build_sections, "Sidebar": Sidebar, "rel_path": rel_path, "is_modular": is_modular, "all_sections": all_sections, "flat_items": flat_items, "s": s, "Table_of_contents": Table_of_contents, "SidebarI18n": SidebarI18n, "usePathname": usePathname, "dl": dl, "pathname": pathname, "prev_item": prev_item, "Link": Link, "mode": mode, "current_idx": current_idx, "children": children, "next_item": next_item, "DocsLayoutI18n": DocsLayoutI18n, 'Slot': Slot, 'trans': __trans, '__locale': __current_locale.get()}
    rendered = str(__Template().render("__nexy__/src/routes/docs/layout.html", context))
    return str(__Layout(children=rendered))
