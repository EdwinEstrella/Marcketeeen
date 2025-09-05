import React from 'react'
import { cn } from '@/lib/utils'

const SidebarGroup = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex flex-col gap-1', className)}
      {...props}
    />
  )
})
SidebarGroup.displayName = 'SidebarGroup'

export { SidebarGroup }
