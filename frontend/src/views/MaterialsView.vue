<template>
  <div class="container">
    <div class="toolbar">
      <div class="search-box">
        <span>🔍</span>
        <input v-model="search" type="text" placeholder="Rechercher..." />
      </div>
      <select v-model="statusFilter" class="filter-select">
        <option value="">Tous les états</option>
        <option value="Bon">✅ Bon</option>
        <option value="Abîmé">⚠️ Abîmé</option>
        <option value="Mauvais">❌ Mauvais</option>
      </select>
      <button class="btn btn-teal" @click="exportCSV">⬇️ Export CSV</button>
      <router-link to="/ajout" class="btn btn-primary">➕ Ajouter</router-link>
      <div class="result-count">{{ filtered.length }} résultat{{ filtered.length !== 1 ? 's' : '' }}</div>
    </div>

    <MaterialsTable :materials="filtered" :search="search" @edit="editItem" @delete="deleteItem" />

    <EditModal v-model="editOpen" :item="editingItem" @save="saveEdit" />
    <ConfirmModal v-model="deleteOpen" :item="deletingItem" @confirm="confirmDelete" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMaterialsStore } from '../stores/materials'
import { useUiStore } from '../stores/ui'
import MaterialsTable from '../components/MaterialsTable.vue'
import EditModal from '../components/EditModal.vue'
import ConfirmModal from '../components/ConfirmModal.vue'

const materialsStore = useMaterialsStore()
const uiStore = useUiStore()

const search = ref('')
const statusFilter = ref('')
const editOpen = ref(false)
const deleteOpen = ref(false)
const editingItem = ref()
const deletingItem = ref()

const filtered = computed(() => {
  const term = search.value.toLowerCase()
  return materialsStore.materials.filter((m) => {
    const matchSearch =
      !term || m.numero.toLowerCase().includes(term) || m.designation.toLowerCase().includes(term)
    const matchStatus = !statusFilter.value || m.etat === statusFilter.value
    return matchSearch && matchStatus
  })
})

const editItem = (item: any) => {
  editingItem.value = item
  editOpen.value = true
}

const deleteItem = (item: any) => {
  deletingItem.value = item
  deleteOpen.value = true
}

const saveEdit = (item: any) => {
  materialsStore.updateMaterial(item.id, item)
  uiStore.addToast('Matériel modifié avec succès', 'success')
}

const confirmDelete = () => {
  if (deletingItem.value) {
    materialsStore.deleteMaterial(deletingItem.value.id)
    uiStore.addToast('Matériel supprimé avec succès', 'success')
  }
}

const exportCSV = () => {
  const headers = ['N° Matériel', 'Désignation', 'État', 'Quantité', 'Date']
  const rows = filtered.value.map((m) => [m.numero, m.designation, m.etat, m.quantite, m.date])
  const csv = [headers, ...rows].map((r) => r.join(',')).join('\n')
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'materiels.csv'
  link.click()
  uiStore.addToast('Export CSV téléchargé', 'info')
}
</script>

<style scoped>
.container {
  padding: 28px;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  padding: 8px 12px;
  width: 240px;
}

.search-box input {
  border: none;
  outline: none;
  font-family: inherit;
  font-size: 13px;
  width: 100%;
  color: #0f172a;
}

.search-box input::placeholder {
  color: #94a3b8;
}

.filter-select {
  padding: 8px 32px 8px 12px;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  font-family: inherit;
  font-size: 13px;
  color: #0f172a;
  background: #fff;
  outline: none;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2394A3B8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
}

.filter-select:focus {
  border-color: #3b82f6;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 9px 18px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 13.5px;
  font-weight: 600;
  transition: 0.15s;
  text-decoration: none;
}

.btn-primary {
  background: #3b82f6;
  color: #fff;
}

.btn-primary:hover {
  background: #1d4ed8;
}

.btn-teal {
  background: #14b8a6;
  color: #fff;
}

.btn-teal:hover {
  background: #0f766e;
}

.result-count {
  font-size: 12px;
  color: #94a3b8;
  margin-left: auto;
}

@media (max-width: 560px) {
  .container {
    padding: 16px;
  }

  .search-box {
    width: 100%;
  }
}
</style>