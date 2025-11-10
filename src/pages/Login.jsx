import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth'

export default function Login() {
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('admin123')
  const [err, setErr] = useState(null)
  const navigate = useNavigate()
  const { login, me } = useAuth()

  const onSubmit = async (e) => {
    e.preventDefault()
    setErr(null)
    try {
      await login(email, password)
      await me()
      navigate('/')
    } catch (e) {
      setErr(e?.response?.data?.error || 'Error de autenticación')
    }
  }

  return (
    <div style={{display:'grid',placeItems:'center',height:'100%'}}>
      <div className="card" style={{width: 380}}>
        <h2>Ingresar</h2>
        <p style={{color:'#9fb2e7'}}>Usa las credenciales de tu base de datos seeds (seed.py) o crea usuario por API.</p>
        {err && <p style={{color:'#ef4444'}}>{err}</p>}
        <form onSubmit={onSubmit} className="grid">
          <div>
            <label>Email</label>
            <input className="input" value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
          <div>
            <label>Contraseña</label>
            <input type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} />
          </div>
          <button className="btn" type="submit">Entrar</button>
        </form>
      </div>
    </div>
  )
}
