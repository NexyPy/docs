from typing import *
from fastapi import *
from pathlib import Path as __Path
from nexy import Template as __Template , Import as __Import
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]

def Codeblock(caller: callable = None) -> str:
        MyCodeBlock = __Import(path='src/components/my-codeblock.tsx', framework='react', symbol='MyCodeBlock')
    
    context = {"MyCodeBlock": MyCodeBlock, "caller": caller}
    rendered = str(__Template().render("__nexy__//src/components/codeblock.html", context))
    styles = """"""
    return rendered + styles
