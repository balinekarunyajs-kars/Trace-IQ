import React, { useState } from 'react'
import { CreditCard, Search, ArrowUpRight, AlertTriangle } from 'lucide-react'
import { getTransactions } from '../api'
import { useApi } from '../hooks/useApi'

const autoRisk = (amount, status) => {
  if (status === 'Pending' && amount >= 1000000) return 'CRITICAL'
  if (amount >= 500000) return 'HIGH'
  if (amount >= 100000) return 'MEDIUM'
  return 'LOW'
}

const RISK_CFG = {
  CRITICAL: { color: '#FF2D55', dim: '#FF2D5512' },
  HIGH:     { color: '#FF9F0A', dim: '#FF9F0A12' },
  MEDIUM:   { color: '#FFD60A', dim: '#FFD60A10' },
  LOW:      { color: '#30D158', dim: '#30D15812' },
}

const STATUS_COLOR = {
  Pending:   '#FF9F0A',
  Completed: '#30D158',
  Flagged:   '#FF2D55',
}

export default function Transactions() {
  const [search, setSearch] = useState('')
  const { data: raw, loading, error } = useApi(getTransactions, [])

  const txList = (raw || []).map(tx => ({ ...tx, riskLevel: autoRisk(tx.amount, tx.status) }))

  const filtered = txList.filter(tx =>
    [tx.transaction_id, tx.username, tx.beneficiary, tx.location]
      .join(' ').toLowerCase().includes(search.toLowerCase())
  )

  const totalAmt    = txList.reduce((s, t) => s + (t.amount || 0), 0)
  const critCount   = txList.filter(t => t.riskLevel === 'CRITICAL').length
  const pendCount   = txList.filter(t => t.status === 'Pending').length

  return (
    <div className="p-5 space-y-5">

      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: '#FF9F0A12', border: '1px solid #FF9F0A30', boxShadow: '0 0 12px #FF9F0A25' }}
        >
          <CreditCard className="w-5 h-5" style={{ color: '#FF9F0A' }} />
        </div>
        <div>
          <h1 className="font-orbitron text-base font-bold tracking-wider" style={{ color: '#E8F0FE' }}>
            FINANCIAL RISK MONITOR
          </h1>
          <p className="font-mono text-[9px]" style={{ color: '#3D5570' }}>
            All transactions cross-checked by AI against user security events
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'TOTAL TRANSACTIONS', value: loading ? '…' : txList.length,                    color: '#00D4FF' },
          { label: 'TOTAL VOLUME',       value: loading ? '…' : `₹${(totalAmt/100000).toFixed(1)}L`, color: '#8BA0BF' },
          { label: 'CRITICAL RISK',      value: loading ? '…' : critCount,                         color: '#FF2D55' },
          { label: 'PENDING REVIEW',     value: loading ? '…' : pendCount,                         color: '#FF9F0A' },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="card p-4"
            style={{ borderLeftWidth: '3px', borderLeftColor: color }}
          >
            <p className="font-mono text-[9px] font-bold tracking-widest mb-1.5" style={{ color: '#3D5570' }}>{label}</p>
            <p className="font-orbitron text-3xl font-black" style={{ color, textShadow: `0 0 10px ${color}50` }}>
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#3D5570' }} />
        <input
          className="cyber-input pl-10"
          placeholder="Search by Transaction ID, User, Beneficiary or Location..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: '10px 14px 10px 38px' }}
        />
      </div>

      {/* Table */}
      <div className="card overflow-hidden" style={{ borderTopColor: '#FF9F0A', borderTopWidth: '2px' }}>
        {loading ? (
          <div className="p-5 space-y-3">
            {[1,2,3].map(i => <div key={i} className="skeleton h-14 w-full" />)}
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <AlertTriangle className="w-8 h-8 mx-auto mb-2" style={{ color: '#FF2D55' }} />
            <p className="font-mono text-sm font-bold" style={{ color: '#FF2D55' }}>BACKEND OFFLINE</p>
          </div>
        ) : (
          <table className="w-full data-table">
            <thead>
              <tr>
                {['TX ID', 'User', 'Amount (₹)', 'Beneficiary', 'Location', 'Risk', 'Status', 'Timestamp'].map(h => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((tx) => {
                const rCfg = RISK_CFG[tx.riskLevel] || RISK_CFG.LOW
                const statColor = STATUS_COLOR[tx.status] || '#8BA0BF'
                const isCritical = tx.riskLevel === 'CRITICAL'
                return (
                  <tr
                    key={tx.transaction_id}
                    style={isCritical ? { background: '#FF2D5504' } : {}}
                  >
                    <td>
                      <span className="font-mono text-[11px] font-bold" style={{ color: '#FF9F0A' }}>
                        {tx.transaction_id}
                      </span>
                    </td>
                    <td>
                      <span className="font-mono text-xs font-semibold" style={{ color: '#E8F0FE' }}>{tx.username}</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1.5">
                        <span
                          className="font-orbitron text-sm font-bold"
                          style={{ color: isCritical ? '#FF2D55' : '#E8F0FE', textShadow: isCritical ? '0 0 8px #FF2D5540' : 'none' }}
                        >
                          {tx.amount?.toLocaleString('en-IN')}
                        </span>
                        {isCritical && <ArrowUpRight className="w-3.5 h-3.5" style={{ color: '#FF2D55' }} />}
                      </div>
                    </td>
                    <td>
                      <span className="text-xs" style={{ color: '#8BA0BF' }}>{tx.beneficiary}</span>
                    </td>
                    <td>
                      <span className="font-mono text-xs" style={{ color: '#8BA0BF' }}>{tx.location}</span>
                    </td>
                    <td>
                      <span
                        className="badge"
                        style={{ background: rCfg.dim, color: rCfg.color, borderColor: `${rCfg.color}35` }}
                      >
                        {tx.riskLevel}
                      </span>
                    </td>
                    <td>
                      <span className="font-mono text-xs font-bold" style={{ color: statColor }}>{tx.status}</span>
                    </td>
                    <td>
                      <span className="font-mono text-[10px]" style={{ color: '#253548' }}>{tx.timestamp}</span>
                    </td>
                  </tr>
                )
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="text-center py-8 font-mono text-xs" style={{ color: '#3D5570' }}>
                  No transactions found.
                </td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}