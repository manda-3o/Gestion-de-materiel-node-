<template>
  <div class="rounded-xl border bg-white p-4 shadow-sm">
    <h3 class="text-lg font-medium mb-3">{{ title }}</h3>
    <Pie :chart-data="data" :chart-options="options" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Pie } from 'vue-chartjs'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'

Chart.register(ArcElement, Tooltip, Legend)

const props = defineProps<{ title: string; labels: string[]; values: number[] }>()

const data = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      data: props.values,
      backgroundColor: ['#3B82F6', '#5EEAD4', '#F59E0B', '#EF4444', '#A855F7'],
      borderWidth: 1,
    },
  ],
}))

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom' },
  },
}
</script>
