import { hydrateRoot } from 'react-dom/client'
import React from 'react'
import Component from '../../../../../src/components/form'

const el = document.getElementById('form.Default-root')
if (el) hydrateRoot(el, React.createElement(Component))