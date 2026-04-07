import { defineStore } from 'pinia'

export type Material = {
  id: number
  numero: string
  designation: string
  etat: 'Bon' | 'Abîmé' | 'Mauvais'
  quantite: number
  date: string
}

const MOCK_MATERIALS: Material[] = [
  { id: 1, numero: 'MAT-001', designation: 'Ordinateur portable Dell', etat: 'Bon', quantite: 5, date: '2024-01-15' },
  { id: 2, numero: 'MAT-002', designation: 'Projecteur Epson', etat: 'Bon', quantite: 2, date: '2024-01-18' },
  { id: 3, numero: 'MAT-003', designation: 'Chaise de bureau ergonomique', etat: 'Abîmé', quantite: 12, date: '2024-01-20' },
  { id: 4, numero: 'MAT-004', designation: 'Table de réunion', etat: 'Bon', quantite: 3, date: '2024-02-01' },
  { id: 5, numero: 'MAT-005', designation: 'Imprimante HP LaserJet', etat: 'Mauvais', quantite: 1, date: '2024-02-05' },
  { id: 6, numero: 'MAT-006', designation: 'Scanner Fujitsu', etat: 'Bon', quantite: 2, date: '2024-02-08' },
  { id: 7, numero: 'MAT-007', designation: 'Tableau blanc magnétique', etat: 'Abîmé', quantite: 4, date: '2024-02-10' },
  { id: 8, numero: 'MAT-008', designation: 'Câble HDMI 5m', etat: 'Bon', quantite: 10, date: '2024-02-12' },
  { id: 9, numero: 'MAT-009', designation: 'Disque dur externe 1To', etat: 'Mauvais', quantite: 3, date: '2024-02-15' },
  { id: 10, numero: 'MAT-010', designation: 'Clé USB 32Go', etat: 'Bon', quantite: 15, date: '2024-02-18' },
  { id: 11, numero: 'MAT-011', designation: 'Souris sans fil Logitech', etat: 'Bon', quantite: 8, date: '2024-02-20' },
  { id: 12, numero: 'MAT-012', designation: 'Clavier mécanique', etat: 'Abîmé', quantite: 6, date: '2024-02-22' },
  { id: 13, numero: 'MAT-013', designation: 'Moniteur 27 pouces', etat: 'Bon', quantite: 4, date: '2024-03-01' },
  { id: 14, numero: 'MAT-014', designation: 'Routeur WiFi', etat: 'Mauvais', quantite: 1, date: '2024-03-05' },
  { id: 15, numero: 'MAT-015', designation: 'Switch réseau 8 ports', etat: 'Bon', quantite: 2, date: '2024-03-08' },
]

export const useMaterialsStore = defineStore('materials', {
  state: () => ({
    materials: [...MOCK_MATERIALS] as Material[],
    loading: false,
    nextId: 16,
  }),
  actions: {
    addMaterial(material: Omit<Material, 'id'>) {
      const id = this.nextId++
      const newMaterial: Material = { id, ...material }
      this.materials.unshift(newMaterial)
      return newMaterial
    },
    updateMaterial(id: number, updates: Partial<Material>) {
      const index = this.materials.findIndex((m) => m.id === id)
      if (index !== -1) {
        this.materials[index] = { ...this.materials[index], ...updates }
      }
    },
    deleteMaterial(id: number) {
      this.materials = this.materials.filter((m) => m.id !== id)
    },
    getMaterial(id: number) {
      return this.materials.find((m) => m.id === id)
    },
  },
  getters: {
    getStats: (state) => {
      const bon = state.materials.filter((m) => m.etat === 'Bon').length
      const abime = state.materials.filter((m) => m.etat === 'Abîmé').length
      const mauvais = state.materials.filter((m) => m.etat === 'Mauvais').length
      return {
        total: state.materials.length,
        bon,
        abime,
        mauvais,
      }
    },
  },
})
