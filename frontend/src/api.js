import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
})

export const getDashboard = () => api.get('/dashboard')
export const getCases = () => api.get('/cases')
export const getCaseDetail = (caseId) => api.get(`/cases/${caseId}`)
export const getEvents = () => api.get('/events')
export const getTransactions = () => api.get('/transactions')
export const getAnalytics = () => api.get('/analytics')
