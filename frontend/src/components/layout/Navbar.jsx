import React from 'react'
import { Bell, Settings, User, Search } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="bg-[#101B2D] border-b border-[#1E293B] px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Search incidents, cases, users..."
              className="w-full bg-[#08111F] text-[#F1F5F9] placeholder-[#64748B] rounded-lg px-4 py-2 pl-10 border border-[#1E293B] focus:outline-none focus:border-[#00C2FF] focus:ring-1 focus:ring-[#00C2FF] transition-all"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#64748B]" />
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-4 ml-8">
          {/* Notifications */}
          <button className="relative text-[#94A3B8] hover:text-[#00C2FF] transition-colors p-2 hover:bg-[#00C2FF] hover:bg-opacity-10 rounded-lg">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#EF4444] rounded-full animate-pulse"></span>
          </button>

          {/* Settings */}
          <button className="text-[#94A3B8] hover:text-[#00C2FF] transition-colors p-2 hover:bg-[#00C2FF] hover:bg-opacity-10 rounded-lg">
            <Settings className="w-5 h-5" />
          </button>

          {/* Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-[#1E293B]">
            <div className="text-right hidden sm:block">
              <p className="text-[#F1F5F9] text-sm font-medium">Admin User</p>
              <p className="text-[#64748B] text-xs">SOC Analyst</p>
            </div>
            <button className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00C2FF] to-[#0099CC] flex items-center justify-center text-white hover:opacity-80 transition-opacity">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}