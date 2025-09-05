import React from 'react'
import { cn } from '@/lib/utils'

const Sidebar = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'flex h-full w-[--sidebar-width] flex-col bg-background text-foreground border-r border-border',
        className
      )}
      {...props}
    />
  )
})
Sidebar.displayName = 'Sidebar'

export { Sidebar }
