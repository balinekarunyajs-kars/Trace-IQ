import React from 'react'
import { Shield, CreditCard, AlertTriangle, CheckCircle } from 'lucide-react'

const typeMap = {
  'Security Event': { icon: Shield,     color: '#00D4FF', label: 'SECURITY' },
  'Transaction':    { icon: CreditCard, color: '#FF9F0A', label: 'TRANSACTION' },
}

const getSeverityColor = (sev) => ({
  Critical: '#FF2D55',
  High:     '#FF9F0A',
  Medium:   '#FFD60A',
  Low:      '#30D158',
}[sev] || '#00D4FF')

export default function Timeline({ events = [] }) {
  if (!events || events.length === 0) {
    return (
      <div className="card p-6">
        <p className="section-label mb-4">Attack Timeline</p>
        <div className="text-center py-8">
          <AlertTriangle className="w-8 h-8 mx-auto mb-2" style={{ color: '#1a2744' }} />
          <p className="font-mono text-xs" style={{ color: '#3D5570' }}>No timeline data available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="card p-6" style={{ borderTopColor: '#BF5AF2', borderTopWidth: '2px' }}>
      <p className="section-label mb-6">Attack Timeline</p>

      <div className="relative">
        {/* Vertical rail */}
        <div
          className="absolute left-4 top-0 bottom-0 w-px"
          style={{ background: 'linear-gradient(to bottom, #00D4FF, #BF5AF2, #FF2D55, transparent)' }}
        />

        <div className="space-y-0 pl-10">
          {events.map((ev, i) => {
            const label     = ev.description || ev.event || 'Unknown Event'
            const timestamp = ev.timestamp   || ev.time  || ''
            const type      = ev.type        || 'Security Event'
            const isTx      = type === 'Transaction'
            const meta      = typeMap[type] || typeMap['Security Event']
            const Icon      = meta.icon
            const dotColor  = isTx ? '#FF9F0A' : getSeverityColor(ev.severity || 'High')

            return (
              <div key={i} className="relative pb-6 last:pb-0">
                {/* Dot on the rail */}
                <div
                  className="absolute -left-[26px] top-1 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `${dotColor}20`,
                    border: `1px solid ${dotColor}60`,
                    boxShadow: `0 0 8px ${dotColor}50`,
                  }}
                >
                  <Icon className="w-2.5 h-2.5" style={{ color: dotColor }} />
                </div>

                {/* Content card */}
                <div
                  className="rounded-lg p-3 transition-all duration-200"
                  style={{
                    background: '#040b16',
                    border: `1px solid ${dotColor}20`,
                    borderLeftWidth: '2px',
                    borderLeftColor: dotColor,
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = `${dotColor}50`}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = `${dotColor}20`; e.currentTarget.style.borderLeftColor = dotColor }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="font-mono text-[9px] font-bold tracking-widest px-1.5 py-0.5 rounded"
                          style={{ background: `${meta.color}15`, color: meta.color }}
                        >
                          {meta.label}
                        </span>
                      </div>
                      <p className="text-sm font-semibold leading-snug" style={{ color: '#E8F0FE' }}>{label}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-mono text-[10px] font-bold" style={{ color: dotColor }}>{timestamp}</p>
                      <span
                        className="font-mono text-[9px] px-1.5 py-0.5 rounded mt-1 inline-block"
                        style={{ background: `${dotColor}12`, color: dotColor }}
                      >
                        {isTx ? 'Flagged' : 'Executed'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}