import React from 'react'
import { cn } from '@/lib/utils'

const SidebarMenuButton = React.forwardRef(
  ({ className, isActive, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors',
          'hover:bg-accent hover:text-accent-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          isActive && 'bg-accent text-accent-foreground',
          className
        )}
        {...props}
      />
    )
  }
)
SidebarMenuButton.displayName = 'SidebarMenuButton'

export { SidebarMenuButton }
