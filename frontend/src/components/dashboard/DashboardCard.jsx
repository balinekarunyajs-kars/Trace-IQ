import React from 'react'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

export default function DashboardCard({
  title,
  value,
  icon: Icon,
  trend,
  trendDirection = 'up',
  color = 'cyan',
}) {
  const colorClasses = {
    cyan: 'from-[#00C2FF] to-[#0099CC]',
    red: 'from-[#EF4444] to-[#DC2626]',
    green: 'from-[#22C55E] to-[#16A34A]',
    amber: 'from-[#F59E0B] to-[#D97706]',
  }

  const TrendIcon = trendDirection === 'up' ? ArrowUpRight : ArrowDownRight
  const trendColor = trendDirection === 'up' ? 'text-[#22C55E]' : 'text-[#EF4444]'

  return (
    <div className="bg-[#101B2D] border border-[#1E293B] rounded-lg p-6 hover:border-[#00C2FF] hover:border-opacity-50 transition-all duration-300 hover:shadow-lg hover:shadow-[#00C2FF]/20">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-[#94A3B8] text-sm font-medium mb-2">{title}</p>
          <p className="text-3xl font-bold text-[#F1F5F9]">{value}</p>
          {trend && (
            <div className={`flex items-center gap-1 mt-3 ${trendColor}`}>
              <TrendIcon className="w-4 h-4" />
              <span className="text-sm">{trend}</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center p-2.5`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  )
}