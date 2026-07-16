import React from 'react'
import { Link } from 'react-router-dom'
import { Activity, AlertTriangle, Clock, Zap } from 'lucide-react'
import DashboardCard from '../components/dashboard/DashboardCard'
import ThreatChart from '../components/dashboard/ThreatChart'
import { dashboardStats, investigationCases, analyticsData } from './dummyData'

export default function Dashboard() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#F1F5F9] mb-2">Security Operations Center</h1>
        <p className="text-[#94A3B8]">Real-time threat monitoring and investigation</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Total Security Events"
          value={dashboardStats.totalSecurityEvents}
          icon={Activity}
          trend="+12.5%"
          trendDirection="up"
          color="cyan"
        />
        <DashboardCard
          title="Active Investigations"
          value={dashboardStats.activeInvestigations}
          icon={Zap}
          trend="+3 today"
          trendDirection="up"
          color="amber"
        />
        <DashboardCard
          title="Critical Threats"
          value={dashboardStats.criticalThreats}
          icon={AlertTriangle}
          trend="-2 resolved"
          trendDirection="down"
          color="red"
        />
        <DashboardCard
          title="Avg Response Time"
          value={dashboardStats.averageResponseTime}
          icon={Clock}
          trend="-18% faster"
          trendDirection="down"
          color="green"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ThreatChart
          data={analyticsData.threatDistribution}
          type="pie"
          title="Threat Distribution"
        />
        <ThreatChart
          data={analyticsData.riskLevels}
          type="bar"
          title="Risk Level Breakdown"
        />
      </div>

      {/* Recent Investigation Cases */}
      <div className="bg-[#101B2D] border border-[#1E293B] rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#F1F5F9]">Recent Investigation Cases</h2>
            <p className="text-[#94A3B8] text-sm mt-1">Latest security incidents requiring attention</p>
          </div>
          <Link
            to="/investigations"
            className="text-[#00C2FF] hover:text-[#0099CC] font-semibold transition-colors"
          >
            View All →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1E293B]">
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#94A3B8]">Case ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#94A3B8]">Threat Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#94A3B8]">Risk Score</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#94A3B8]">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#94A3B8]">Root Cause</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#94A3B8]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E293B]">
              {investigationCases.slice(0, 5).map((caseItem) => (
                <tr key={caseItem.id} className="hover:bg-[#0F1B2E] transition-colors duration-200">
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono text-[#00C2FF] font-semibold">{caseItem.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[#F1F5F9]">{caseItem.threatType}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-[#1E293B] rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            caseItem.riskScore > 80
                              ? 'bg-[#EF4444]'
                              : caseItem.riskScore > 60
                              ? 'bg-[#F59E0B]'
                              : 'bg-[#22C55E]'
                          }`}
                          style={{ width: `${caseItem.riskScore}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-[#F1F5F9]">{caseItem.riskScore}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      caseItem.status === 'Critical'
                        ? 'bg-[#EF4444] bg-opacity-20 text-[#EF4444]'
                        : 'bg-[#F59E0B] bg-opacity-20 text-[#F59E0B]'
                    }`}>
                      {caseItem.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[#94A3B8]">{caseItem.rootCause}</span>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/investigations/${caseItem.id}`}
                      className="text-[#00C2FF] hover:text-[#0099CC] font-semibold transition-colors text-sm"
                    >
                      Investigate →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}