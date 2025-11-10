import { useEffect, useState } from 'react'
import api from '../api/client'
import NavBar from '../components/NavBar'

export default function Projects() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ name:'', description:'', status:'active' })
  const [editing, setEditing] = useState(null)

  const load = async () => {
    const { data } = await api.get('/projects')
    setItems(data)
  }

  useEffect(() => { load().catch(console.error) }, [])

  const save = async () => {
    if (editing) {
      await api.put(`/projects/${editing}`, form)
    } else {
      await api.post('/projects', form)
    }
    setForm({ name:'', description:'', status:'active' })
    setEditing(null)
    await load()
  }

  const edit = (p) => {
    setForm({ name:p.name, description:p.description, status:p.status, owner_id:p.owner_id })
    setEditing(p.id)
  }

  const del = async (id) => {
    if (!confirm('Eliminar proyecto?')) return
    await api.delete(`/projects/${id}`)
    await load()
  }

  return (
    <div>
      <NavBar />
      <div style={{padding:16}} className="grid grid-2">
        <div className="card">
          <h3 style={{marginTop:0}}>{editing ? 'Editar proyecto' : 'Nuevo proyecto'}</h3>
          <div className="grid">
            <input className="input" placeholder="Nombre" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
            <textarea className="input" placeholder="Descripción" value={form.description||''} onChange={e=>setForm({...form, description:e.target.value})} />
            <select className="input" value={form.status} onChange={e=>setForm({...form, status:e.target.value})}>
              <option value="active">Activo</option>
              <option value="paused">Pausado</option>
              <option value="finished">Finalizado</option>
            </select>
            <button className="btn" onClick={save}>{editing ? 'Guardar cambios' : 'Crear'}</button>
          </div>
        </div>
        <div className="card">
          <h3 style={{marginTop:0}}>Proyectos</h3>
          <table className="table">
            <thead><tr><th>Nombre</th><th>Estado</th><th>Owner</th><th></th></tr></thead>
            <tbody>
              {items.map(p => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td><span className="tag">{p.status}</span></td>
                  <td>{p.owner_id}</td>
                  <td style={{display:'flex', gap:8}}>
                    <button className="btn" onClick={()=>edit(p)}>Editar</button>
                    <button className="btn" onClick={()=>del(p.id)}>Eliminar</button>
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
