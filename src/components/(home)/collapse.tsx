'use client'

import { dm_sans_400 } from '@/font/google'
import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode, useState } from 'react'
import { Minius } from '../icons/minius'
import { PLus } from '../icons/plus'

interface CollapseProps {
  children: ReactNode
  title: string
  defaultOpen?: boolean
  className?: string
}

const Collapse = ({
  children,
  title,
  defaultOpen = false,
  className = '',
}: CollapseProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={` ${isOpen ? "h-fit p-1 bg-[#24262B]/20 border border-[#24262B] border-dashed  rounded-2xl" : "bg-transparent border-0 border-transparent rounded-xs"} notscroll overflow-hidden transition-all ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full ${isOpen ? "py-1.5 pl-4 pr-1.5 text-[#A9FFEA]  bg-[#A9FFEA]/5 border border-[#A9FFEA]/10 rounded-xl" : "border-transparent p-0"} outline-0 flex justify-between items-center transition-all cursor-pointer`}
      >
        <span className={`${dm_sans_400.className}   transition-all duration-500`}>{title}</span>
        <AnimatePresence presenceAffectsLayout>
          <span className='opacity-50'>
          {
            isOpen ? <Minius /> : <PLus />
          }
          </span>
        </AnimatePresence>
      </button>

      <AnimatePresence >
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className={` ml-1 px-3 my-2 transition-all w-full  border-l border-dotted border-gray-50/20 `}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export { Collapse }