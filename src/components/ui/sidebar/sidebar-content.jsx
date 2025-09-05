import React from 'react'
import { cn } from '@/lib/utils'

const SidebarContent = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex flex-1 flex-col gap-2 overflow-auto p-4 bg-surface', className)}
      {...props}
    />
  )
})
SidebarContent.displayName = 'SidebarContent'

export { SidebarContent }
