import { defineStore } from 'pinia'

export type Toast = {
  id: string | number
  message: string
  type: 'success' | 'error' | 'info' | 'warn'
}

export const useUiStore = defineStore('ui', {
  state: () => ({
    toasts: [] as Toast[],
    search: '',
    sidebarOpen: false,
  }),
  actions: {
    addToast(message: string, type: Toast['type'] = 'info') {
      const id = Date.now()
      this.toasts.push({ id, message, type })
      setTimeout(() => this.removeToast(id), 3500)
    },
    removeToast(id: string | number) {
      this.toasts = this.toasts.filter((t) => t.id !== id)
    },
    setSearch(value: string) {
      this.search = value
    },
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen
    },
    closeSidebar() {
      this.sidebarOpen = false
    },
  },
})
