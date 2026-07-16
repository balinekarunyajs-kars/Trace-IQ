import React from 'react'
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react'

export default function EventTable({ events = [] }) {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical':
        return 'bg-[#EF4444] bg-opacity-20 text-[#EF4444]'
      case 'High':
        return 'bg-[#F59E0B] bg-opacity-20 text-[#F59E0B]'
      case 'Medium':
        return 'bg-[#F59E0B] bg-opacity-20 text-[#F59E0B]'
      case 'Low':
        return 'bg-[#22C55E] bg-opacity-20 text-[#22C55E]'
      default:
        return 'bg-[#64748B] bg-opacity-20 text-[#64748B]'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Critical':
        return <AlertCircle className="w-4 h-4" />
      case 'Suspicious':
        return <AlertTriangle className="w-4 h-4" />
      case 'Normal':
        return <CheckCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Critical':
        return 'text-[#EF4444]'
      case 'Suspicious':
        return 'text-[#F59E0B]'
      case 'Normal':
        return 'text-[#22C55E]'
      default:
        return 'text-[#94A3B8]'
    }
  }

  return (
    <div className="bg-[#101B2D] border border-[#1E293B] rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1E293B] bg-[#08111F]">
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#94A3B8]">Event ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#94A3B8]">User</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#94A3B8]">Activity</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#94A3B8]">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#94A3B8]">Severity</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#94A3B8]">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E293B]">
            {events.map((event) => (
              <tr
                key={event.id}
                className="hover:bg-[#0F1B2E] transition-colors duration-200 group"
              >
                <td className="px-6 py-4">
                  <span className="text-sm font-mono text-[#00C2FF]">{event.id}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-[#F1F5F9]">{event.user}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-[#F1F5F9]">{event.activity}</span>
                </td>
                <td className="px-6 py-4">
                  <div className={`flex items-center gap-2 ${getStatusColor(event.status)}`}>
                    {getStatusIcon(event.status)}
                    <span className="text-sm font-medium">{event.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getSeverityColor(event.severity)}`}>
                    {event.severity}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-[#94A3B8]">{event.timestamp}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}