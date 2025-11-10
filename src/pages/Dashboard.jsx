import { useEffect, useState } from 'react'
import api from '../api/client'
import NavBar from '../components/NavBar'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

export default function Dashboard() {
  const [kpi, setKpi] = useState({ estimated_total:0, logged_total:0, remaining:0 })
  const [summary, setSummary] = useState([])

  useEffect(() => {
    const load = async () => {
      const k = await api.get('/kpi/burndown')
      setKpi(k.data)
      const s = await api.get('/reports/summary')
      setSummary(s.data)
    }
    load().catch(console.error)
  }, [])

  return (
    <div>
      <NavBar />
      <div style={{padding:16}} className="grid grid-3">
        <div className="card">
          <div style={{fontSize:12, color:'#9fb2e7'}}>Horas estimadas</div>
          <div style={{fontSize:28, fontWeight:700}}>{kpi.estimated_total}</div>
          <div className="tag">Acumulado</div>
        </div>
        <div className="card">
          <div style={{fontSize:12, color:'#9fb2e7'}}>Horas registradas</div>
          <div style={{fontSize:28, fontWeight:700}}>{kpi.logged_total}</div>
          <div className="tag">Acumulado</div>
        </div>
        <div className="card">
          <div style={{fontSize:12, color:'#9fb2e7'}}>Restante</div>
          <div style={{fontSize:28, fontWeight:700}}>{kpi.remaining}</div>
          <div className="tag">Burndown</div>
        </div>
        <div className="card kcol" style={{gridColumn: 'span 2'}}>
          <h3 style={{marginTop:0}}>Horas por proyecto</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={summary}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="project" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hours_logged" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card kcol">
          <h3 style={{marginTop:0}}>Tareas completadas</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={summary}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="project" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Area dataKey="tasks_done" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
