import React from 'react'
import { cn } from '@/lib/utils'

const SidebarHeader = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex flex-col gap-2 p-4 border-b border-border bg-surface', className)}
      {...props}
    />
  )
})
SidebarHeader.displayName = 'SidebarHeader'

export { SidebarHeader }
