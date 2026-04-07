<template>
  <Teleport to="body">
    <div v-if="modelValue" class="modal-overlay" @click.self="$emit('update:modelValue', false)">
      <div class="modal">
        <div class="modal-title">Modifier le matériel</div>
        <div class="modal-sub">Mettez à jour les informations du matériel</div>

        <form @submit.prevent="handleSave" class="form-grid">
          <div class="form-group">
            <label class="form-label">Désignation</label>
            <input v-model="form.designation" type="text" class="form-input" required />
          </div>
          <div class="form-group">
            <label class="form-label">N° Matériel</label>
            <input v-model="form.numero" type="text" class="form-input" required />
          </div>

          <div class="form-group">
            <label class="form-label">Quantité</label>
            <input v-model.number="form.quantite" type="number" min="1" class="form-input" required />
          </div>
          <div class="form-group">
            <label class="form-label">État</label>
            <select v-model="form.etat" class="form-select" required>
              <option value="Bon">✅ Bon</option>
              <option value="Abîmé">⚠️ Abîmé</option>
              <option value="Mauvais">❌ Mauvais</option>
            </select>
          </div>

          <div class="modal-actions" style="grid-column: 1 / -1">
            <button type="button" class="btn btn-secondary" @click="$emit('update:modelValue', false)">Annuler</button>
            <button type="submit" class="btn btn-primary">💾 Enregistrer</button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Material } from '../stores/materials'

const props = defineProps<{
  modelValue: boolean
  item?: Material
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  save: [item: Material]
}>()

const form = ref({
  designation: '',
  numero: '',
  quantite: 1,
  etat: 'Bon' as const,
})

watch(
  () => props.item,
  (item) => {
    if (item) {
      form.value = { ...item }
    }
  },
)

const handleSave = () => {
  if (props.item) {
    emit('save', { ...props.item, ...form.value })
    emit('update:modelValue', false)
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  backdrop-filter: blur(3px);
}

.modal {
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
  padding: 28px;
  width: 520px;
  max-width: 92vw;
  animation: pop 0.2s ease;
}

@keyframes pop {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.modal-title {
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 6px;
  font-family: 'Space Grotesk', sans-serif;
  color: #0f172a;
}

.modal-sub {
  font-size: 13px;
  color: #475569;
  margin-bottom: 24px;
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

.form-input,
.form-select {
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
.form-select:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 4px #dbeafe;
}

.form-select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2394A3B8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 36px;
}

.modal-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 24px;
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

.btn-secondary {
  background: #fff;
  color: #475569;
  border: 1px solid #e2e8f0;
}

.btn-secondary:hover {
  background: #f0f4ff;
  border-color: #cbd5e1;
}

.btn-primary {
  background: #3b82f6;
  color: #fff;
}

.btn-primary:hover {
  background: #1d4ed8;
}
</style>
