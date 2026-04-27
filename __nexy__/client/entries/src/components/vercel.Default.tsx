import { hydrateRoot } from 'react-dom/client'
import React from 'react'
import Component from '../../../../../src/components/vercel'

const el = document.getElementById('vercel.Default-root')
if (el) hydrateRoot(el, React.createElement(Component))