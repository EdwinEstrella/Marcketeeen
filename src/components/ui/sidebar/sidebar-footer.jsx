import React from 'react'
import { cn } from '@/lib/utils'

const SidebarFooter = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex flex-col gap-2 p-4 border-t border-border bg-surface', className)}
      {...props}
    />
  )
})
SidebarFooter.displayName = 'SidebarFooter'

export { SidebarFooter }
