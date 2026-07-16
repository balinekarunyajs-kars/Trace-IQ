import React, { useState } from 'react'
import { Search, ArrowUpRight } from 'lucide-react'
import { transactions } from '../data/dummyData'

export default function Transactions() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredTransactions = transactions.filter(tx =>
    tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'HIGH':
        return 'bg-[#EF4444] bg-opacity-20 text-[#EF4444]'
      case 'MEDIUM':
        return 'bg-[#F59E0B] bg-opacity-20 text-[#F59E0B]'
      case 'LOW':
        return 'bg-[#22C55E] bg-opacity-20 text-[#22C55E]'
      default:
        return 'bg-[#64748B] bg-opacity-20 text-[#64748B]'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Unauthorized':
        return 'text-[#EF4444]'
      case 'Flagged':
        return 'text-[#F59E0B]'
      case 'Completed':
        return 'text-[#22C55E]'
      case 'Pending':
        return 'text-[#00C2FF]'
      default:
        return 'text-[#94A3B8]'
    }
  }

  const getTotalAmount = () => {
    return transactions.reduce((sum, tx) => sum + tx.amount, 0)
  }

  const getHighRiskCount = () => {
    return transactions.filter(tx => tx.riskLevel === 'HIGH').length
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#F1F5F9] mb-2">Banking Transactions</h1>
        <p className="text-[#94A3B8]">Monitor and analyze suspicious transaction patterns</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#101B2D] border border-[#1E293B] rounded-lg p-6">
          <p className="text-[#94A3B8] text-sm mb-2">Total Transactions</p>
          <p className="text-3xl font-bold text-[#F1F5F9]">{transactions.length}</p>
        </div>
        <div className="bg-[#101B2D] border border-[#1E293B] rounded-lg p-6">
          <p className="text-[#94A3B8] text-sm mb-2">Total Amount</p>
          <p className="text-2xl font-bold text-[#00C2FF]">₹{(getTotalAmount() / 100000).toFixed(2)}L</p>
        </div>
        <div className="bg-[#101B2D] border border-[#1E293B] rounded-lg p-6">
          <p className="text-[#94A3B8] text-sm mb-2">High Risk</p>
          <p className="text-3xl font-bold text-[#EF4444]">{getHighRiskCount()}</p>
        </div>
        <div className="bg-[#101B2D] border border-[#1E293B] rounded-lg p-6">
          <p className="text-[#94A3B8] text-sm mb-2">Flagged</p>
          <p className="text-3xl font-bold text-[#F59E0B]">
            {transactions.filter(tx => tx.status === 'Flagged').length}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by Transaction ID, User, or Location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#101B2D] text-[#F1F5F9] placeholder-[#64748B] rounded-lg px-6 py-3 pl-12 border border-[#1E293B] focus:outline-none focus:border-[#00C2FF] focus:ring-1 focus:ring-[#00C2FF] transition-all"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#64748B]" />
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-[#101B2D] border border-[#1E293B] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1E293B] bg-[#08111F]">
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#94A3B8]">Transaction ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#94A3B8]">User</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#94A3B8]">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#94A3B8]">Location</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#94A3B8]">Risk Level</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#94A3B8]">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#94A3B8]">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E293B]">
              {filteredTransactions.map((tx) => (
                <tr
                  key={tx.id}
                  className={`hover:bg-[#0F1B2E] transition-colors duration-200 group ${
                    tx.riskLevel === 'HIGH' ? 'bg-[#EF4444] bg-opacity-5' : ''
                  }`}
                >
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono text-[#00C2FF] font-semibold">{tx.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[#F1F5F9]">{tx.user}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-[#F1F5F9]">{tx.currency}{(tx.amount / 100000).toFixed(2)}L</span>
                      <ArrowUpRight className="w-4 h-4 text-[#EF4444]" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[#F1F5F9]">{tx.location}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRiskColor(tx.riskLevel)}`}>
                      {tx.riskLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-semibold ${getStatusColor(tx.status)}`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[#94A3B8]">{tx.timestamp}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredTransactions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#94A3B8] text-lg">No transactions found matching your search.</p>
        </div>
      )}
    </div>
  )
}