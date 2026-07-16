import React from 'react'
import { CheckCircle, AlertCircle } from 'lucide-react'

export default function Timeline({ events = [] }) {
  return (
    <div className="bg-[#101B2D] border border-[#1E293B] rounded-lg p-6">
      <h3 className="text-lg font-semibold text-[#F1F5F9] mb-6">Attack Timeline</h3>
      <div className="space-y-6">
        {events.map((event, index) => (
          <div key={index} className="flex gap-4">
            {/* Timeline line and circle */}
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                event.status === 'executed'
                  ? 'bg-[#EF4444] bg-opacity-20'
                  : 'bg-[#22C55E] bg-opacity-20'
              }`}>
                {event.status === 'executed' ? (
                  <AlertCircle className="w-6 h-6 text-[#EF4444]" />
                ) : (
                  <CheckCircle className="w-6 h-6 text-[#22C55E]" />
                )}
              </div>
              {index < events.length - 1 && (
                <div className="w-0.5 h-12 bg-gradient-to-b from-[#00C2FF] to-[#1E293B] my-2"></div>
              )}
            </div>

            {/* Event content */}
            <div className="flex-1 pt-1">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[#F1F5F9] font-semibold">{event.event}</p>
                  <p className="text-[#94A3B8] text-sm mt-1">{event.time}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  event.status === 'executed'
                    ? 'bg-[#EF4444] bg-opacity-20 text-[#EF4444]'
                    : 'bg-[#22C55E] bg-opacity-20 text-[#22C55E]'
                }`}>
                  {event.status === 'executed' ? 'Executed' : 'Completed'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}