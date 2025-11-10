import { useEffect, useState } from 'react'
import api from '../api/client'
import NavBar from '../components/NavBar'

export default function TimeLogs() {
  const [items, setItems] = useState([])
  const [tasks, setTasks] = useState([])
  const [form, setForm] = useState({ hours_logged: 1, description:'', task_id: null })

  const load = async () => {
    const [tl, t] = await Promise.all([api.get('/time'), api.get('/tasks')])
    setItems(tl.data)
    setTasks(t.data)
  }
  useEffect(()=>{ load().catch(console.error) }, [])

  const create = async () => {
    await api.post('/time', form)
    setForm({ hours_logged: 1, description:'', task_id: tasks[0]?.id || null })
    await load()
  }

  return (
    <div>
      <NavBar />
      <div style={{padding:16}} className="grid grid-2">
        <div className="card">
          <h3 style={{marginTop:0}}>Registrar tiempo</h3>
          <div className="grid">
            <input className="input" type="number" min="0" step="0.5" value={form.hours_logged} onChange={e=>setForm({...form, hours_logged:Number(e.target.value)})} />
            <textarea className="input" placeholder="Descripción" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
            <select className="input" value={form.task_id||''} onChange={e=>setForm({...form, task_id:Number(e.target.value)})}>
              <option value="">Tarea</option>
              {tasks.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
            <button className="btn" onClick={create}>Guardar</button>
          </div>
        </div>
        <div className="card">
          <h3 style={{marginTop:0}}>Registros</h3>
          <table className="table">
            <thead><tr><th>Fecha</th><th>Horas</th><th>Tarea</th><th>Usuario</th></tr></thead>
            <tbody>
            {items.map(i => (
              <tr key={i.id}>
                <td>{new Date(i.date).toLocaleString()}</td>
                <td>{i.hours}</td>
                <td>{i.task_id}</td>
                <td>{i.user_id}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
