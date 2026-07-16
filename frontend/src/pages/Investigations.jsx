import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle, AlertCircle, Zap } from 'lucide-react'
import Timeline from '../components/dashboard/Timeline'
import { investigationCases, caseDetails } from '../data/dummyData'

export default function Investigations() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [selectedCase, setSelectedCase] = useState(id || 'TX-001')

  const caseData = caseDetails[selectedCase]

  if (!caseData && !id) {
    return (
      <div className="p-8">
        <h1 className="text-4xl font-bold text-[#F1F5F9] mb-8">Investigation Cases</h1>

        <div className="grid grid-cols-1 gap-6">
          {investigationCases.map((caseItem) => (
            <div
              key={caseItem.id}
              onClick={() => {
                setSelectedCase(caseItem.id)
                navigate(`/investigations/${caseItem.id}`)
              }}
              className="bg-[#101B2D] border border-[#1E293B] rounded-lg p-6 hover:border-[#00C2FF] hover:shadow-lg hover:shadow-[#00C2FF]/20 cursor-pointer transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-[#00C2FF] font-mono text-sm mb-2">{caseItem.id}</p>
                  <h3 className="text-xl font-bold text-[#F1F5F9]">{caseItem.threatType}</h3>
                </div>
                <span className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                  caseItem.status === 'Critical'
                    ? 'bg-[#EF4444] bg-opacity-20 text-[#EF4444]'
                    : 'bg-[#F59E0B] bg-opacity-20 text-[#F59E0B]'
                }`}>
                  {caseItem.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-[#94A3B8] text-sm mb-1">Risk Score</p>
                  <p className="text-2xl font-bold text-[#F1F5F9]">{caseItem.riskScore}%</p>
                </div>
                <div>
                  <p className="text-[#94A3B8] text-sm mb-1">Affected User</p>
                  <p className="text-lg font-semibold text-[#F1F5F9]">{caseItem.user}</p>
                </div>
                <div>
                  <p className="text-[#94A3B8] text-sm mb-1">Root Cause</p>
                  <p className="text-sm text-[#00C2FF] font-semibold">{caseItem.rootCause}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!caseData) {
    return (
      <div className="p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#F1F5F9] mb-4">Case Not Found</h1>
          <Link to="/investigations" className="text-[#00C2FF] hover:text-[#0099CC]">
            ← Back to Cases
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      {/* Header */}
      <button
        onClick={() => navigate('/investigations')}
        className="flex items-center gap-2 text-[#00C2FF] hover:text-[#0099CC] mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Cases</span>
      </button>

      {/* Main Investigation Card */}
      <div className="bg-gradient-to-br from-[#101B2D] to-[#0F1B2E] border border-[#1E293B] rounded-lg p-8 mb-8">
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-[#00C2FF] font-mono text-sm mb-2">Investigation ID</p>
            <h1 className="text-4xl font-bold text-[#F1F5F9] mb-2">{caseData.investigationId}</h1>
            <p className="text-[#94A3B8]">{caseData.threat}</p>
          </div>
          <div className="text-right">
            <p className="text-[#94A3B8] text-sm mb-4">Risk Score</p>
            <div className="text-5xl font-bold text-[#EF4444]">{caseData.riskScore}%</div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="bg-[#08111F] rounded-lg p-4">
            <p className="text-[#94A3B8] text-sm mb-2">Status</p>
            <p className="text-lg font-bold text-[#F1F5F9]">{caseData.status}</p>
          </div>
          <div className="bg-[#08111F] rounded-lg p-4">
            <p className="text-[#94A3B8] text-sm mb-2">Root Cause</p>
            <p className="text-sm font-semibold text-[#00C2FF]">{caseData.rootCause}</p>
          </div>
          <div className="bg-[#08111F] rounded-lg p-4">
            <p className="text-[#94A3B8] text-sm mb-2">Affected User</p>
            <p className="text-lg font-bold text-[#F1F5F9]">{caseData.affectedUser}</p>
          </div>
          <div className="bg-[#08111F] rounded-lg p-4">
            <p className="text-[#94A3B8] text-sm mb-2">Severity</p>
            <p className="text-lg font-bold text-[#EF4444]">{caseData.severity}</p>
          </div>
        </div>
      </div>

      {/* Evidence Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#F1F5F9] mb-4">Evidence Collection</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caseData.evidence.map((evidence) => (
            <div
              key={evidence.id}
              className="bg-[#101B2D] border border-[#1E293B] rounded-lg p-6 hover:border-[#00C2FF] hover:shadow-lg hover:shadow-[#00C2FF]/20 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-[#00C2FF] font-semibold mb-1">{evidence.type}</p>
                  <p className="text-[#F1F5F9] text-sm">{evidence.description}</p>
                </div>
                <AlertCircle className="w-5 h-5 text-[#EF4444] flex-shrink-0 ml-4" />
              </div>
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  evidence.severity === 'Critical'
                    ? 'bg-[#EF4444] bg-opacity-20 text-[#EF4444]'
                    : 'bg-[#F59E0B] bg-opacity-20 text-[#F59E0B]'
                }`}>
                  {evidence.severity}
                </span>
                <span className="text-[#94A3B8] text-xs">{evidence.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-8">
        <Timeline events={caseData.attackTimeline} />
      </div>

      {/* Recommended Actions */}
      <div className="bg-[#101B2D] border border-[#1E293B] rounded-lg p-6">
        <h2 className="text-2xl font-bold text-[#F1F5F9] mb-6">Recommended Actions</h2>
        <div className="space-y-4">
          {caseData.recommendedActions.map((action) => (
            <div
              key={action.id}
              className="bg-[#08111F] border border-[#1E293B] rounded-lg p-4 hover:border-[#00C2FF] transition-colors duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-[#F1F5F9] mb-2">{action.action}</h4>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      action.priority === 'Critical'
                        ? 'bg-[#EF4444] bg-opacity-20 text-[#EF4444]'
                        : action.priority === 'High'
                        ? 'bg-[#F59E0B] bg-opacity-20 text-[#F59E0B]'
                        : 'bg-[#22C55E] bg-opacity-20 text-[#22C55E]'
                    }`}>
                      {action.priority} Priority
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      action.status === 'Completed'
                        ? 'bg-[#22C55E] bg-opacity-20 text-[#22C55E]'
                        : action.status === 'In Progress'
                        ? 'bg-[#00C2FF] bg-opacity-20 text-[#00C2FF]'
                        : 'bg-[#F59E0B] bg-opacity-20 text-[#F59E0B]'
                    }`}>
                      {action.status}
                    </span>
                  </div>
                </div>
                <button className="bg-[#00C2FF] hover:bg-[#0099CC] text-[#08111F] font-semibold px-6 py-2 rounded-lg transition-colors duration-300">
                  Execute
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}