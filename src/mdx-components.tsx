import type { MDXComponents } from 'mdx/types'
import { Code, CodeCard } from './components/(home)/docs/codeCard'
import { SwitchPage } from './components/(home)/docs/switchPage'
import { MDXLink } from './components/(home)/docs/mdxLink'
import { Mark } from './components/(home)/docs/mark'
import { File, Folder, Structure } from './components/(home)/docs/Structure'
import { Badge } from './components/(home)/docs/badge'




export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Code,
    CodeCard,
    SwitchPage,
    MDXLink,
    Mark,
    Structure,
    File,
    Folder,
    Badge
  }
}