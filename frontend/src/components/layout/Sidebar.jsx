import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, FileSearch, Shield,
  CreditCard, BarChart3, Menu, X,
  Radio, Cpu,
} from 'lucide-react'

const menuItems = [
  { path: '/',                label: 'Dashboard',        icon: LayoutDashboard, sub: 'SOC Overview',           accent: '#00D4FF' },
  { path: '/investigations',  label: 'Investigations',   icon: FileSearch,      sub: 'AI Case Reports',        accent: '#BF5AF2' },
  { path: '/security-events', label: 'Security Events',  icon: Shield,          sub: 'Live Event Feed',        accent: '#FF2D55' },
  { path: '/transactions',    label: 'Transactions',     icon: CreditCard,      sub: 'Financial Monitor',      accent: '#FF9F0A' },
  { path: '/analytics',       label: 'Analytics',        icon: BarChart3,       sub: 'Threat Intelligence',    accent: '#30D158' },
]

function NavLinks({ onClickItem }) {
  const location = useLocation()
  const isActive = (p) => p === '/' ? location.pathname === '/' : location.pathname.startsWith(p)

  return (
    <nav className="flex-1 px-3 py-4 space-y-1">
      {menuItems.map(({ path, label, icon: Icon, sub, accent }) => {
        const active = isActive(path)
        return (
          <Link
            key={path}
            to={path}
            onClick={onClickItem}
            style={active ? { borderColor: `${accent}40`, background: `${accent}0d` } : {}}
            className={`
              group flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-all duration-200
              ${active
                ? 'border-opacity-40 text-white'
                : 'border-transparent text-[#3D5570] hover:text-[#8BA0BF] hover:bg-white/4'
              }
            `}
          >
            {/* Left accent bar */}
            <div
              className="w-0.5 h-7 rounded-full flex-shrink-0 transition-all duration-200"
              style={{ background: active ? accent : 'transparent' }}
            />

            {/* Icon */}
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200"
              style={active
                ? { background: `${accent}20`, boxShadow: `0 0 12px ${accent}30` }
                : {}}
            >
              <Icon className="w-4 h-4" style={{ color: active ? accent : 'inherit' }} />
            </div>

            {/* Labels */}
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold leading-none mb-0.5 font-mono" style={{ color: active ? accent : 'inherit' }}>
                {label.toUpperCase()}
              </p>
              <p className="text-[10px] leading-none truncate" style={{ color: active ? `${accent}80` : '#3D5570' }}>
                {sub}
              </p>
            </div>
          </Link>
        )
      })}
    </nav>
  )
}

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const Inner = ({ onClose }) => (
    <div className="flex flex-col h-full" style={{ background: '#040b16', borderRight: '1px solid #112035' }}>

      {/* Logo */}
      <div className="p-4 border-b" style={{ borderColor: '#112035' }}>
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #00D4FF22, #BF5AF222)',
              border: '1px solid #00D4FF40',
              boxShadow: '0 0 16px #00D4FF30',
            }}
          >
            <Shield className="w-5 h-5" style={{ color: '#00D4FF' }} />
          </div>
          <div>
            <h1
              className="font-orbitron text-sm font-bold tracking-widest"
              style={{ color: '#00D4FF', textShadow: '0 0 10px #00D4FF80' }}
            >
              TRACE-IQ
            </h1>
            <p className="text-[9px] tracking-widest font-mono" style={{ color: '#3D5570' }}>
              BANKING SOC · v1.0
            </p>
          </div>
        </div>
      </div>

      {/* System status */}
      <div className="px-4 py-3 border-b" style={{ borderColor: '#112035' }}>
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg"
          style={{ background: '#30D15812', border: '1px solid #30D15825' }}
        >
          <div className="live-dot" />
          <span className="text-[10px] font-mono font-bold tracking-widest" style={{ color: '#30D158' }}>
            SYSTEM OPERATIONAL
          </span>
        </div>
      </div>

      {/* Navigation */}
      <NavLinks onClickItem={onClose} />

      {/* Footer */}
      <div className="p-4 border-t" style={{ borderColor: '#112035' }}>
        <div
          className="rounded-lg p-3"
          style={{ background: '#BF5AF208', border: '1px solid #BF5AF220' }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <Cpu className="w-3 h-3" style={{ color: '#BF5AF2' }} />
            <span className="text-[10px] font-mono font-bold tracking-wider" style={{ color: '#BF5AF2' }}>
              AI ENGINE
            </span>
            <div className="animate-glow-breathe w-1.5 h-1.5 rounded-full ml-auto" style={{ background: '#BF5AF2' }} />
          </div>
          <p className="text-[9px] leading-relaxed" style={{ color: '#3D5570' }}>
            Multi-signal threat correlation &amp; automated investigation
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:flex flex-col w-60 h-screen flex-shrink-0">
        <Inner onClose={undefined} />
      </div>

      {/* Mobile toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2.5 rounded-xl"
          style={{ background: '#060e1c', border: '1px solid #112035', color: '#00D4FF' }}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 z-40"
            style={{ background: 'rgba(3,8,18,0.8)', backdropFilter: 'blur(4px)' }}
            onClick={() => setMobileOpen(false)}
          />
          <div className="lg:hidden fixed left-0 top-0 w-64 h-screen z-50">
            <Inner onClose={() => setMobileOpen(false)} />
          </div>
        </>
      )}
    </>
  )
}