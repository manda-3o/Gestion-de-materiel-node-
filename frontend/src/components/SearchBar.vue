<template>
  <div class="relative">
    <input
      v-model="query"
      @input="onInput"
      type="search"
      placeholder="Rechercher..."
      class="w-full md:w-72 rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { defineEmits } from 'vue'
const emit = defineEmits<{ (e: 'search', value: string): void }>()

const query = ref('')

const onInput = () => {
  emit('search', query.value)
}
</script>
