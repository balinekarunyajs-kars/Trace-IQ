import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar'
import Navbar from './components/layout/Navbar'
import Dashboard from './pages/Dashboard'
import Investigations from './pages/Investigations'
import SecurityEvents from './pages/SecurityEvents'
import Transactions from './pages/Transactions'
import Analytics from './pages/Analytics'

function AppContent() {
  return (
    <div className="flex min-h-screen bg-[#06111b] text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Navbar />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/investigations" element={<Investigations />} />
            <Route path="/investigations/:id" element={<Investigations />} />
            <Route path="/security-events" element={<SecurityEvents />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}