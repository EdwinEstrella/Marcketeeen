import React from 'react'
import { Outlet } from 'react-router-dom'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from './AppSidebar'
import { User } from 'lucide-react'
import COLORS from '@/constants/colors'

const Layout = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen" style={{ backgroundColor: COLORS.background.DEFAULT }}>
        {/* Sidebar */}
        <div className="hidden lg:block">
          <AppSidebar />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header 
            className="sticky top-0 z-40 backdrop-blur-md border-b"
            style={{ 
              backgroundColor: COLORS.surface.light,
              borderColor: COLORS.border.DEFAULT
            }}
          >
            <div 
              className="flex items-center justify-between p-6"
              style={{ backgroundColor: COLORS.surface.DEFAULT }}
            >
              <div className="lg:hidden">
                <SidebarTrigger />
              </div>
              <div className="flex items-center space-x-4">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: COLORS.gradients.primary }}
                >
                  <User size={16} className="text-white" />
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto">
            <div className="p-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Layout
