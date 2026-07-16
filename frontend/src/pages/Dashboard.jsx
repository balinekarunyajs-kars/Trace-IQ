import React from 'react'
import { Link } from 'react-router-dom'
import {
  Activity, AlertTriangle, CreditCard, Brain,
  ArrowRight, Shield, Cpu, Zap, Database,
} from 'lucide-react'
import DashboardCard from '../components/dashboard/DashboardCard'
import ThreatChart from '../components/dashboard/ThreatChart'
import { getDashboard, getAnalytics, getCases } from '../api'
import { useApi } from '../hooks/useApi'

const riskMeta = (score) => {
  if (score >= 80) return { color: '#FF2D55', label: 'CRITICAL' }
  if (score >= 60) return { color: '#FF9F0A', label: 'HIGH' }
  if (score >= 40) return { color: '#FFD60A', label: 'MEDIUM' }
  return { color: '#30D158', label: 'LOW' }
}

export default function Dashboard() {
  const { data: dash,      loading: dashLoad }     = useApi(getDashboard, null)
  const { data: analytics, loading: analyticsLoad } = useApi(getAnalytics, null)
  const { data: cases,     loading: casesLoad }     = useApi(getCases, [])

  return (
    <div className="p-6 space-y-7">

      {/* ══ HERO BANNER ═════════════════════════════════════ */}
      <div
        className="card scan-container rounded-xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #040d1a 0%, #060e1c 60%, #080818 100%)',
          borderColor: '#00D4FF30',
        }}
      >
        {/* Top accent line */}
        <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #00D4FF, #BF5AF2, transparent)' }} />

        <div className="p-7 relative">
          {/* Glow orbs */}
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, #00D4FF06 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, #BF5AF205 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

          <div className="relative flex flex-wrap gap-8 items-start justify-between">
            <div className="flex-1 min-w-0 max-w-2xl">
              {/* Title row */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: '#00D4FF15', border: '1px solid #00D4FF40', boxShadow: '0 0 20px #00D4FF30' }}
                >
                  <Shield className="w-5 h-5" style={{ color: '#00D4FF' }} />
                </div>
                <div>
                  <h1
                    className="font-orbitron text-xl font-bold tracking-widest"
                    style={{ color: '#00D4FF', textShadow: '0 0 16px #00D4FF60' }}
                  >
                    TRACE-IQ
                  </h1>
                  <p className="font-mono text-[9px] tracking-[0.2em]" style={{ color: '#3D5570' }}>
                    BANKING CYBER THREAT INTELLIGENCE PLATFORM
                  </p>
                </div>
                <div className="ml-2 flex items-center gap-2 px-2.5 py-1 rounded-md" style={{ background: '#30D15810', border: '1px solid #30D15830' }}>
                  <div className="live-dot" />
                  <span className="font-mono text-[9px] font-bold tracking-widest" style={{ color: '#30D158' }}>LIVE</span>
                </div>
              </div>

              <p className="text-sm leading-relaxed mb-5" style={{ color: '#8BA0BF' }}>
                Trace-IQ automatically <span className="font-semibold" style={{ color: '#E8F0FE' }}>correlates login events, device signals & financial transactions</span> to
                detect threats in real-time. The AI engine classifies threat types, calculates risk scores, identifies
                root causes, and generates investigation reports — in seconds.
              </p>

              {/* Feature chips */}
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: Brain,    label: 'AI Threat Correlation',   color: '#BF5AF2' },
                  { icon: Zap,      label: 'Real-time Risk Scoring',   color: '#FF9F0A' },
                  { icon: Shield,   label: 'Root Cause Analysis',      color: '#00D4FF' },
                  { icon: Database, label: 'Financial Fraud Detection',color: '#30D158' },
                ].map(({ icon: Icon, label, color }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                    style={{ background: `${color}0d`, border: `1px solid ${color}25` }}
                  >
                    <Icon className="w-3 h-3" style={{ color }} />
                    <span className="font-mono text-[10px] font-semibold" style={{ color }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* How It Works panel */}
            <div
              className="hidden xl:block p-4 rounded-xl min-w-[220px]"
              style={{ background: '#030812', border: '1px solid #112035' }}
            >
              <p className="font-mono text-[9px] font-bold tracking-[0.2em] mb-3" style={{ color: '#3D5570' }}>
                HOW IT WORKS
              </p>
              {[
                { n: '01', t: 'Security events captured',     c: '#00D4FF' },
                { n: '02', t: 'Correlated with transactions', c: '#FF9F0A' },
                { n: '03', t: 'AI classifies the threat',     c: '#BF5AF2' },
                { n: '04', t: 'Risk scored & reported',       c: '#30D158' },
              ].map(({ n, t, c }) => (
                <div key={n} className="flex items-center gap-2.5 mb-2.5 last:mb-0">
                  <span className="font-orbitron text-xs font-bold w-6 flex-shrink-0" style={{ color: c }}>{n}</span>
                  <div className="flex-1 h-px" style={{ background: '#112035' }} />
                  <span className="font-mono text-[9px]" style={{ color: '#8BA0BF' }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #BF5AF2, #00D4FF, transparent)' }} />
      </div>

      {/* ══ KPI CARDS ════════════════════════════════════════ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Security Events"
          value={dash?.total_security_events ?? '…'}
          icon={Activity}
          trend="ingested"
          trendDirection="neutral"
          color="cyan"
          loading={dashLoad}
          subtitle="Total events monitored by AI"
        />
        <DashboardCard
          title="Active Cases"
          value={dash?.active_cases ?? '…'}
          icon={Cpu}
          trend={dash?.latest_threat?.threat ? 'THREAT DETECTED' : 'scanning'}
          trendDirection={dash?.active_cases ? 'up' : 'neutral'}
          color="purple"
          loading={dashLoad}
          subtitle="AI-generated investigation cases"
        />
        <DashboardCard
          title="Critical Threats"
          value={dash?.critical_events ?? '…'}
          icon={AlertTriangle}
          trend={`+${dash?.high_events ?? 0} high`}
          trendDirection="up"
          color="red"
          loading={dashLoad}
          subtitle="Severity: Critical events detected"
        />
        <DashboardCard
          title="Transactions"
          value={dash?.total_transactions ?? '…'}
          icon={CreditCard}
          trend="AI-analysed"
          trendDirection="neutral"
          color="amber"
          loading={dashLoad}
          subtitle="Financial records cross-checked"
        />
      </div>

      {/* ══ CHARTS ═══════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ThreatChart
          data={analytics?.threatDistribution ?? []}
          type="pie"
          title="Threat Distribution by Severity"
          loading={analyticsLoad}
          accentColor="#00D4FF"
        />
        <ThreatChart
          data={analytics?.riskLevels ?? []}
          type="bar"
          title="Risk Level Breakdown"
          loading={analyticsLoad}
          accentColor="#FF2D55"
        />
      </div>

      {/* ══ CASES TABLE ══════════════════════════════════════ */}
      <div className="card overflow-hidden">
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: '1px solid #112035', background: '#030812' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: '#BF5AF215', border: '1px solid #BF5AF230', boxShadow: '0 0 12px #BF5AF230' }}
            >
              <Brain className="w-4 h-4" style={{ color: '#BF5AF2' }} />
            </div>
            <div>
              <h2 className="font-mono text-sm font-bold" style={{ color: '#E8F0FE' }}>
                AI-CORRELATED INVESTIGATION CASES
              </h2>
              <p className="font-mono text-[9px]" style={{ color: '#3D5570' }}>
                Auto-generated by the AI correlation engine — live backend data
              </p>
            </div>
          </div>
          <Link
            to="/investigations"
            className="flex items-center gap-1.5 font-mono text-xs font-bold transition-opacity hover:opacity-70"
            style={{ color: '#BF5AF2' }}
          >
            VIEW ALL <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Table */}
        {casesLoad ? (
          <div className="p-5 space-y-3">
            {[1,2,3].map(i => <div key={i} className="skeleton h-14 w-full rounded-lg" />)}
          </div>
        ) : cases && cases.length > 0 ? (
          <table className="w-full data-table">
            <thead>
              <tr>
                {['Case ID', 'Affected User', 'Threat Type', 'Risk Score', 'Root Cause', 'Investigate'].map(h => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cases.slice(0, 6).map((item) => {
                const c = item.case
                if (!c) return null
                const { color, label } = riskMeta(c.risk_score)
                return (
                  <tr key={c.case_id}>
                    <td>
                      <span className="font-mono text-xs font-bold" style={{ color: '#00D4FF' }}>{c.case_id}</span>
                    </td>
                    <td>
                      <span className="font-mono text-xs font-semibold" style={{ color: '#E8F0FE' }}>{c.username}</span>
                    </td>
                    <td>
                      <span className="text-xs" style={{ color: '#8BA0BF' }}>{c.threat || 'Analyzing...'}</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2.5">
                        <div className="risk-bar-track w-16">
                          <div
                            className="risk-bar-fill"
                            style={{ width: `${c.risk_score}%`, background: color, boxShadow: `0 0 6px ${color}80` }}
                          />
                        </div>
                        <span className="font-mono text-xs font-bold" style={{ color }}>{c.risk_score}%</span>
                        <span
                          className="badge"
                          style={{
                            background: `${color}15`, color, borderColor: `${color}40`,
                            padding: '1px 6px', fontSize: '9px',
                          }}
                        >
                          {label}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="text-[11px]" style={{ color: '#3D5570' }}>{c.root_cause || '—'}</span>
                    </td>
                    <td>
                      <Link
                        to={`/investigations/${c.case_id}`}
                        className="flex items-center gap-1 font-mono text-[11px] font-bold transition-opacity hover:opacity-70"
                        style={{ color: '#BF5AF2' }}
                      >
                        OPEN <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        ) : (
          <div className="p-12 text-center">
            <Brain className="w-10 h-10 mx-auto mb-3" style={{ color: '#1a2744' }} />
            <p className="font-mono text-sm" style={{ color: '#3D5570' }}>
              No cases found. Ensure the backend is running at{' '}
              <span style={{ color: '#00D4FF' }}>localhost:8000</span>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}