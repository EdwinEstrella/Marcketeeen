import React from 'react'
import { cn } from '@/lib/utils'

const SidebarMenu = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <ul
      ref={ref}
      className={cn('flex flex-col gap-1', className)}
      {...props}
    />
  )
})
SidebarMenu.displayName = 'SidebarMenu'

export { SidebarMenu }
