<template>
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-icon" style="background: #eff6ff">📦</div>
      <div class="stat-info">
        <div class="stat-label">Total matériels</div>
        <div class="stat-value">{{ stats.total }}</div>
        <div class="stat-change up">↑ +{{ stats.total - 10 }} ce mois</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon" style="background: #d1fae5">✅</div>
      <div class="stat-info">
        <div class="stat-label">En bon état</div>
        <div class="stat-value" style="color: #10b981">{{ stats.bon }}</div>
        <div class="stat-change up" style="color: #10b981">{{ calcPercent(stats.bon, stats.total) }}% du stock</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon" style="background: #fef3c7">⚠️</div>
      <div class="stat-info">
        <div class="stat-label">Abîmés</div>
        <div class="stat-value" style="color: #f59e0b">{{ stats.abime }}</div>
        <div class="stat-change" style="color: #f59e0b">{{ calcPercent(stats.abime, stats.total) }}% du stock</div>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon" style="background: #fee2e2">❌</div>
      <div class="stat-info">
        <div class="stat-label">En mauvais état</div>
        <div class="stat-value" style="color: #ef4444">{{ stats.mauvais }}</div>
        <div class="stat-change down">⚠️ Attention requise</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMaterialsStore } from '../stores/materials'

const materials = useMaterialsStore()

const stats = computed(() => materials.getStats)

const calcPercent = (value: number, total: number) => {
  return total === 0 ? 0 : Math.round((value / total) * 100)
}
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  background: #fff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: 0.2s;
  cursor: default;
}

.stat-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04);
  transform: translateY(-1px);
}

.stat-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}

.stat-info {
  flex: 1;
  min-width: 0;
}

.stat-label {
  font-size: 11.5px;
  color: #94a3b8;
  font-weight: 500;
  margin-bottom: 4px;
  white-space: nowrap;
}

.stat-value {
  font-size: 26px;
  font-weight: 700;
  color: #0f172a;
  line-height: 1;
  font-family: 'Space Grotesk', sans-serif;
}

.stat-change {
  font-size: 11px;
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 3px;
}

.stat-change.up {
  color: #10b981;
}

.stat-change.down {
  color: #ef4444;
}
</style>
