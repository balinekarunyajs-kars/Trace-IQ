import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export default function ThreatChart({ data = [], type = 'bar', title = 'Threat Distribution' }) {
  const COLORS = ['#00C2FF', '#EF4444', '#22C55E', '#F59E0B', '#8B5CF6', '#EC4899']

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#08111F] border border-[#00C2FF] rounded-lg p-3">
          <p className="text-[#00C2FF] font-semibold">{payload[0].payload.name || payload[0].payload.date}</p>
          <p className="text-[#F1F5F9]">{payload[0].name}: {payload[0].value}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="bg-[#101B2D] border border-[#1E293B] rounded-lg p-6">
      <h3 className="text-lg font-semibold text-[#F1F5F9] mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        {type === 'bar' ? (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
            <XAxis dataKey="name" stroke="#94A3B8" />
            <YAxis stroke="#94A3B8" />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" fill="#00C2FF" radius={[8, 8, 0, 0]} />
          </BarChart>
        ) : (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  )
}