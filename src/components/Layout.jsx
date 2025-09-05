import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  BarChart3, 
  Settings, 
  Bot, 
  Zap, 
  Users,
  Menu,
  X,
  LogOut,
  User
} from 'lucide-react'

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Campañas', href: '/campaigns', icon: BarChart3 },
    { name: 'IA Creativa', href: '/ai-creative', icon: Bot },
    { name: 'Automatización', href: '/automation', icon: Zap },
    { name: 'Analytics', href: '/analytics', icon: Users },
    { name: 'Configuración', href: '/settings', icon: Settings }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-surface transform transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg"></div>
            <span className="text-xl font-bold">MarketingAI</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X size={20} />
          </button>
        </div>

        <nav className="p-6 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary border-r-2 border-primary'
                    : 'text-text-secondary hover:text-text hover:bg-surface/50'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border">
          <div className="flex items-center space-x-3 p-4 rounded-lg bg-surface/50">
            <div className="w-10 h-10 bg-gradient-to-r from-secondary to-primary rounded-full flex items-center justify-center">
              <User size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Agencia Digital</p>
              <p className="text-xs text-text-secondary truncate">admin@agencia.com</p>
            </div>
            <button className="text-text-secondary hover:text-text">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="flex items-center justify-between p-6">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
              <Menu size={24} />
            </button>
            
            <div className="flex-1 lg:flex-none">
              <h1 className="text-2xl font-bold">
                {navigation.find(item => item.href === location.pathname)?.name || 'Dashboard'}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-secondary to-primary rounded-full flex items-center justify-center">
                <User size={16} />
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default Layout
