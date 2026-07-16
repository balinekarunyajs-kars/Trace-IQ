import React from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend,
} from 'recharts'

const SEVERITY_COLORS = ['#FF2D55', '#FF9F0A', '#FFD60A', '#30D158', '#00D4FF', '#BF5AF2']

const CyberTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div
      className="px-3 py-2 rounded-lg text-xs"
      style={{
        background: '#030812',
        border: '1px solid #00D4FF40',
        boxShadow: '0 0 16px #00D4FF20',
      }}
    >
      <p className="font-mono font-bold mb-1" style={{ color: '#00D4FF' }}>
        {payload[0].payload.name || payload[0].payload.day || label}
      </p>
      {payload.map((p, i) => (
        <p key={i} className="font-mono" style={{ color: p.color || '#E8F0FE' }}>
          {p.name !== 'value' ? `${p.name}: ` : ''}{p.value}
        </p>
      ))}
    </div>
  )
}

export default function ThreatChart({ data = [], type = 'bar', title = '', loading = false, accentColor = '#00D4FF' }) {
  const axisStyle = { fill: '#3D5570', fontSize: 10, fontFamily: 'JetBrains Mono' }

  if (loading) {
    return (
      <div className="card p-5">
        <div className="skeleton h-3 w-40 mb-5" />
        <div className="skeleton h-[240px] w-full rounded-lg" />
      </div>
    )
  }

  return (
    <div
      className="card p-5"
      style={{ borderTopColor: accentColor, borderTopWidth: '2px' }}
    >
      <div className="flex items-center gap-2 mb-5">
        <div
          className="w-1.5 h-4 rounded-full"
          style={{ background: accentColor, boxShadow: `0 0 8px ${accentColor}` }}
        />
        <h3 className="font-mono text-xs font-bold tracking-wider uppercase" style={{ color: '#8BA0BF' }}>
          {title}
        </h3>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        {type === 'bar' ? (
          <BarChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 4 }}>
            <CartesianGrid strokeDasharray="2 6" stroke="#112035" vertical={false} />
            <XAxis dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} />
            <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
            <Tooltip content={<CyberTooltip />} cursor={{ fill: '#00D4FF08' }} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((_, i) => (
                <Cell
                  key={i}
                  fill={SEVERITY_COLORS[i % SEVERITY_COLORS.length]}
                  style={{ filter: `drop-shadow(0 0 4px ${SEVERITY_COLORS[i % SEVERITY_COLORS.length]}80)` }}
                />
              ))}
            </Bar>
          </BarChart>
        ) : type === 'line' ? (
          <LineChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 4 }}>
            <CartesianGrid strokeDasharray="2 6" stroke="#112035" vertical={false} />
            <XAxis dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} />
            <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
            <Tooltip content={<CyberTooltip />} cursor={{ stroke: '#00D4FF30' }} />
            <Line type="monotone" dataKey="value" stroke={accentColor} strokeWidth={2}
              dot={{ fill: accentColor, r: 3, strokeWidth: 0 }}
              activeDot={{ r: 5, fill: accentColor, strokeWidth: 0, style: { filter: `drop-shadow(0 0 6px ${accentColor})` } }} />
          </LineChart>
        ) : (
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={90}
              dataKey="value" strokeWidth={2} stroke="#030812">
              {data.map((_, i) => (
                <Cell key={i} fill={SEVERITY_COLORS[i % SEVERITY_COLORS.length]}
                  style={{ filter: `drop-shadow(0 0 4px ${SEVERITY_COLORS[i % SEVERITY_COLORS.length]}60)` }} />
              ))}
            </Pie>
            <Tooltip content={<CyberTooltip />} />
            <Legend formatter={(v) => (
              <span style={{ color: '#8BA0BF', fontSize: 10, fontFamily: 'JetBrains Mono' }}>{v}</span>
            )} />
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  )
}