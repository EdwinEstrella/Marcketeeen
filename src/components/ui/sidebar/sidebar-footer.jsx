import React from 'react'
import { cn } from '@/lib/utils'

const SidebarFooter = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex flex-col gap-2 p-4 bg-surface border-t border-border', className)}
      {...props}
    />
  )
})
SidebarFooter.displayName = 'SidebarFooter'

export { SidebarFooter }
