import { hydrateRoot } from 'react-dom/client'
import React from 'react'
import Component from '../../../../../src/components/Counter'

const el = document.getElementById('Counter.Default-root')
if (el) hydrateRoot(el, React.createElement(Component))