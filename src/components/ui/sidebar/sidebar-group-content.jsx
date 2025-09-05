import React from 'react'
import { cn } from '@/lib/utils'

const SidebarGroupContent = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex flex-col gap-1', className)}
      {...props}
    />
  )
})
SidebarGroupContent.displayName = 'SidebarGroupContent'

export { SidebarGroupContent }
