import { hydrateRoot } from 'react-dom/client'
import React from 'react'
import Component from '../../../../../src/components/card'

const el = document.getElementById('card.Default-root')
if (el) hydrateRoot(el, React.createElement(Component))