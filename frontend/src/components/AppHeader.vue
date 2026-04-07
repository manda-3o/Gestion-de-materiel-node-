<template>
  <div class="app-header">
    <div class="hamburger" @click="uiStore.toggleSidebar">☰</div>
    <div>
      <div class="page-title">{{ title }}</div>
      <div class="page-sub">{{ subtitle }}</div>
    </div>
    <div class="topbar-right">
      <div class="search-box">
        <span class="search-icon">🔍</span>
        <input
          type="text"
          :value="uiStore.search"
          @input="(e) => uiStore.setSearch((e.target as HTMLInputElement).value)"
          placeholder="Rechercher un matériel..."
        />
      </div>
      <div class="notif-btn" @click="uiStore.addToast('3 matériels en mauvais état !', 'warn')">
        🔔 <div class="notif-dot"></div>
      </div>
      <div class="avatar">{{ userInitials }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useUiStore } from '../stores/ui'

defineProps<{
  title: string
  subtitle: string
}>()

const auth = useAuthStore()
const uiStore = useUiStore()

const userInitials = computed(() => {
  if (!auth.user) return 'AD'
  return auth.user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
})
</script>

<style scoped>
.app-header {
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
  padding: 16px 28px;
  display: flex;
  align-items: center;
  gap: 16px;
  position: sticky;
  top: 0;
  z-index: 50;
}

.hamburger {
  display: none;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  cursor: pointer;
  background: #f0f4ff;
  border: 1px solid #e2e8f0;
  font-size: 18px;
  transition: 0.15s;
}

.hamburger:hover {
  background: #e2e8f0;
}

.page-title {
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
  font-family: 'Space Grotesk', sans-serif;
}

.page-sub {
  font-size: 11px;
  color: #94a3b8;
}

.topbar-right {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 12px;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f0f4ff;
  border: 1.5px solid #e2e8f0;
  border-radius: 99px;
  padding: 8px 16px;
  width: 280px;
  transition: 0.2s;
}

.search-box:focus-within {
  border-color: #3b82f6;
  background: #fff;
  box-shadow: 0 0 0 4px #dbeafe;
}

.search-box input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 13px;
  font-family: inherit;
  width: 100%;
  color: #0f172a;
}

.search-box input::placeholder {
  color: #94a3b8;
}

.search-icon {
  color: #94a3b8;
  font-size: 14px;
  flex-shrink: 0;
}

.notif-btn {
  width: 36px;
  height: 36px;
  border-radius: 9px;
  background: #f0f4ff;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transition: 0.15s;
  font-size: 16px;
}

.notif-btn:hover {
  background: #e2e8f0;
  border-color: #cbd5e1;
}

.notif-dot {
  position: absolute;
  top: 7px;
  right: 7px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #ef4444;
  border: 2px solid #fff;
}

.avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #14b8a6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  flex-shrink: 0;
}

@media (max-width: 900px) {
  .hamburger {
    display: flex;
  }

  .search-box {
    width: 200px;
  }
}

@media (max-width: 560px) {
  .search-box {
    width: 150px;
  }

  .topbar-right {
    gap: 8px;
  }
}
</style>
