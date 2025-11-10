import { create } from 'zustand'
import api from '../api/client'

export const useAuth = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  async login(email, password) {
    const { data } = await api.post('/auth/login', { email, password })
    localStorage.setItem('token', data.access_token)
    set({ token: data.access_token, user: data.user })
  },
  async me() {
    const { data } = await api.get('/auth/me')
    set({ user: data })
  },
  logout() {
    localStorage.removeItem('token')
    set({ user: null, token: null })
  }
}))
