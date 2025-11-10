import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Tasks from './pages/Tasks'
import Sprints from './pages/Sprints'
import Reports from './pages/Reports'
import TimeLogs from './pages/TimeLogs'
import { useAuth } from './store/auth'
import { useEffect } from 'react'

export default function App() {
  const { token, me } = useAuth()
  useEffect(()=>{ if (token) me().catch(()=>{}) },[token])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
        <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
        <Route path="/sprints" element={<ProtectedRoute><Sprints /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
        <Route path="/time" element={<ProtectedRoute><TimeLogs /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}
