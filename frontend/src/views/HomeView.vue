<template>
  <div class="container">
    <StatsCard />

    <div class="dash-grid">
      <div>
        <div class="quick-links">
          <router-link to="/ajout" class="quick-link">
            <div class="ql-icon">➕</div>
            <div class="ql-label">Ajouter un matériel</div>
            <div class="ql-sub">Enregistrer un nouveau bien</div>
          </router-link>
          <router-link to="/materials" class="quick-link">
            <div class="ql-icon">📋</div>
            <div class="ql-label">Voir le tableau</div>
            <div class="ql-sub">Consulter tout le stock</div>
          </router-link>
          <router-link to="/bilan" class="quick-link">
            <div class="ql-icon">📊</div>
            <div class="ql-label">Bilan & Graphiques</div>
            <div class="ql-sub">Analyse statistique</div>
          </router-link>
          <router-link to="/settings" class="quick-link">
            <div class="ql-icon">⚙️</div>
            <div class="ql-label">Paramètres</div>
            <div class="ql-sub">Configurer le compte</div>
          </router-link>
        </div>

        <div class="card">
          <div class="card-title">Répartition du stock</div>
          <div class="card-sub" style="margin-bottom: 16px">Distribution par état</div>
          <div style="height: 180px; position: relative">
            <canvas id="dash-pie"></canvas>
          </div>
        </div>
      </div>

      <div class="card" style="height: fit-content">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px">
          <div>
            <div class="card-title">Derniers ajouts</div>
            <div class="card-sub">Matériels récents</div>
          </div>
          <router-link to="/materials" class="btn btn-secondary btn-sm">Voir tout</router-link>
        </div>
        <div class="recent-list">
          <div v-for="material in recent" :key="material.id" class="recent-item">
            <span class="recent-num">{{ material.numero }}</span>
            <div class="recent-info">
              <div class="recent-name">{{ material.designation }}</div>
              <div class="recent-date">{{ formatDate(material.date) }}</div>
            </div>
            <span :class="['badge', `badge-${getEtatClass(material.etat)}`]">{{ material.etat }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import Chart from 'chart.js/auto'
import { useMaterialsStore } from '../stores/materials'
import StatsCard from '../components/StatsCard.vue'

const materialsStore = useMaterialsStore()

const recent = computed(() => materialsStore.materials.slice(0, 6))

let dashPie: Chart | null = null

onMounted(() => {
  renderDashChart()
})

const renderDashChart = () => {
  const stats = materialsStore.getStats
  const labels = ['Bon', 'Abîmé', 'Mauvais']
  const vals = [stats.bon, stats.abime, stats.mauvais]
  const colors = ['#10b981', '#f59e0b', '#ef4444']

  const ctx = document.getElementById('dash-pie') as HTMLCanvasElement
  if (ctx && !dashPie) {
    dashPie = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [
          {
            data: vals,
            backgroundColor: colors,
            borderWidth: 0,
            hoverOffset: 6,
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
.container {
  padding: 28px;
}

.quick-links {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 20px;
}

.quick-link {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 20px;
  cursor: pointer;
  transition: 0.2s;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  text-decoration: none;
}

.quick-link:hover {
  border-color: #3b82f6;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04);
  transform: translateY(-1px);
}

.ql-icon {
  font-size: 22px;
}

.ql-label {
  font-size: 13px;
  font-weight: 600;
  color: #0f172a;
}

.ql-sub {
  font-size: 11px;
  color: #94a3b8;
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

.dash-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

.recent-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.recent-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #e2e8f0;
}

.recent-item:last-child {
  border-bottom: none;
}

.recent-num {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #3b82f6;
  background: #eff6ff;
  padding: 3px 8px;
  border-radius: 6px;
  min-width: 70px;
  text-align: center;
  flex-shrink: 0;
}

.recent-info {
  flex: 1;
  min-width: 0;
}

.recent-name {
  font-weight: 500;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.recent-date {
  font-size: 11px;
  color: #94a3b8;
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
  text-decoration: none;
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

@media (max-width: 900px) {
  .dash-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .container {
    padding: 16px;
  }

  .quick-links {
    grid-template-columns: 1fr;
  }
}
</style>
