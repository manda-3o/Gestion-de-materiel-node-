import { defineStore } from 'pinia'

type User = { name: string; email: string; role: string }

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user') || 'null') as User | null,
  }),
  actions: {
    login(email: string, password: string) {
      // Mock auth : manda@gmail.com / admin123
      if (email === 'manda@gmail.com' && password === 'admin123') {
        const token = 'mock-token-' + Date.now()
        const user: User = {
          name: 'Manda Admin',
          email: 'manda@gmail.com',
          role: 'Administrateur',
        }
        this.token = token
        this.user = user
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        return
      }
      throw new Error('Identifiants invalides')
    },
    logout() {
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
})
