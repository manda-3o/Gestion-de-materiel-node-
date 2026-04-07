<template>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th @click="sort('numero')" style="cursor: pointer">N° Matériel ↕</th>
          <th @click="sort('designation')" style="cursor: pointer">Désignation ↕</th>
          <th>État</th>
          <th>Quantité</th>
          <th @click="sort('date')" style="cursor: pointer">Date ajout ↕</th>
          <th style="width: 120px">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="material in paged" :key="material.id" class="table-row">
          <td><span class="numero-badge">{{ material.numero }}</span></td>
          <td>{{ material.designation }}</td>
          <td><span :class="['badge', `badge-${getEtatClass(material.etat)}`]">{{ material.etat }}</span></td>
          <td><span style="font-weight: 600">{{ material.quantite }}</span></td>
          <td style="color: #94a3b8">{{ formatDate(material.date) }}</td>
          <td>
            <div class="col-actions">
              <button class="btn btn-sm btn-secondary" @click="$emit('edit', material)" title="Modifier">✏️</button>
              <button class="btn btn-sm btn-danger" @click="$emit('delete', material)" title="Supprimer">🗑️</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="filtered.length === 0" class="empty-state">
      <div class="empty-icon">📭</div>
      <h3>Aucun matériel trouvé</h3>
      <p>Essayez d'autres critères de recherche</p>
    </div>
  </div>

  <div v-if="totalPages > 1" class="pagination">
    <button v-if="currentPage > 1" class="page-btn" @click="currentPage--">‹</button>
    <button
      v-for="page in visiblePages"
      :key="page"
      class="page-btn"
      :class="{ active: page === currentPage }"
      @click="currentPage = page"
    >
      {{ page }}
    </button>
    <button v-if="currentPage < totalPages" class="page-btn" @click="currentPage++">›</button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Material } from '../stores/materials'

const props = defineProps<{
  materials: Material[]
  search: string
}>()

const emit = defineEmits<{
  edit: [material: Material]
  delete: [material: Material]
}>()

const currentPage = ref(1)
const itemsPerPage = 8
const sortKey = ref<keyof Material>('numero')
const sortDir = ref(1)

const sort = (key: keyof Material) => {
  if (sortKey.value === key) {
    sortDir.value *= -1
  } else {
    sortKey.value = key
    sortDir.value = 1
  }
}

const filtered = computed(() => {
  const term = props.search.toLowerCase().trim()
  const matched = props.materials.filter((item) => {
    if (!term) return true
    return (
      item.numero.toLowerCase().includes(term) ||
      item.designation.toLowerCase().includes(term) ||
      item.etat.toLowerCase().includes(term)
    )
  })

  return matched.sort((a, b) => {
    const aVal = a[sortKey.value]
    const bVal = b[sortKey.value]
    if (aVal < bVal) return sortDir.value * -1
    if (aVal > bVal) return sortDir.value
    return 0
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / itemsPerPage)))

const paged = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filtered.value.slice(start, start + itemsPerPage)
})

const visiblePages = computed(() => {
  const pages: number[] = []
  const maxVisible = 5
  let startPage = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let endPage = Math.min(totalPages.value, startPage + maxVisible - 1)

  if (endPage - startPage < maxVisible - 1) {
    startPage = Math.max(1, endPage - maxVisible + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }
  return pages
})

const getEtatClass = (etat: string) => {
  const map: Record<string, string> = {
    Bon: 'bon',
    Abîmé: 'abime',
    Mauvais: 'mauvais',
  }
  return map[etat] || ''
}

const formatDate = (date: string) => {
  const dt = new Date(date)
  return dt.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
}
</script>

<style scoped>
.table-wrap {
  overflow-x: auto;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead th {
  background: #f8fafc;
  padding: 12px 16px;
  text-align: left;
  font-size: 11.5px;
  font-weight: 600;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #e2e8f0;
  white-space: nowrap;
}

.table-row {
  border-bottom: 1px solid #e2e8f0;
  transition: 0.12s;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row:hover {
  background: #eff6ff;
}

tbody td {
  padding: 14px 16px;
  font-size: 13.5px;
  color: #475569;
  vertical-align: middle;
}

tbody td:first-child {
  color: #0f172a;
  font-weight: 500;
}

.numero-badge {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 12px;
  background: #f0f4ff;
  padding: 3px 8px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  color: #3b82f6;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  border-radius: 99px;
  font-size: 11.5px;
  font-weight: 600;
}

.badge::before {
  content: '';
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
}

.badge-bon {
  background: #d1fae5;
  color: #065f46;
}

.badge-abime {
  background: #fef3c7;
  color: #92400e;
}

.badge-mauvais {
  background: #fee2e2;
  color: #991b1b;
}

.col-actions {
  display: flex;
  gap: 6px;
  align-items: center;
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
}

.btn-sm {
  padding: 6px 12px;
  font-size: 12px;
}

.btn-secondary {
  background: #fff;
  color: #475569;
  border: 1px solid #e2e8f0;
}

.btn-secondary:hover {
  background: #f0f4ff;
  border-color: #cbd5e1;
}

.btn-danger {
  background: #fee2e2;
  color: #ef4444;
}

.btn-danger:hover {
  background: #fecaca;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #94a3b8;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.empty-state h3 {
  font-size: 16px;
  font-weight: 600;
  color: #475569;
  margin-bottom: 6px;
}

.pagination {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 16px;
  justify-content: flex-end;
}

.page-btn {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 500;
  color: #475569;
  transition: 0.15s;
}

.page-btn:hover {
  background: #f0f4ff;
  border-color: #cbd5e1;
}

.page-btn.active {
  background: #3b82f6;
  color: #fff;
  border-color: #3b82f6;
}
</style>
