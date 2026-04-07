import { defineStore } from 'pinia'

type Material = {
  id?: number | string
  name: string
  category: string
  quantity: number
  status: string
}

export const useStatsStore = defineStore('stats', {
  state: () => ({
    materials: [] as Material[],
  }),
  getters: {
    total: (state) => state.materials.length,
    bon: (state) => state.materials.filter((m) => m.status === 'Bon').length,
    mauvais: (state) => state.materials.filter((m) => m.status === 'Mauvais').length,
    abime: (state) => state.materials.filter((m) => m.status === 'Abîmé').length,
    inStock: (state) => state.materials.filter((m) => m.status === 'Bon').length,
    inMaintenance: (state) => state.materials.filter((m) => m.status === 'En maintenance').length,
    categoriesLabels: (state) => [...new Set(state.materials.map((m) => m.category))],
    categoryValues: (state) => {
      const map = new Map<string, number>()
      state.materials.forEach((m) => map.set(m.category, (map.get(m.category) ?? 0) + 1))
      return Array.from(map.values())
    },
    statusLabels: (state) => [...new Set(state.materials.map((m) => m.status))],
    statusValues: (state) => {
      const map = new Map<string, number>()
      state.materials.forEach((m) => map.set(m.status, (map.get(m.status) ?? 0) + 1))
      return Array.from(map.values())
    },
  },
  actions: {
    setMaterials(materials: Material[]) {
      this.materials = materials
    },
  },
})
