import React from 'react'
import { cn } from '@/lib/utils'

const Sidebar = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'flex h-full flex-col bg-background border-r',
        className
      )}
      {...props}
    />
  )
})
Sidebar.displayName = 'Sidebar'

export { Sidebar }
