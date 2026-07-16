import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Brain, AlertTriangle, ArrowRight, Shield, CreditCard } from 'lucide-react'
import Timeline from '../components/dashboard/Timeline'
import AIInsightPanel from '../components/dashboard/AIInsightPanel'
import { getCases, getCaseDetail } from '../api'
import { useApi } from '../hooks/useApi'

const riskMeta = (score) => {
  if (score >= 80) return { color: '#FF2D55', label: 'CRITICAL', accent: '#FF2D5520' }
  if (score >= 60) return { color: '#FF9F0A', label: 'HIGH',     accent: '#FF9F0A20' }
  if (score >= 40) return { color: '#FFD60A', label: 'MEDIUM',   accent: '#FFD60A20' }
  return { color: '#30D158', label: 'LOW', accent: '#30D15820' }
}

/* ── Case List ─────────────────────────────────────────── */
function CaseList() {
  const { data: cases, loading, error } = useApi(getCases, [])

  if (loading) return (
    <div className="p-6 space-y-4">
      {[1,2,3].map(i => <div key={i} className="skeleton h-32 w-full rounded-xl" />)}
    </div>
  )

  if (error) return (
    <div className="p-8 text-center">
      <AlertTriangle className="w-10 h-10 mx-auto mb-3" style={{ color: '#FF2D55' }} />
      <p className="font-mono text-sm font-bold mb-1" style={{ color: '#FF2D55' }}>BACKEND CONNECTION FAILED</p>
      <p className="text-xs" style={{ color: '#3D5570' }}>{error}</p>
    </div>
  )

  if (!cases?.length) return (
    <div className="p-8 text-center">
      <Brain className="w-10 h-10 mx-auto mb-3" style={{ color: '#1a2744' }} />
      <p className="font-mono text-sm" style={{ color: '#3D5570' }}>No cases found. Is the backend running?</p>
    </div>
  )

  return (
    <div className="p-5 space-y-4">
      {cases.map((item) => {
        const c = item.case
        if (!c) return null
        const { color, label, accent } = riskMeta(c.risk_score)
        return (
          <Link
            key={c.case_id}
            to={`/investigations/${c.case_id}`}
            className="block card animate-slide-up transition-all duration-200 group"
            style={{ borderLeftWidth: '3px', borderLeftColor: color }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 20px ${color}25`; e.currentTarget.style.borderColor = `${color}40`; e.currentTarget.style.borderLeftColor = color }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#112035'; e.currentTarget.style.borderLeftColor = color }}
          >
            {/* Top risk bar */}
            <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${color}, ${color}30)`, opacity: 0.7 }} />

            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-orbitron text-xs font-bold" style={{ color: '#00D4FF' }}>{c.case_id}</span>
                    <span
                      className="badge"
                      style={{ background: accent, color, borderColor: `${color}40`, fontSize: '9px' }}
                    >
                      {label}
                    </span>
                    <span
                      className="badge"
                      style={{ background: '#BF5AF215', color: '#BF5AF2', borderColor: '#BF5AF240', fontSize: '9px' }}
                    >
                      AI GENERATED
                    </span>
                  </div>
                  <h3 className="text-base font-bold group-hover:opacity-80 transition-opacity" style={{ color: '#E8F0FE' }}>
                    {c.threat || 'Analyzing...'}
                  </h3>
                  <p className="font-mono text-[10px] mt-0.5" style={{ color: '#3D5570' }}>
                    USER: {c.username}
                  </p>
                </div>

                {/* Risk Score */}
                <div className="text-right flex-shrink-0 ml-4">
                  <p className="font-mono text-[9px] tracking-wider mb-0.5" style={{ color: '#3D5570' }}>RISK SCORE</p>
                  <p
                    className="font-orbitron text-3xl font-black"
                    style={{ color, textShadow: `0 0 12px ${color}60` }}
                  >
                    {c.risk_score}<span className="text-base">%</span>
                  </p>
                </div>
              </div>

              {/* Risk bar */}
              <div className="risk-bar-track mb-3">
                <div
                  className="risk-bar-fill"
                  style={{ width: `${c.risk_score}%`, background: `linear-gradient(90deg, ${color}60, ${color})` }}
                />
              </div>

              {/* Signal pills */}
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {item.behaviour_analysis?.slice(0, 2).map((b, i) => (
                    <span
                      key={i}
                      className="font-mono text-[9px] px-2 py-0.5 rounded"
                      style={{ background: '#FF2D5510', color: '#FF2D55', border: '1px solid #FF2D5525' }}
                    >
                      {b.split(' ').slice(0, 4).join(' ')}…
                    </span>
                  ))}
                </div>
                <span className="flex items-center gap-1 font-mono text-[10px] font-bold" style={{ color: '#BF5AF2' }}>
                  INVESTIGATE <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

/* ── Case Detail ───────────────────────────────────────── */
function CaseDetail({ caseId }) {
  const navigate = useNavigate()
  const { data: inv, loading, error } = useApi(() => getCaseDetail(caseId), null)

  if (loading) return (
    <div className="p-6 space-y-5">
      {[1,2,3].map(i => <div key={i} className="skeleton h-40 w-full rounded-xl" />)}
    </div>
  )

  if (error || !inv) return (
    <div className="p-8 text-center">
      <AlertTriangle className="w-10 h-10 mx-auto mb-3" style={{ color: '#FF2D55' }} />
      <p className="font-mono text-sm font-bold mb-1" style={{ color: '#FF2D55' }}>CASE NOT FOUND</p>
      <p className="text-xs mb-4" style={{ color: '#3D5570' }}>{error}</p>
      <Link to="/investigations" className="font-mono text-xs" style={{ color: '#00D4FF' }}>← BACK TO CASES</Link>
    </div>
  )

  const c = inv.case
  const { color, label } = riskMeta(c.risk_score)

  return (
    <div className="p-5 space-y-5 animate-fade-in">

      {/* Back */}
      <button
        onClick={() => navigate('/investigations')}
        className="flex items-center gap-2 font-mono text-xs transition-opacity hover:opacity-70"
        style={{ color: '#3D5570' }}
      >
        <ArrowLeft className="w-4 h-4" /> BACK TO CASES
      </button>

      {/* Case header */}
      <div
        className="card overflow-hidden"
        style={{ borderTopColor: color, borderTopWidth: '3px' }}
      >
        <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
        <div className="p-6">
          <div className="flex items-start justify-between flex-wrap gap-5 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-orbitron text-xs font-bold" style={{ color: '#00D4FF' }}>INVESTIGATION</span>
                <span
                  className="badge"
                  style={{ background: `${color}15`, color, borderColor: `${color}40`, fontSize: '9px' }}
                >
                  {label}
                </span>
                <span className="badge" style={{ background: '#BF5AF215', color: '#BF5AF2', borderColor: '#BF5AF240', fontSize: '9px' }}>
                  AI GENERATED
                </span>
              </div>
              <h1
                className="font-orbitron text-2xl font-black mb-1"
                style={{ color, textShadow: `0 0 16px ${color}50` }}
              >
                {c.case_id}
              </h1>
              <p className="text-sm font-semibold" style={{ color: '#E8F0FE' }}>{c.threat}</p>
            </div>

            {/* Big risk score */}
            <div
              className="p-4 rounded-xl text-center"
              style={{ background: `${color}10`, border: `1px solid ${color}30` }}
            >
              <p className="font-mono text-[9px] tracking-widest mb-1" style={{ color: '#3D5570' }}>AI RISK SCORE</p>
              <p
                className="font-orbitron text-5xl font-black leading-none"
                style={{ color, textShadow: `0 0 24px ${color}70` }}
              >
                {c.risk_score}
                <span className="text-2xl">%</span>
              </p>
            </div>
          </div>

          {/* Meta grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'AFFECTED USER',   value: c.username },
              { label: 'THREAT CLASS',    value: c.threat || '—' },
              { label: 'ROOT CAUSE',      value: c.root_cause || '—' },
              { label: 'EVENTS LINKED',   value: `${c.events?.length ?? 0} events` },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="p-3 rounded-lg"
                style={{ background: '#030812', border: '1px solid #112035' }}
              >
                <p className="font-mono text-[9px] font-bold tracking-widest mb-1" style={{ color: '#3D5570' }}>{label}</p>
                <p className="text-sm font-semibold truncate" style={{ color: '#E8F0FE' }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Analysis */}
      <div>
        <p className="section-label mb-4">AI Analysis Results</p>
        <AIInsightPanel investigation={inv} />
      </div>

      {/* Timeline */}
      <div>
        <p className="section-label mb-4">Chronological Attack Timeline</p>
        <Timeline events={inv.timeline || []} />
      </div>

      {/* Events + Transactions split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Security Events */}
        <div className="card overflow-hidden" style={{ borderTopColor: '#00D4FF', borderTopWidth: '2px' }}>
          <div className="px-5 py-3.5 flex items-center gap-2" style={{ borderBottom: '1px solid #112035', background: '#030812' }}>
            <Shield className="w-3.5 h-3.5" style={{ color: '#00D4FF' }} />
            <h3 className="font-mono text-xs font-bold" style={{ color: '#8BA0BF' }}>
              SECURITY EVENTS <span style={{ color: '#00D4FF' }}>({c.events?.length ?? 0})</span>
            </h3>
          </div>
          <div>
            {c.events?.map((ev) => {
              const sevColor = { Critical: '#FF2D55', High: '#FF9F0A', Medium: '#FFD60A', Low: '#30D158' }[ev.severity] || '#00D4FF'
              return (
                <div
                  key={ev.event_id}
                  className="px-5 py-3 flex items-start justify-between gap-3 transition-all"
                  style={{ borderBottom: '1px solid #112035' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#040b16'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div
                    className="w-1 h-full min-h-[36px] rounded-full flex-shrink-0"
                    style={{ background: sevColor, boxShadow: `0 0 6px ${sevColor}60` }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold" style={{ color: '#E8F0FE' }}>{ev.event_type}</p>
                    <p className="font-mono text-[10px]" style={{ color: '#3D5570' }}>
                      {ev.ip_address} · {ev.device}
                    </p>
                    <p className="font-mono text-[9px] mt-0.5" style={{ color: '#253548' }}>{ev.timestamp}</p>
                  </div>
                  <span
                    className="badge flex-shrink-0"
                    style={{ background: `${sevColor}15`, color: sevColor, borderColor: `${sevColor}40`, fontSize: '9px' }}
                  >
                    {ev.severity}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Transactions */}
        <div className="card overflow-hidden" style={{ borderTopColor: '#FF9F0A', borderTopWidth: '2px' }}>
          <div className="px-5 py-3.5 flex items-center gap-2" style={{ borderBottom: '1px solid #112035', background: '#030812' }}>
            <CreditCard className="w-3.5 h-3.5" style={{ color: '#FF9F0A' }} />
            <h3 className="font-mono text-xs font-bold" style={{ color: '#8BA0BF' }}>
              TRANSACTIONS <span style={{ color: '#FF9F0A' }}>({c.transactions?.length ?? 0})</span>
            </h3>
          </div>
          {c.transactions?.length > 0 ? (
            <div>
              {c.transactions.map((tx) => (
                <div
                  key={tx.transaction_id}
                  className="px-5 py-3 transition-all"
                  style={{ borderBottom: '1px solid #112035' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#040b16'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] font-bold" style={{ color: '#FF9F0A' }}>{tx.transaction_id}</span>
                    <span
                      className="font-mono text-[9px] font-bold px-2 py-0.5 rounded"
                      style={{
                        background: tx.status === 'Pending' ? '#FF9F0A15' : '#30D15815',
                        color: tx.status === 'Pending' ? '#FF9F0A' : '#30D158',
                      }}
                    >
                      {tx.status?.toUpperCase()}
                    </span>
                  </div>
                  <p
                    className="font-orbitron text-lg font-bold"
                    style={{ color: '#FF2D55', textShadow: '0 0 8px #FF2D5540' }}
                  >
                    ₹{tx.amount?.toLocaleString('en-IN')}
                  </p>
                  <p className="font-mono text-[10px] mt-0.5" style={{ color: '#3D5570' }}>
                    → {tx.beneficiary} · {tx.location}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center font-mono text-xs" style={{ color: '#3D5570' }}>
              No transactions linked
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Page Entry ─────────────────────────────────────────── */
export default function Investigations() {
  const { id } = useParams()

  return id ? <CaseDetail caseId={id} /> : (
    <div>
      <div
        className="px-5 pt-5 pb-3"
        style={{ borderBottom: '1px solid #112035' }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: '#BF5AF215', border: '1px solid #BF5AF240', boxShadow: '0 0 12px #BF5AF230' }}
          >
            <Brain className="w-4 h-4" style={{ color: '#BF5AF2' }} />
          </div>
          <div>
            <h1 className="font-orbitron text-base font-bold tracking-wider" style={{ color: '#E8F0FE' }}>
              AI INVESTIGATION CASES
            </h1>
            <p className="font-mono text-[9px]" style={{ color: '#3D5570' }}>
              Auto-generated by correlating security events with financial transactions
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2 px-2.5 py-1 rounded-lg" style={{ background: '#BF5AF210', border: '1px solid #BF5AF230' }}>
            <div className="animate-glow-breathe w-1.5 h-1.5 rounded-full" style={{ background: '#BF5AF2' }} />
            <span className="font-mono text-[9px] font-bold tracking-widest" style={{ color: '#BF5AF2' }}>AI ACTIVE</span>
          </div>
        </div>
      </div>
      <CaseList />
    </div>
  )
}