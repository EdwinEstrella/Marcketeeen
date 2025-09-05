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
    <Sidebar className="border-r border-border bg-background h-screen">
      <SidebarHeader className="border-b border-border p-4 bg-surface">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="justify-between bg-transparent hover:bg-surface/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg"></div>
                <span className="text-lg font-bold text-text">MarketingAI</span>
              </div>
              <ChevronDown className="ml-auto opacity-60 text-text-secondary" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="flex-1">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-text-secondary text-xs font-medium uppercase tracking-wide">
            Navegación
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild className="px-4 py-3 hover:bg-surface/50 transition-colors bg-transparent">
                      <a href={item.href} className="flex items-center gap-3 text-text-secondary hover:text-text">
                        <Icon size={20} className="text-text-secondary group-hover:text-text" />
                        <span className="text-sm font-medium">{item.name}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-4 bg-surface">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="justify-between p-2 hover:bg-surface/50 rounded-lg transition-colors bg-transparent">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-secondary to-primary rounded-full flex items-center justify-center">
                  <User size={20} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text truncate">Agencia Digital</p>
                  <p className="text-xs text-text-secondary truncate">admin@agencia.com</p>
                </div>
              </div>
              <ChevronDown className="ml-auto opacity-60 text-text-secondary" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
