import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  FileText,
  Shield,
  Zap,
  BarChart3,
  Menu,
  X,
} from 'lucide-react'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const location = useLocation()

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/investigations', label: 'Investigations', icon: FileText },
    { path: '/security-events', label: 'Security Events', icon: Shield },
    { path: '/transactions', label: 'Transactions', icon: Zap },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  ]

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/')

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden lg:flex flex-col w-64 bg-[#101B2D] border-r border-[#1E293B] h-screen transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
        {/* Logo Section */}
        <div className="p-6 border-b border-[#1E293B]">
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-3 ${!isOpen && 'justify-center w-full'}`}>
              <div className="w-10 h-10 bg-gradient-to-br from-[#00C2FF] to-[#0099CC] rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              {isOpen && (
                <div>
                  <h1 className="text-white font-bold text-lg">TRACE-IQ</h1>
                  <p className="text-[#94A3B8] text-xs">Security SOC</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-4 py-8 space-y-4">
          {menuItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${
                  active
                    ? 'bg-[#00C2FF] bg-opacity-20 text-[#00C2FF] border border-[#00C2FF]'
                    : 'text-[#94A3B8] hover:text-[#00C2FF] hover:bg-[#00C2FF] hover:bg-opacity-10'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isOpen && <span className="font-medium">{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-[#1E293B]">
          <p className="text-[#64748B] text-xs text-center">
            {isOpen ? 'Banking Security Platform' : 'v1.0'}
          </p>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-40 bg-[#101B2D] p-2 rounded-lg border border-[#1E293B]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-[#00C2FF] p-2"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setIsOpen(false)} />
      )}

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="lg:hidden fixed left-0 top-0 w-64 h-screen bg-[#101B2D] border-r border-[#1E293B] z-40 overflow-y-auto">
          <div className="p-6 border-b border-[#1E293B]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00C2FF] to-[#0099CC] rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">TRACE-IQ</h1>
                <p className="text-[#94A3B8] text-xs">Security SOC</p>
              </div>
            </div>
          </div>

          <nav className="px-4 py-8 space-y-4">
            {menuItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.path)
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${
                    active
                      ? 'bg-[#00C2FF] bg-opacity-20 text-[#00C2FF] border border-[#00C2FF]'
                      : 'text-[#94A3B8] hover:text-[#00C2FF] hover:bg-[#00C2FF] hover:bg-opacity-10'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </>
  )
}