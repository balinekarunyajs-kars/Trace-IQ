import React from 'react'
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react'

const ACCENT = {
  cyan:   { color: '#00D4FF', glow: '#00D4FF40', dim: '#00D4FF12', grad: 'from-[#00D4FF] to-[#0090CC]' },
  red:    { color: '#FF2D55', glow: '#FF2D5540', dim: '#FF2D5512', grad: 'from-[#FF2D55] to-[#CC0033]' },
  amber:  { color: '#FF9F0A', glow: '#FF9F0A40', dim: '#FF9F0A12', grad: 'from-[#FF9F0A] to-[#CC7A00]' },
  green:  { color: '#30D158', glow: '#30D15840', dim: '#30D15812', grad: 'from-[#30D158] to-[#1A9940]' },
  purple: { color: '#BF5AF2', glow: '#BF5AF240', dim: '#BF5AF212', grad: 'from-[#BF5AF2] to-[#8B20D0]' },
}

export default function DashboardCard({ title, value, icon: Icon, trend, trendDirection = 'neutral', color = 'cyan', loading = false, subtitle }) {
  const a = ACCENT[color] || ACCENT.cyan
  const TrendIcon = trendDirection === 'up' ? ArrowUpRight : trendDirection === 'down' ? ArrowDownRight : Minus
  const trendColor = trendDirection === 'up' ? '#30D158' : trendDirection === 'down' ? '#FF2D55' : '#3D5570'

  if (loading) {
    return (
      <div className="card p-5">
        <div className="skeleton h-3 w-24 mb-4" />
        <div className="skeleton h-9 w-20 mb-3" />
        <div className="skeleton h-2.5 w-16" />
      </div>
    )
  }

  return (
    <div
      className="card p-5 group cursor-default animate-slide-up"
      style={{ borderLeftWidth: '3px', borderLeftColor: a.color, transition: 'all 0.2s ease' }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 24px ${a.glow}`; e.currentTarget.style.borderColor = `${a.color}60`; e.currentTarget.style.borderLeftColor = a.color }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#112035'; e.currentTarget.style.borderLeftColor = a.color }}
    >
      <div className="flex items-start justify-between mb-4">
        {/* Icon */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: a.dim, border: `1px solid ${a.color}30`, boxShadow: `0 0 12px ${a.glow}` }}
        >
          <Icon className="w-5 h-5" style={{ color: a.color }} />
        </div>

        {/* Trend */}
        {trend && (
          <div className="flex items-center gap-1" style={{ color: trendColor }}>
            <TrendIcon className="w-3.5 h-3.5" />
            <span className="font-mono text-[10px] font-semibold">{trend}</span>
          </div>
        )}
      </div>

      {/* Label */}
      <p
        className="font-mono text-[10px] font-bold tracking-widest uppercase mb-1"
        style={{ color: '#3D5570' }}
      >
        {title}
      </p>

      {/* Value */}
      <p
        className="font-mono text-3xl font-bold leading-none mb-1"
        style={{ color: a.color, textShadow: `0 0 16px ${a.glow}` }}
      >
        {value ?? '—'}
      </p>

      {subtitle && (
        <p className="text-[10px] mt-1.5" style={{ color: '#3D5570' }}>{subtitle}</p>
      )}
    </div>
  )
}