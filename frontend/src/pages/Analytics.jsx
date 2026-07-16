import React from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend,
} from 'recharts'
import { BarChart3, Brain, Target, TrendingUp, Cpu, Zap } from 'lucide-react'
import { getAnalytics } from '../api'
import { useApi } from '../hooks/useApi'

const PALETTE = ['#FF2D55', '#FF9F0A', '#FFD60A', '#30D158', '#00D4FF', '#BF5AF2']
const axisStyle = { fill: '#3D5570', fontSize: 10, fontFamily: 'JetBrains Mono' }

const CyberTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="px-3 py-2 rounded-lg text-xs" style={{ background: '#030812', border: '1px solid #00D4FF30', boxShadow: '0 0 12px #00D4FF15' }}>
      <p className="font-mono font-bold mb-1" style={{ color: '#00D4FF' }}>{payload[0].payload.name || payload[0].payload.day || label}</p>
      {payload.map((p, i) => (
        <p key={i} className="font-mono" style={{ color: p.color || '#E8F0FE' }}>{p.name}: {p.value}</p>
      ))}
    </div>
  )
}

const weeklyTrend = [
  { day: 'Mon', cases: 4,  threats: 12 },
  { day: 'Tue', cases: 7,  threats: 18 },
  { day: 'Wed', cases: 5,  threats: 15 },
  { day: 'Thu', cases: 9,  threats: 22 },
  { day: 'Fri', cases: 11, threats: 27 },
  { day: 'Sat', cases: 6,  threats: 19 },
  { day: 'Sun', cases: 8,  threats: 23 },
]

const targetedSystems = [
  { system: 'Core Banking',    attacks: 42 },
  { system: 'Database Server', attacks: 34 },
  { system: 'Payment Gateway', attacks: 29 },
  { system: 'Auth Server',     attacks: 22 },
  { system: 'Admin Console',   attacks: 17 },
]

const aiCapabilities = [
  { title: 'Multi-Signal Correlation', desc: 'Cross-references login events, device fingerprints, IP geolocation, and transaction patterns simultaneously in real-time.', color: '#00D4FF' },
  { title: 'Threat Classification',    desc: 'Classifies threats as Account Takeover, Insider Threat, Suspicious Login, or Fraud using rule-based AI logic.',             color: '#BF5AF2' },
  { title: 'Automated Investigation',  desc: 'Generates full case reports with root cause, risk scores, attack timeline, and remediation steps in under 6 seconds.',       color: '#30D158' },
]

const kpiData = [
  { label: 'AI Detection Accuracy', value: '96.8%', color: '#00D4FF',  sub: 'Classification success rate' },
  { label: 'Avg Investigation Time', value: '5.8s',  color: '#30D158',  sub: 'Time to generate full case' },
  { label: 'False Positive Rate',    value: '2.1%',  color: '#FF2D55',  sub: 'Low noise output' },
  { label: 'Signals Correlated',     value: '9+',    color: '#BF5AF2',  sub: 'Per investigation case' },
]

export default function Analytics() {
  const { data: analytics, loading } = useApi(getAnalytics, null)

  return (
    <div className="p-5 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: '#30D15812', border: '1px solid #30D15830', boxShadow: '0 0 12px #30D15825' }}
        >
          <BarChart3 className="w-5 h-5" style={{ color: '#30D158' }} />
        </div>
        <div>
          <h1 className="font-orbitron text-base font-bold tracking-wider" style={{ color: '#E8F0FE' }}>
            THREAT INTELLIGENCE CENTER
          </h1>
          <p className="font-mono text-[9px]" style={{ color: '#3D5570' }}>
            AI-powered security analytics and performance metrics
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map(({ label, value, color, sub }) => (
          <div
            key={label}
            className="card p-4"
            style={{ borderLeftWidth: '3px', borderLeftColor: color }}
          >
            <p className="font-mono text-[9px] font-bold tracking-widest mb-1.5" style={{ color: '#3D5570' }}>{label}</p>
            <p className="font-orbitron text-3xl font-black" style={{ color, textShadow: `0 0 10px ${color}50` }}>
              {value}
            </p>
            <p className="font-mono text-[9px] mt-1" style={{ color: '#253548' }}>{sub}</p>
          </div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Threat Distribution */}
        <div className="card p-5" style={{ borderTopColor: '#FF2D55', borderTopWidth: '2px' }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-4 rounded-full" style={{ background: '#FF2D55', boxShadow: '0 0 8px #FF2D55' }} />
            <h2 className="font-mono text-xs font-bold tracking-wider uppercase" style={{ color: '#8BA0BF' }}>
              Threat Distribution
            </h2>
          </div>
          {loading ? (
            <div className="skeleton h-[240px] w-full rounded-lg" />
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={analytics?.threatDistribution ?? []} cx="50%" cy="50%"
                  innerRadius={55} outerRadius={90} dataKey="value" strokeWidth={2} stroke="#030812">
                  {(analytics?.threatDistribution ?? []).map((_, i) => (
                    <Cell key={i} fill={PALETTE[i % PALETTE.length]}
                      style={{ filter: `drop-shadow(0 0 4px ${PALETTE[i % PALETTE.length]}60)` }} />
                  ))}
                </Pie>
                <Tooltip content={<CyberTooltip />} />
                <Legend formatter={(v) => <span style={{ color: '#8BA0BF', fontSize: 10, fontFamily: 'JetBrains Mono' }}>{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Risk Level Breakdown */}
        <div className="card p-5" style={{ borderTopColor: '#FF9F0A', borderTopWidth: '2px' }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-4 rounded-full" style={{ background: '#FF9F0A', boxShadow: '0 0 8px #FF9F0A' }} />
            <h2 className="font-mono text-xs font-bold tracking-wider uppercase" style={{ color: '#8BA0BF' }}>
              Risk Level Breakdown
            </h2>
          </div>
          {loading ? (
            <div className="skeleton h-[240px] w-full rounded-lg" />
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={analytics?.riskLevels ?? []} margin={{ top: 4, right: 8, left: -20, bottom: 4 }}>
                <CartesianGrid strokeDasharray="2 6" stroke="#112035" vertical={false} />
                <XAxis dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} />
                <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
                <Tooltip content={<CyberTooltip />} cursor={{ fill: '#FF9F0A08' }} />
                <Bar dataKey="value" radius={[4,4,0,0]}>
                  {(analytics?.riskLevels ?? []).map((_, i) => (
                    <Cell key={i} fill={PALETTE[i % PALETTE.length]}
                      style={{ filter: `drop-shadow(0 0 4px ${PALETTE[i % PALETTE.length]}60)` }} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Weekly Trend */}
      <div className="card p-5" style={{ borderTopColor: '#BF5AF2', borderTopWidth: '2px' }}>
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-4 h-4" style={{ color: '#BF5AF2' }} />
          <h2 className="font-mono text-xs font-bold tracking-wider uppercase" style={{ color: '#8BA0BF' }}>
            Weekly Investigation Trend
          </h2>
          <span className="ml-auto font-mono text-[9px]" style={{ color: '#3D5570' }}>AI cases per day</span>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={weeklyTrend} margin={{ top: 4, right: 8, left: -20, bottom: 4 }}>
            <CartesianGrid strokeDasharray="2 6" stroke="#112035" vertical={false} />
            <XAxis dataKey="day" tick={axisStyle} axisLine={false} tickLine={false} />
            <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
            <Tooltip content={<CyberTooltip />} />
            <Legend formatter={(v) => <span style={{ color: '#8BA0BF', fontSize: 10, fontFamily: 'JetBrains Mono' }}>{v}</span>} />
            <Line type="monotone" dataKey="cases"   name="AI Cases"     stroke="#00D4FF" strokeWidth={2}
              dot={{ fill: '#00D4FF', r: 3, strokeWidth: 0 }} activeDot={{ r: 5, fill: '#00D4FF', strokeWidth: 0 }} />
            <Line type="monotone" dataKey="threats" name="Threat Events" stroke="#FF2D55" strokeWidth={2} strokeDasharray="5 3"
              dot={{ fill: '#FF2D55', r: 3, strokeWidth: 0 }} activeDot={{ r: 5, fill: '#FF2D55', strokeWidth: 0 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Targeted Systems */}
      <div className="card p-5" style={{ borderTopColor: '#00D4FF', borderTopWidth: '2px' }}>
        <div className="flex items-center gap-2 mb-5">
          <Target className="w-4 h-4" style={{ color: '#00D4FF' }} />
          <h2 className="font-mono text-xs font-bold tracking-wider uppercase" style={{ color: '#8BA0BF' }}>
            Most Targeted Banking Systems
          </h2>
        </div>
        <div className="space-y-3.5">
          {targetedSystems.map(({ system, attacks }, i) => {
            const pct = Math.round((attacks / targetedSystems[0].attacks) * 100)
            const c = PALETTE[i % PALETTE.length]
            return (
              <div key={system}>
                <div className="flex justify-between mb-1.5">
                  <span className="font-mono text-xs" style={{ color: '#8BA0BF' }}>{system}</span>
                  <span className="font-mono text-xs font-bold" style={{ color: c }}>{attacks} attacks</span>
                </div>
                <div className="risk-bar-track">
                  <div
                    className="risk-bar-fill"
                    style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${c}60, ${c})`, boxShadow: `0 0 8px ${c}50` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* AI Capabilities */}
      <div className="card p-5" style={{ borderTopColor: '#BF5AF2', borderTopWidth: '2px', background: '#BF5AF205' }}>
        <div className="flex items-center gap-2 mb-5">
          <Cpu className="w-4 h-4" style={{ color: '#BF5AF2' }} />
          <h2 className="font-mono text-xs font-bold tracking-wider uppercase" style={{ color: '#8BA0BF' }}>
            AI Engine Capabilities
          </h2>
          <div className="ml-auto flex items-center gap-1.5 px-2 py-1 rounded" style={{ background: '#BF5AF212', border: '1px solid #BF5AF230' }}>
            <div className="animate-glow-breathe w-1.5 h-1.5 rounded-full" style={{ background: '#BF5AF2' }} />
            <span className="font-mono text-[9px] font-bold" style={{ color: '#BF5AF2' }}>ACTIVE</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {aiCapabilities.map(({ title, desc, color }) => (
            <div
              key={title}
              className="p-4 rounded-xl"
              style={{ background: '#030812', border: `1px solid ${color}25`, borderTopWidth: '2px', borderTopColor: color }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-3 h-3" style={{ color }} />
                <h3 className="font-mono text-[10px] font-bold tracking-wider" style={{ color }}>{title}</h3>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: '#3D5570' }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}