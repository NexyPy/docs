from typing import *
from fastapi import *
from pathlib import Path as __Path
from nexy import Template as __Template , Import as __Import
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]

def Image(src: str = None, srcset: str = None, className: str = None, alt: str = None) -> str:
        import os
    is_vercel = os.environ.get('VERCEL') == '1'
    if is_vercel and src.startswith('/public/'):
        src = src.replace('/public/', '/')
        srcset = srcset.replace('/public/', '/') if srcset else None
    
    context = {"alt": alt, "className": className, "is_vercel": is_vercel, "os": os, "src": src, "srcset": srcset}
    rendered = str(__Template().render("__nexy__//src/components/image.html", context))
    styles = """"""
    return rendered + styles
