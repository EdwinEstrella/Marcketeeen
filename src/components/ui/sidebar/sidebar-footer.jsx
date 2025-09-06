import React from 'react'
import { cn } from '@/lib/utils'

const SidebarFooter = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex items-center p-4 pt-0', className)}
      {...props}
    />
  )
})
SidebarFooter.displayName = 'SidebarFooter'

export { SidebarFooter }
