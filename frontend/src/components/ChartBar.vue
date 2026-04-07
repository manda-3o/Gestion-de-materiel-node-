<template>
  <div class="rounded-xl border bg-white p-4 shadow-sm">
    <h3 class="text-lg font-medium mb-3">{{ title }}</h3>
    <Bar :chart-data="data" :chart-options="options" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const props = defineProps<{ title: string; labels: string[]; values: number[] }>()

const data = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: 'Matériel',
      backgroundColor: '#3B82F6',
      data: props.values,
    },
  ],
}))

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    title: { display: false },
  },
}
</script>
