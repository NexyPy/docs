from typing import *
from fastapi import *
from pathlib import Path as __Path
from nexy import Template as __Template , Import as __Import
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]

def Index() -> str:
        from __nexy__.src.components.sections.home.ContentBar import ContentBar
    from __nexy__.src.components.sections.home.HeroSection import HeroSection
    from __nexy__.src.components.sections.home.BaseSection import BaseSection
    from __nexy__.src.components.sections.home.WhatSection import WhatSection
    from __nexy__.src.components.sections.home.WhySection import WhySection
    from __nexy__.src.components.sections.home.IntegrationSection import IntegrationSection
    
    context = {"BaseSection": BaseSection, "ContentBar": ContentBar, "HeroSection": HeroSection, "IntegrationSection": IntegrationSection, "WhatSection": WhatSection, "WhySection": WhySection}
    rendered = str(__Template().render("__nexy__//src/routes/index.html", context))
    styles = """"""
    return rendered + styles
