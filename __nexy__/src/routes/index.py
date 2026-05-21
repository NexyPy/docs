from typing import *
from fastapi import *
from pathlib import Path as __Path
from nexy import Template as __Template , Import as __Import
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]
from __nexy__.src.routes.layout import Layout as __Layout

from __nexy__.src.components.sections.home.Hero import Hero as HeroSection
from __nexy__.src.components.sections.home.ContentBar import ContentBar
from __nexy__.src.components.sections.home.BaseSection import BaseSection
from __nexy__.src.components.sections.home.WhatSection import WhatSection
from __nexy__.src.components.sections.home.WhySection import WhySection
from __nexy__.src.components.sections.home.IntegrationSection import IntegrationSection
from __nexy__.src.components.sections.home.sponsor import Sponsor
from __nexy__.src.components.sections.home.community import Community
def Index(caller: Any = None, children: str = '') -> str:
    Slot = caller if (locals().get('caller') and callable(caller)) else (lambda: children if locals().get('children') else '')

    
    context = {"BaseSection": BaseSection, "Community": Community, "ContentBar": ContentBar, "HeroSection": HeroSection, "IntegrationSection": IntegrationSection, "Sponsor": Sponsor, "WhatSection": WhatSection, "WhySection": WhySection, 'Slot': Slot}
    rendered = str(__Template().render("__nexy__/src/routes/index.html", context))
    styles = """"""
    
    # Rendu final (potentiellement enveloppé par le Layout)
    return str(__Layout(children=rendered)) + styles
