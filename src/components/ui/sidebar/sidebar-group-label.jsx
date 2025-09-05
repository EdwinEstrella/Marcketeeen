import React from 'react'
import { cn } from '@/lib/utils'

const SidebarGroupLabel = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'text-xs font-medium text-muted-foreground uppercase tracking-wider px-2 py-1',
        className
      )}
      {...props}
    />
  )
})
SidebarGroupLabel.displayName = 'SidebarGroupLabel'

export { SidebarGroupLabel }
