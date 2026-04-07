<template>
  <Teleport to="body">
    <div v-if="modelValue" class="modal-overlay" @click.self="$emit('update:modelValue', false)">
      <div class="modal">
        <div style="font-size: 40px; text-align: center; margin-bottom: 12px">🗑️</div>
        <div class="modal-title" style="text-align: center">Confirmer la suppression</div>
        <div class="modal-sub" style="text-align: center">
          Cette action est irréversible. Le matériel <strong>{{ item?.designation }}</strong> sera définitivement supprimé.
        </div>
        <div class="modal-actions">
          <button class="btn btn-secondary" @click="$emit('update:modelValue', false)">Annuler</button>
          <button class="btn btn-danger btn-delete" @click="handleConfirm">Supprimer</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import type { Material } from '../stores/materials'

defineProps<{
  modelValue: boolean
  item?: Material
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  confirm: []
}>()

const handleConfirm = () => {
  emit('confirm')
  emit('update:modelValue', false)
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
  width: 420px;
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

.modal-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
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

.btn-danger {
  background: #fee2e2;
  color: #ef4444;
}

.btn-delete {
  background: #ef4444;
  color: #fff;
}

.btn-delete:hover {
  background: #dc2626;
}
</style>
