import React, { useState, useEffect } from 'react'
import { Bell, Search, AlertTriangle, Cpu, Radio } from 'lucide-react'

export default function Navbar() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const pad = (n) => String(n).padStart(2, '0')
  const timeStr = `${pad(time.getHours())}:${pad(time.getMinutes())}:${pad(time.getSeconds())}`
  const dateStr = time.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })

  return (
    <nav
      className="sticky top-0 z-30 px-5 py-2.5"
      style={{
        background: 'rgba(4, 11, 22, 0.92)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid #112035',
      }}
    >
      <div className="flex items-center gap-4">

        {/* Search */}
        <div className="flex-1 max-w-xs relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: '#3D5570' }} />
          <input
            className="cyber-input pl-9 text-xs"
            placeholder="Search cases, events, users..."
            style={{ padding: '7px 12px 7px 32px' }}
          />
        </div>

        {/* Center status pills */}
        <div className="hidden md:flex items-center gap-3 flex-1 justify-center">

          {/* AI Active */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
            style={{ background: '#BF5AF20e', border: '1px solid #BF5AF230' }}
          >
            <Cpu className="w-3 h-3" style={{ color: '#BF5AF2' }} />
            <span className="font-mono text-[10px] font-bold tracking-widest" style={{ color: '#BF5AF2' }}>
              AI ACTIVE
            </span>
            <div className="animate-glow-breathe w-1.5 h-1.5 rounded-full" style={{ background: '#BF5AF2' }} />
          </div>

          {/* Critical alerts */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
            style={{ background: '#FF2D550e', border: '1px solid #FF2D5530' }}
          >
            <div className="danger-dot" />
            <AlertTriangle className="w-3 h-3" style={{ color: '#FF2D55' }} />
            <span className="font-mono text-[10px] font-bold tracking-widest" style={{ color: '#FF2D55' }}>
              3 CRITICAL
            </span>
          </div>

          {/* Live monitor */}
          <div
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg"
            style={{ background: '#30D1580e', border: '1px solid #30D15830' }}
          >
            <div className="live-dot" />
            <Radio className="w-3 h-3" style={{ color: '#30D158' }} />
            <span className="font-mono text-[10px] font-bold tracking-widest" style={{ color: '#30D158' }}>
              MONITORING
            </span>
          </div>
        </div>

        {/* Right: clock + bell */}
        <div className="flex items-center gap-4">

          {/* Clock */}
          <div className="hidden sm:block text-right">
            <p className="font-mono text-xs font-bold" style={{ color: '#00D4FF' }}>{timeStr}</p>
            <p className="font-mono text-[9px]" style={{ color: '#3D5570' }}>{dateStr}</p>
          </div>

          {/* Notifications */}
          <button
            className="relative p-2 rounded-lg transition-all"
            style={{ color: '#3D5570', border: '1px solid #112035' }}
            onMouseEnter={e => e.currentTarget.style.color = '#00D4FF'}
            onMouseLeave={e => e.currentTarget.style.color = '#3D5570'}
          >
            <Bell className="w-4 h-4" />
            <span
              className="absolute top-1 right-1 w-2 h-2 rounded-full"
              style={{ background: '#FF2D55', boxShadow: '0 0 6px #FF2D55' }}
            />
          </button>

          {/* Analyst badge */}
          <div
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer"
            style={{ background: '#00D4FF0e', border: '1px solid #00D4FF25' }}
          >
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-mono font-bold"
              style={{ background: '#00D4FF20', color: '#00D4FF' }}
            >
              SA
            </div>
            <div className="hidden md:block">
              <p className="text-[10px] font-mono font-bold" style={{ color: '#00D4FF' }}>SOC ANALYST</p>
              <p className="text-[9px] font-mono" style={{ color: '#3D5570' }}>ADMIN ACCESS</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}