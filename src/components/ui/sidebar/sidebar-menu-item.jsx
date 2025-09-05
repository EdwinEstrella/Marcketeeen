import React from 'react'
import { cn } from '@/lib/utils'

const SidebarMenuItem = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <li
      ref={ref}
      className={cn('relative', className)}
      {...props}
    />
  )
})
SidebarMenuItem.displayName = 'SidebarMenuItem'

export { SidebarMenuItem }
