import React, { useState } from 'react'
import { AlertCircle, Filter } from 'lucide-react'
import EventTable from '../components/dashboard/EventTable'
import { securityEvents } from '../data/dummyData'

export default function SecurityEvents() {
  const [filter, setFilter] = useState('all')

  const filteredEvents = filter === 'all'
    ? securityEvents
    : securityEvents.filter(event => event.severity === filter)

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#F1F5F9] mb-2">Security Events</h1>
        <p className="text-[#94A3B8]">Real-time security event monitoring and analysis</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#101B2D] border border-[#1E293B] rounded-lg p-6">
          <p className="text-[#94A3B8] text-sm mb-2">Total Events</p>
          <p className="text-3xl font-bold text-[#F1F5F9]">{securityEvents.length}</p>
        </div>
        <div className="bg-[#101B2D] border border-[#1E293B] rounded-lg p-6">
          <p className="text-[#94A3B8] text-sm mb-2">Critical</p>
          <p className="text-3xl font-bold text-[#EF4444]">
            {securityEvents.filter(e => e.severity === 'Critical').length}
          </p>
        </div>
        <div className="bg-[#101B2D] border border-[#1E293B] rounded-lg p-6">
          <p className="text-[#94A3B8] text-sm mb-2">High Risk</p>
          <p className="text-3xl font-bold text-[#F59E0B]">
            {securityEvents.filter(e => e.severity === 'High').length}
          </p>
        </div>
        <div className="bg-[#101B2D] border border-[#1E293B] rounded-lg p-6">
          <p className="text-[#94A3B8] text-sm mb-2">Normal</p>
          <p className="text-3xl font-bold text-[#22C55E]">
            {securityEvents.filter(e => e.severity === 'Low').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-3">
        <button
          onClick={() => setFilter('all')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
            filter === 'all'
              ? 'bg-[#00C2FF] bg-opacity-20 text-[#00C2FF] border border-[#00C2FF]'
              : 'bg-[#101B2D] text-[#94A3B8] border border-[#1E293B] hover:border-[#00C2FF] hover:text-[#00C2FF]'
          }`}
        >
          <Filter className="w-4 h-4" />
          All Events
        </button>
        <button
          onClick={() => setFilter('Critical')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
            filter === 'Critical'
              ? 'bg-[#EF4444] bg-opacity-20 text-[#EF4444] border border-[#EF4444]'
              : 'bg-[#101B2D] text-[#94A3B8] border border-[#1E293B] hover:border-[#EF4444] hover:text-[#EF4444]'
          }`}
        >
          Critical
        </button>
        <button
          onClick={() => setFilter('High')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
            filter === 'High'
              ? 'bg-[#F59E0B] bg-opacity-20 text-[#F59E0B] border border-[#F59E0B]'
              : 'bg-[#101B2D] text-[#94A3B8] border border-[#1E293B] hover:border-[#F59E0B] hover:text-[#F59E0B]'
          }`}
        >
          High
        </button>
        <button
          onClick={() => setFilter('Low')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
            filter === 'Low'
              ? 'bg-[#22C55E] bg-opacity-20 text-[#22C55E] border border-[#22C55E]'
              : 'bg-[#101B2D] text-[#94A3B8] border border-[#1E293B] hover:border-[#22C55E] hover:text-[#22C55E]'
          }`}
        >
          Normal
        </button>
      </div>

      {/* Events Table */}
      <EventTable events={filteredEvents} />

      {/* Alert Box */}
      <div className="mt-8 bg-[#EF4444] bg-opacity-10 border border-[#EF4444] border-opacity-30 rounded-lg p-6 flex gap-4">
        <AlertCircle className="w-6 h-6 text-[#EF4444] flex-shrink-0 mt-1" />
        <div>
          <h3 className="text-lg font-semibold text-[#EF4444] mb-2">Critical Alert</h3>
          <p className="text-[#F1F5F9]">
            Multiple suspicious activities detected. Investigate case TX-001 immediately for account takeover attempt.
          </p>
        </div>
      </div>
    </div>
  )
}