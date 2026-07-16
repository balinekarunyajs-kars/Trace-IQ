import React, { useState } from 'react'
import { Shield, AlertCircle, Radio } from 'lucide-react'
import { getEvents } from '../api'
import { useApi } from '../hooks/useApi'

const SEV = {
  Critical: { color: '#FF2D55', dim: '#FF2D5512' },
  High:     { color: '#FF9F0A', dim: '#FF9F0A12' },
  Medium:   { color: '#FFD60A', dim: '#FFD60A10' },
  Low:      { color: '#30D158', dim: '#30D15812' },
}

const FILTERS = ['All', 'Critical', 'High', 'Medium', 'Low']

export default function SecurityEvents() {
  const [filter, setFilter] = useState('All')
  const { data: events, loading, error } = useApi(getEvents, [])

  const filtered = (events || []).filter(e => filter === 'All' || e.severity === filter)
  const count    = (sev) => (events || []).filter(e => e.severity === sev).length

  return (
    <div className="p-5 space-y-5">

      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: '#00D4FF12', border: '1px solid #00D4FF30', boxShadow: '0 0 12px #00D4FF25' }}
        >
          <Shield className="w-5 h-5" style={{ color: '#00D4FF' }} />
        </div>
        <div>
          <h1 className="font-orbitron text-base font-bold tracking-wider" style={{ color: '#E8F0FE' }}>
            SECURITY EVENT MONITOR
          </h1>
          <p className="font-mono text-[9px]" style={{ color: '#3D5570' }}>
            Real-time security event stream — all events are AI-analysed for threat signals
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: '#30D15810', border: '1px solid #30D15830' }}>
          <div className="live-dot" />
          <Radio className="w-3 h-3" style={{ color: '#30D158' }} />
          <span className="font-mono text-[9px] font-bold tracking-widest" style={{ color: '#30D158' }}>LIVE FEED</span>
        </div>
      </div>

      {/* Stat row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'TOTAL EVENTS', value: loading ? '…' : (events?.length ?? 0),   color: '#00D4FF' },
          { label: 'CRITICAL',     value: loading ? '…' : count('Critical'),        color: '#FF2D55' },
          { label: 'HIGH RISK',    value: loading ? '…' : count('High'),            color: '#FF9F0A' },
          { label: 'NORMAL',       value: loading ? '…' : count('Low'),             color: '#30D158' },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="card p-4"
            style={{ borderLeftWidth: '3px', borderLeftColor: color }}
          >
            <p className="font-mono text-[9px] font-bold tracking-widest mb-1.5" style={{ color: '#3D5570' }}>{label}</p>
            <p
              className="font-orbitron text-3xl font-black"
              style={{ color, textShadow: `0 0 10px ${color}50` }}
            >
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Severity filter buttons */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const cfg = f === 'All' ? { color: '#00D4FF' } : SEV[f]
          const active = filter === f
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="font-mono text-[10px] font-bold tracking-wider px-3.5 py-2 rounded-lg transition-all duration-200"
              style={{
                background: active ? `${cfg.color}18` : '#060e1c',
                border: `1px solid ${active ? `${cfg.color}50` : '#112035'}`,
                color: active ? cfg.color : '#3D5570',
                boxShadow: active ? `0 0 10px ${cfg.color}25` : 'none',
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.color = cfg.color }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.color = '#3D5570' }}
            >
              {f.toUpperCase()}
              {f !== 'All' && (
                <span className="ml-2 opacity-60">
                  ({count(f)})
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Table */}
      <div className="card overflow-hidden" style={{ borderTopColor: '#00D4FF', borderTopWidth: '2px' }}>
        {loading ? (
          <div className="p-5 space-y-3">
            {[1,2,3,4].map(i => <div key={i} className="skeleton h-12 w-full" />)}
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <AlertCircle className="w-8 h-8 mx-auto mb-2" style={{ color: '#FF2D55' }} />
            <p className="font-mono text-sm font-bold" style={{ color: '#FF2D55' }}>BACKEND OFFLINE</p>
            <p className="font-mono text-xs mt-1" style={{ color: '#3D5570' }}>{error}</p>
          </div>
        ) : (
          <table className="w-full data-table">
            <thead>
              <tr>
                {['Event ID', 'User', 'Event Type', 'Device', 'IP Address', 'Severity', 'Timestamp'].map(h => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((ev) => {
                const sevCfg = SEV[ev.severity] || { color: '#00D4FF', dim: '#00D4FF12' }
                const isUnknown = ev.device === 'Unknown Device'
                return (
                  <tr key={ev.event_id}>
                    <td>
                      <span className="font-mono text-[11px] font-bold" style={{ color: '#00D4FF' }}>{ev.event_id}</span>
                    </td>
                    <td>
                      <span className="font-mono text-xs font-semibold" style={{ color: '#E8F0FE' }}>{ev.username}</span>
                    </td>
                    <td>
                      <span className="text-xs" style={{ color: '#8BA0BF' }}>{ev.event_type}</span>
                    </td>
                    <td>
                      <span
                        className="font-mono text-[11px]"
                        style={{ color: isUnknown ? '#FF2D55' : '#3D5570' }}
                      >
                        {isUnknown ? '⚠ ' : ''}{ev.device}
                      </span>
                    </td>
                    <td>
                      <span className="font-mono text-[11px]" style={{ color: '#3D5570' }}>{ev.ip_address}</span>
                    </td>
                    <td>
                      <span
                        className="badge"
                        style={{ background: sevCfg.dim, color: sevCfg.color, borderColor: `${sevCfg.color}35` }}
                      >
                        {ev.severity}
                      </span>
                    </td>
                    <td>
                      <span className="font-mono text-[10px]" style={{ color: '#253548' }}>{ev.timestamp}</span>
                    </td>
                  </tr>
                )
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="text-center py-8 font-mono text-xs" style={{ color: '#3D5570' }}>
                  No events match the selected filter.
                </td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Critical alert banner */}
      {!loading && count('Critical') > 0 && (
        <div
          className="card p-4 flex gap-4 animate-fade-in"
          style={{ borderLeftWidth: '3px', borderLeftColor: '#FF2D55', background: '#FF2D5506' }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: '#FF2D5515', border: '1px solid #FF2D5535' }}
          >
            <AlertCircle className="w-4 h-4" style={{ color: '#FF2D55' }} />
          </div>
          <div>
            <h3 className="font-mono text-xs font-bold mb-1" style={{ color: '#FF2D55' }}>
              ⚠ {count('Critical')} CRITICAL EVENT{count('Critical') > 1 ? 'S' : ''} DETECTED
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: '#8BA0BF' }}>
              Critical security activities have been detected and correlated with financial transactions.
              The AI engine has auto-generated investigation cases — check the{' '}
              <span className="font-bold" style={{ color: '#BF5AF2' }}>Investigations</span> page for full reports.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}