import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth'

export default function NavBar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  return (
    <div className="navbar">
      <div style={{fontWeight:700}}>Gestión Proyectos</div>
      <NavLink className={({isActive}) => 'navlink' + (isActive?' active':'')} to="/">Dashboard</NavLink>
      <NavLink className={({isActive}) => 'navlink' + (isActive?' active':'')} to="/projects">Proyectos</NavLink>
      <NavLink className={({isActive}) => 'navlink' + (isActive?' active':'')} to="/tasks">Tareas</NavLink>
      <NavLink className={({isActive}) => 'navlink' + (isActive?' active':'')} to="/sprints">Sprints</NavLink>
      <NavLink className={({isActive}) => 'navlink' + (isActive?' active':'')} to="/reports">Reportes</NavLink>
      <NavLink className={({isActive}) => 'navlink' + (isActive?' active':'')} to="/time">Horas</NavLink>
      <div className="right">
        {user && <span className="pill">{user.username} • {user.role}</span>}
        <button className="btn" onClick={() => { logout(); navigate('/login') }}>Salir</button>
      </div>
    </div>
  )
}
