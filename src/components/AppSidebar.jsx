import React from 'react'
import { 
  Home, 
  BarChart3, 
  Settings, 
  Bot, 
  Zap, 
  Users,
  ChevronDown,
  User,
  LogOut
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'

// Menu items
const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Campañas', href: '/campaigns', icon: BarChart3 },
  { name: 'IA Creativa', href: '/ai-creative', icon: Bot },
  { name: 'Automatización', href: '/automation', icon: Zap },
  { name: 'Analytics', href: '/analytics', icon: Users },
  { name: 'Configuración', href: '/settings', icon: Settings }
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg"></div>
                <span className="text-lg font-bold">MarketingAI</span>
              </div>
              <ChevronDown className="ml-auto opacity-60" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild>
                      <a href={item.href}>
                        <Icon size={20} />
                        <span>{item.name}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-secondary to-primary rounded-full flex items-center justify-center">
                  <User size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Agencia Digital</p>
                  <p className="text-xs text-muted-foreground truncate">admin@agencia.com</p>
                </div>
              </div>
              <ChevronDown className="ml-auto opacity-60" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
