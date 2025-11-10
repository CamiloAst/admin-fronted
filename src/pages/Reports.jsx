import { useEffect, useState } from 'react'
import api from '../api/client'
import NavBar from '../components/NavBar'

export default function Reports() {
  const [items, setItems] = useState([])
  useEffect(()=>{
    api.get('/reports/summary').then(r=>setItems(r.data)).catch(console.error)
  },[])

  return (
    <div>
      <NavBar />
      <div style={{padding:16}} className="card">
        <h3 style={{marginTop:0}}>Resumen</h3>
        <table className="table">
          <thead><tr><th>Proyecto</th><th>Horas</th><th>Tareas completadas</th></tr></thead>
          <tbody>
          {items.map((r,i)=>(
            <tr key={i}>
              <td>{r.project}</td>
              <td>{r.hours_logged}</td>
              <td>{r.tasks_done}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
