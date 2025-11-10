import { useEffect, useState } from 'react'
import api from '../api/client'
import NavBar from '../components/NavBar'

export default function Sprints() {
  const [items, setItems] = useState([])
  const [projects, setProjects] = useState([])
  const [form, setForm] = useState({ name:'', objective:'', status:'planned', project_id:null })

  const load = async () => {
    const [s, p] = await Promise.all([api.get('/sprints'), api.get('/projects')])
    setItems(s.data)
    setProjects(p.data)
  }
  useEffect(()=>{ load().catch(console.error) }, [])

  const create = async () => {
    await api.post('/sprints', form)
    setForm({ name:'', objective:'', status:'planned', project_id: projects[0]?.id || null })
    await load()
  }

  return (
    <div>
      <NavBar />
      <div style={{padding:16}} className="grid grid-2">
        <div className="card">
          <h3 style={{marginTop:0}}>Nuevo sprint</h3>
          <div className="grid">
            <input className="input" placeholder="Nombre" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
            <textarea className="input" placeholder="Objetivo" value={form.objective} onChange={e=>setForm({...form, objective:e.target.value})} />
            <select className="input" value={form.status} onChange={e=>setForm({...form, status:e.target.value})}>
              <option value="planned">Planeado</option>
              <option value="active">Activo</option>
              <option value="done">Completado</option>
            </select>
            <select className="input" value={form.project_id||''} onChange={e=>setForm({...form, project_id:Number(e.target.value)})}>
              <option value="">Proyecto</option>
              {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            <button className="btn" onClick={create}>Crear</button>
          </div>
        </div>
        <div className="card">
          <h3 style={{marginTop:0}}>Sprints</h3>
          <table className="table">
            <thead><tr><th>Nombre</th><th>Estado</th><th>Proyecto</th></tr></thead>
            <tbody>
            {items.map(s => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td><span className="tag">{s.status}</span></td>
                <td>{s.project_id}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
