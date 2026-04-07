<template>
  <div class="rounded-xl border bg-white p-6 shadow-sm">
    <div class="flex items-center gap-4">
      <div class="h-12 w-12 rounded-full bg-primary/20 text-primary flex items-center justify-center text-lg">{{ initials }}</div>
      <div>
        <h4 class="text-lg font-semibold">{{ profile.name }}</h4>
        <p class="text-sm text-gray-500">{{ profile.email }}</p>
      </div>
    </div>
    <div class="mt-4 space-y-2">
      <p><strong>Rôle :</strong> {{ profile.role }}</p>
      <p><strong>Entreprise :</strong> {{ profile.company }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ profile: { name: string; email: string; role: string; company: string } }>()

const initials = computed(() => props.profile.name
  .split(' ')
  .map((word) => word.charAt(0).toUpperCase())
  .slice(0, 2)
  .join(''))
</script>
