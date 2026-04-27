import { hydrateRoot } from 'react-dom/client'
import React from 'react'
import Component from '../../../../../src/components/theme'

const el = document.getElementById('theme.Default-root')
if (el) hydrateRoot(el, React.createElement(Component))