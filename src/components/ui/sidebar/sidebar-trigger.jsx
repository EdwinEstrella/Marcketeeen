import React from 'react'
import { useSidebar } from './sidebar-provider'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'

const SidebarTrigger = React.forwardRef(({ className, ...props }, ref) => {
  const { isOpen, setIsOpen } = useSidebar()

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={cn('h-8 w-8', className)}
      onClick={() => setIsOpen(!isOpen)}
      {...props}
    >
      <Menu className="h-4 w-4" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
})
SidebarTrigger.displayName = 'SidebarTrigger'

export { SidebarTrigger }
