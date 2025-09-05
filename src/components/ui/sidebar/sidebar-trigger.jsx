import React from 'react'
import { Menu } from 'lucide-react'
import { useSidebar } from './sidebar-provider'
import { cn } from '@/lib/utils'

const SidebarTrigger = React.forwardRef(({ className, ...props }, ref) => {
  const { setIsOpen } = useSidebar()

  return (
    <button
      ref={ref}
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none',
        className
      )}
      onClick={() => setIsOpen(prev => !prev)}
      {...props}
    >
      <Menu size={16} />
    </button>
  )
})
SidebarTrigger.displayName = 'SidebarTrigger'

export { SidebarTrigger }
