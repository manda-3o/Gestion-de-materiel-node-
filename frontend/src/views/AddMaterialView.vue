<template>
  <div class="container">
    <div style="max-width: 640px; margin: 0 auto">
      <div class="card">
        <div style="margin-bottom: 24px">
          <div class="card-title" style="font-size: 18px">Nouveau matériel</div>
          <div class="card-sub">Remplissez le formulaire pour enregistrer un bien</div>
        </div>

        <form @submit.prevent="handleSubmit" class="form-grid">
          <div class="form-group">
            <label class="form-label">Désignation <span class="req">*</span></label>
            <input v-model="form.designation" type="text" class="form-input" placeholder="Ex: Ordinateur portable Dell" required />
            <div v-if="errors.designation" class="form-error">{{ errors.designation }}</div>
          </div>
          <div class="form-group">
            <label class="form-label">Numéro matériel <span class="req">*</span></label>
            <input v-model="form.numero" type="text" class="form-input" placeholder="Ex: MAT-2024-001" required />
            <div v-if="errors.numero" class="form-error">{{ errors.numero }}</div>
          </div>

          <div class="form-group">
            <label class="form-label">Quantité <span class="req">*</span></label>
            <input v-model.number="form.quantite" type="number" min="1" class="form-input" placeholder="1" required />
            <div v-if="errors.quantite" class="form-error">{{ errors.quantite }}</div>
          </div>
          <div class="form-group">
            <label class="form-label">État <span class="req">*</span></label>
            <select v-model="form.etat" class="form-select" required>
              <option value="">-- Sélectionner l'état --</option>
              <option value="Bon">✅ Bon</option>
              <option value="Abîmé">⚠️ Abîmé</option>
              <option value="Mauvais">❌ Mauvais</option>
            </select>
            <div v-if="errors.etat" class="form-error">{{ errors.etat }}</div>
          </div>

          <div class="form-group" style="grid-column: 1 / -1">
            <label class="form-label">Notes / Observations</label>
            <textarea v-model="form.notes" class="form-input form-textarea" rows="3" placeholder="Informations complémentaires sur ce matériel..."></textarea>
          </div>

          <div style="display: flex; gap: 12px; justify-content: flex-end; padding-top: 8px; border-top: 1px solid #e2e8f0; grid-column: 1 / -1">
            <button type="button" class="btn btn-secondary" @click="resetForm">🔄 Réinitialiser</button>
            <button type="submit" class="btn btn-primary" :disabled="loading">
              {{ loading ? 'Enregistrement...' : '💾 Enregistrer' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useMaterialsStore } from '../stores/materials'
import { useUiStore } from '../stores/ui'

const router = useRouter()
const materialsStore = useMaterialsStore()
const uiStore = useUiStore()

const loading = ref(false)
const form = reactive({
  designation: '',
  numero: '',
  quantite: 1,
  etat: '',
  notes: '',
})

const errors = reactive({
  designation: '',
  numero: '',
  quantite: '',
  etat: '',
})

const validate = () => {
  let valid = true
  errors.designation = !form.designation ? 'La désignation est requise' : ''
  errors.numero = !form.numero ? 'Le numéro est requis' : ''
  errors.quantite = form.quantite < 1 ? 'Quantité invalide (min: 1)' : ''
  errors.etat = !form.etat ? 'Veuillez sélectionner un état' : ''

  return !errors.designation && !errors.numero && !errors.quantite && !errors.etat
}

const handleSubmit = async () => {
  if (!validate()) return

  loading.value = true
  try {
    await new Promise((resolve) => setTimeout(resolve, 800))

    materialsStore.addMaterial({
      designation: form.designation,
      numero: form.numero,
      quantite: form.quantite,
      etat: form.etat as any,
      date: new Date().toISOString().split('T')[0],
    })

    uiStore.addToast('Matériel ajouté avec succès !', 'success')
    resetForm()
    router.push('/materials')
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  form.designation = ''
  form.numero = ''
  form.quantite = 1
  form.etat = ''
  form.notes = ''
  Object.assign(errors, { designation: '', numero: '', quantite: '', etat: '' })
}
</script>

<style scoped>
.container {
  padding: 28px;
  background: #f0f4ff;
  min-height: 100vh;
}

.card {
  background: #fff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
}

.card-title {
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 4px;
  font-family: 'Space Grotesk', sans-serif;
}

.card-sub {
  font-size: 12px;
  color: #94a3b8;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  margin-bottom: 0;
}

.form-label {
  display: block;
  font-size: 12.5px;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 6px;
}

.req {
  color: #ef4444;
  margin-left: 2px;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 10px 14px;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  font-family: inherit;
  font-size: 14px;
  color: #0f172a;
  background: #fff;
  outline: none;
  transition: 0.2s;
  appearance: none;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 4px #dbeafe;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.form-select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2394A3B8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 36px;
}

.form-error {
  font-size: 11.5px;
  color: #ef4444;
  margin-top: 5px;
  display: block;
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

.btn-primary {
  background: #3b82f6;
  color: #fff;
}

.btn-primary:hover:not(:disabled) {
  background: #1d4ed8;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
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

@media (max-width: 640px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
