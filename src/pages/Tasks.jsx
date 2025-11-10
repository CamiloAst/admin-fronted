import { useEffect, useMemo, useState } from 'react'
import api from '../api/client'
import NavBar from '../components/NavBar'

const columns = ['todo','in_progress','done']

export default function Tasks() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ name:'', description:'', priority:'medium', state_kanban:'todo', project_id:null, estimated_hours:0 })
  const [projects, setProjects] = useState([])

  const load = async () => {
    const [t, p] = await Promise.all([api.get('/tasks'), api.get('/projects')])
    setItems(t.data)
    setProjects(p.data)
  }
  useEffect(()=>{ load().catch(console.error) }, [])

  const create = async () => {
    await api.post('/tasks', form)
    setForm({ name:'', description:'', priority:'medium', state_kanban:'todo', project_id: projects[0]?.id || null, estimated_hours:0 })
    await load()
  }

  const move = async (id, to) => {
    try {
      await api.post(`/tasks/${id}/move`, { state_kanban: to })
      await load()
    } catch (e) {
      // fallback: update via PUT if /move is not available
      await api.put(`/tasks/${id}`, { state_kanban: to })
      await load()
    }
  }

  const byCol = useMemo(() => {
    const g = { todo:[], in_progress:[], done:[] }
    for (const t of items) g[t.state_kanban||'todo'].push(t)
    return g
  }, [items])

  return (
    <div>
      <NavBar />
      <div style={{padding:16}} className="grid">
        <div className="card">
          <h3 style={{marginTop:0}}>Nueva tarea</h3>
          <div className="grid grid-3">
            <input className="input" placeholder="Nombre" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
            <select className="input" value={form.project_id||''} onChange={e=>setForm({...form, project_id:Number(e.target.value)})}>
              <option value="">Proyecto</option>
              {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            <select className="input" value={form.priority} onChange={e=>setForm({...form, priority:e.target.value})}>
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
            <textarea className="input" placeholder="Descripción" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
            <input className="input" type="number" placeholder="Horas estimadas" value={form.estimated_hours} onChange={e=>setForm({...form, estimated_hours:Number(e.target.value)})} />
            <button className="btn" onClick={create}>Crear</button>
          </div>
        </div>
        <div className="grid grid-3">
          {columns.map(c => (
            <div key={c} className="card">
              <h3 style={{marginTop:0, textTransform:'capitalize'}}>{c.replace('_',' ')}</h3>
              <div style={{display:'grid', gap:10}}>
                {byCol[c].map(t => (
                  <div key={t.id} className="card" style={{background:'#0b1226', borderColor:'#24335f'}}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                      <div style={{fontWeight:600}}>{t.name}</div>
                      <span className="tag">{t.priority}</span>
                    </div>
                    <div style={{fontSize:13, color:'#9fb2e7'}}>{t.description}</div>
                    <div style={{display:'flex', gap:8}}>
                      {columns.filter(x=>x!==c).map(next => (
                        <button className="btn" key={next} onClick={()=>move(t.id, next)}>Mover a {next.replace('_',' ')}</button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
