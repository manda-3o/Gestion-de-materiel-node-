<template>
  <div class="container">
    <div class="kpi-row">
      <div class="kpi-card">
        <div class="kpi-val">{{ stats.total }}</div>
        <div class="kpi-label">Total matériels</div>
        <div style="margin-top: 8px"><span class="badge badge-blue">Total global</span></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-val" style="color: #10b981">{{ stats.bon }}</div>
        <div class="kpi-label">En bon état</div>
        <div style="margin-top: 8px"><span class="badge badge-bon">Bon</span></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-val" style="color: #f59e0b">{{ stats.abime }}</div>
        <div class="kpi-label">Abîmés</div>
        <div style="margin-top: 8px"><span class="badge badge-abime">Abîmé</span></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-val" style="color: #ef4444">{{ stats.mauvais }}</div>
        <div class="kpi-label">Mauvais état</div>
        <div style="margin-top: 8px"><span class="badge badge-mauvais">Mauvais</span></div>
      </div>
    </div>

    <div class="charts-grid">
      <div class="card">
        <div class="card-title">Répartition par état</div>
        <div class="card-sub" style="margin-bottom: 16px">Histogramme des matériels</div>
        <div style="height: 280px; position: relative">
          <canvas id="bar-chart"></canvas>
        </div>
      </div>
      <div class="card">
        <div class="card-title">Vue camembert</div>
        <div class="card-sub" style="margin-bottom: 16px">Proportion par état</div>
        <div style="height: 280px; position: relative">
          <canvas id="pie-chart"></canvas>
        </div>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px">
      <div class="analysis-card ok">
        <div style="font-size: 22px">✅</div>
        <div>
          <div style="font-weight: 600; color: #065f46; margin-bottom: 3px">Stock majoritairement sain</div>
          <div style="font-size: 12.5px; color: #047857">{{ bon }}% des matériels sont en bon état. Le stock est globalement bien entretenu.</div>
        </div>
      </div>
      <div class="analysis-card warn">
        <div style="font-size: 22px">⚠️</div>
        <div>
          <div style="font-weight: 600; color: #92400e; margin-bottom: 3px">Matériels dégradés</div>
          <div style="font-size: 12.5px; color: #b45309">{{ degreded }}% de matériels nécessitent une attention ou un remplacement rapide.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import Chart from 'chart.js/auto'
import { useMaterialsStore } from '../stores/materials'

const materialsStore = useMaterialsStore()

const stats = computed(() => materialsStore.getStats)

const bon = computed(() => (stats.value.total ? Math.round((stats.value.bon / stats.value.total) * 100) : 0))
const degreded = computed(() => (stats.value.total ? Math.round(((stats.value.abime + stats.value.mauvais) / stats.value.total) * 100) : 0))

let barChart: Chart | null = null
let pieChart: Chart | null = null

onMounted(() => {
  renderCharts()
})

const renderCharts = () => {
  const labels = ['Bon', 'Abîmé', 'Mauvais']
  const vals = [stats.value.bon, stats.value.abime, stats.value.mauvais]
  const colors = ['#10b981', '#f59e0b', '#ef4444']

  // Bar chart
  const barCtx = document.getElementById('bar-chart') as HTMLCanvasElement
  if (barCtx && !barChart) {
    barChart = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Nombre de matériels',
            data: vals,
            backgroundColor: colors,
            borderRadius: 8,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(0,0,0,.05)' },
            ticks: { font: { family: 'Figtree', size: 12 } },
          },
          x: {
            grid: { display: false },
            ticks: { font: { family: 'Figtree', size: 12 } },
          },
        },
      },
    })
  }

  // Pie chart
  const pieCtx = document.getElementById('pie-chart') as HTMLCanvasElement
  if (pieCtx && !pieChart) {
    pieChart = new Chart(pieCtx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [
          {
            data: vals,
            backgroundColor: colors,
            borderWidth: 0,
            hoverOffset: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom' as const,
            labels: { font: { family: 'Figtree', size: 12 }, padding: 12, usePointStyle: true },
          },
        },
      },
    })
  }
}
</script>

<style scoped>
.container {
  padding: 28px;
}

.kpi-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 14px;
  margin-bottom: 24px;
}

.kpi-card {
  background: #fff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  padding: 18px 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
}

.kpi-val {
  font-size: 30px;
  font-weight: 700;
  font-family: 'Space Grotesk', sans-serif;
  line-height: 1;
}

.kpi-label {
  font-size: 12px;
  color: #94a3b8;
  margin-top: 4px;
  font-weight: 500;
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

.badge-blue {
  background: #dbeafe;
  color: #1d4ed8;
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

.charts-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 20px;
  margin-bottom: 24px;
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

.analysis-card {
  border-radius: 16px;
  border: 1.5px solid;
  padding: 16px 20px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.analysis-card.ok {
  border-color: #6ee7b7;
  background: #d1fae5;
}

.analysis-card.warn {
  border-color: #fcd34d;
  background: #fef3c7;
}

@media (max-width: 900px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .container {
    padding: 16px;
  }

  .kpi-row {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
