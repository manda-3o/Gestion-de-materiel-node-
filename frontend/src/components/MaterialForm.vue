<template>
  <form @submit.prevent="handleSubmit" class="rounded-xl border bg-white p-6 shadow-sm space-y-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Nom du matériel</label>
        <input v-model="model.name" type="text" required class="mt-1 block w-full rounded border-gray-300" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Catégorie</label>
        <input v-model="model.category" type="text" required class="mt-1 block w-full rounded border-gray-300" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Quantité</label>
        <input v-model.number="model.quantity" type="number" min="0" required class="mt-1 block w-full rounded border-gray-300" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Statut</label>
        <select v-model="model.status" required class="mt-1 block w-full rounded border-gray-300">
          <option value="Actif">Actif</option>
          <option value="En maintenance">En maintenance</option>
          <option value="Hors service">Hors service</option>
        </select>
      </div>
    </div>
    <div class="flex justify-end gap-2">
      <button type="button" @click="resetForm" class="rounded bg-gray-100 px-4 py-2 text-sm text-gray-700">Réinitialiser</button>
      <button type="submit" class="rounded bg-primary px-4 py-2 text-sm text-white">{{ model.id ? 'Mettre à jour' : 'Ajouter' }}</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, watch, toRefs } from 'vue'
import { defineProps, defineEmits } from 'vue'

type Material = {
  id?: number | string
  name: string
  category: string
  quantity: number
  status: string
}

const props = defineProps<{ material?: Material }>()
const emit = defineEmits<{
  (e: 'save', material: Material): void
}>()

const model = reactive<Material>({
  id: props.material?.id,
  name: props.material?.name ?? '',
  category: props.material?.category ?? '',
  quantity: props.material?.quantity ?? 1,
  status: props.material?.status ?? 'Actif',
})

watch(
  () => props.material,
  (next) => {
    if (next) {
      model.id = next.id
      model.name = next.name
      model.category = next.category
      model.quantity = next.quantity
      model.status = next.status
    } else {
      resetForm()
    }
  },
  { immediate: true },
)

const handleSubmit = () => {
  emit('save', { ...model })
  resetForm()
}

const resetForm = () => {
  model.id = undefined
  model.name = ''
  model.category = ''
  model.quantity = 1
  model.status = 'Actif'
}
</script>
