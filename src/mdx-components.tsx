import type { MDXComponents } from 'mdx/types'
import Button from './components/Button'
import Input from './components/Input'
import { CodeBlock } from './components/CodeBlock'
import CopyButton from './components/btnCopier'
import Badge from './components/Badge'
import Mark from './components/Mark'
import SideBar from './components/SideBar'
import SideBarItem from './components/SideBar'



export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,

    Button: Button,
    Input: Input,
    CodeBlock: CodeBlock,
    CopyButton: CopyButton,
    Badge: Badge,
    Mark: Mark,
    SideBar: SideBar,
    SideBarItem: SideBarItem,
    
  }
}