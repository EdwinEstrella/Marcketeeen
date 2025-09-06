import React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader
} from '@/components/ui/sidebar'
import { 
  Home, 
  BarChart3, 
  Users, 
  DollarSign, 
  Settings,
  Target,
  TrendingUp,
  FileText
} from 'lucide-react'
import COLORS from '@/constants/colors'

const AppSidebar = () => {
  const menuItems = [
    {
      label: 'Dashboard',
      icon: Home,
      href: '/'
    },
    {
      label: 'Campaigns',
      icon: Target,
      href: '/campaigns'
    },
    {
      label: 'Ads',
      icon: TrendingUp,
      href: '/ads'
    },
    {
      label: 'Audiences',
      icon: Users,
      href: '/audiences'
    },
    {
      label: 'Reports',
      icon: BarChart3,
      href: '/reports'
    },
    {
      label: 'Billing',
      icon: DollarSign,
      href: '/billing'
    },
    {
      label: 'Documents',
      icon: FileText,
      href: '/documents'
    }
  ]

  return (
    <Sidebar 
      className="w-64 border-r" 
      style={{ 
        backgroundColor: COLORS.surface.DEFAULT,
        borderColor: COLORS.border.DEFAULT
      }}
    >
      <SidebarHeader>
        <div className="flex items-center space-x-2">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: COLORS.gradients.primary }}
          >
            <Target size={16} className="text-white" />
          </div>
          <span 
            className="font-bold text-lg"
            style={{ color: COLORS.text.DEFAULT }}
          >
            Marcketeeen
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel 
            style={{ color: COLORS.text.secondary }}
          >
            Navigation
          </SidebarGroupLabel>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  className="w-full justify-start"
                  style={{ 
                    color: COLORS.text.DEFAULT,
                    '--hover-bg': COLORS.surface.light,
                    '--hover-text': COLORS.text.DEFAULT
                  }}
                >
                  <item.icon size={16} />
                  {item.label}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel 
            style={{ color: COLORS.text.secondary }}
          >
            Settings
          </SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="w-full justify-start"
                style={{ 
                  color: COLORS.text.DEFAULT,
                  '--hover-bg': COLORS.surface.light,
                  '--hover-text': COLORS.text.DEFAULT
                }}
              >
                <Settings size={16} />
                Settings
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export { AppSidebar }
