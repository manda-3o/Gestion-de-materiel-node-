<template>
  <aside :class="['sidebar', { open: uiStore.sidebarOpen }]">
    <div class="sidebar-logo">
      <div class="logo-icon">G</div>
      <div class="logo-text">Gest<span>Mat</span></div>
    </div>

    <div style="padding: 8px 12px">
      <div class="sidebar-label">Navigation</div>
      <router-link
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="nav-item"
        :class="{ active: $route.path === item.to }"
        @click="uiStore.closeSidebar()"
      >
        <div class="nav-icon">{{ item.icon }}</div>
        {{ item.label }}
      </router-link>

      <div class="sidebar-label" style="margin-top: 8px">Compte</div>
      <router-link to="/settings" class="nav-item" @click="uiStore.closeSidebar()">
        <div class="nav-icon">⚙️</div>
        Paramètres
      </router-link>
    </div>

    <div class="sidebar-bottom">
      <button class="nav-item danger" @click="logout" style="width: 100%; margin-bottom: 10px">
        <div class="nav-icon" style="background: #FEE2E2">🚪</div>
        Déconnexion
      </button>
      <div class="user-chip">
        <div class="avatar">{{ userInitials }}</div>
        <div class="user-info">
          <div class="user-name">{{ auth.user?.name }}</div>
          <div class="user-role">{{ auth.user?.role }}</div>
        </div>
      </div>
    </div>
  </aside>

  <!-- Mobile overlay -->
  <div
    v-if="uiStore.sidebarOpen"
    id="sidebar-overlay"
    @click="uiStore.closeSidebar()"
  ></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useUiStore } from '../stores/ui'

const router = useRouter()
const auth = useAuthStore()
const uiStore = useUiStore()

const navItems = [
  { to: '/home', label: 'Accueil', icon: '🏠' },
  { to: '/bilan', label: 'Bilan & Statistiques', icon: '📊' },
  { to: '/ajout', label: 'Ajouter un matériel', icon: '➕' },
  { to: '/materials', label: 'Liste des matériels', icon: '📋' },
]

const userInitials = computed(() => {
  if (!auth.user) return 'AD'
  return auth.user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
})

const logout = () => {
  auth.logout()
  router.push('/login')
}
</script>

<style scoped>
.sidebar {
  width: 260px;
  min-width: 260px;
  background: var(--surface);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  transition: 0.3s;
  z-index: 100;
}

.sidebar-logo {
  padding: 28px 24px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 8px;
}

.logo-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--blue), var(--teal));
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  flex-shrink: 0;
}

.logo-text {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: var(--text);
}

.logo-text span {
  color: var(--blue);
}

.sidebar-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text3);
  padding: 8px 12px 4px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.15s;
  color: var(--text2);
  font-weight: 500;
  font-size: 13.5px;
  margin-bottom: 2px;
  text-decoration: none;
  border: none;
  background: none;
  font-family: inherit;
}

.nav-item:hover {
  background: var(--bg);
  color: var(--text);
}

.nav-item.active {
  background: var(--blue-xlight);
  color: var(--blue);
  font-weight: 600;
}

.nav-item.active .nav-icon {
  background: var(--blue);
  color: #fff;
}

.nav-item.danger {
  color: #ef4444;
}

.nav-item.danger:hover {
  background: #fef2f2;
}

.nav-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: var(--surface2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: 0.15s;
  font-size: 15px;
}

.nav-item.danger .nav-icon {
  background: #fee2e2;
}

.sidebar-bottom {
  margin-top: auto;
  padding: 16px 12px;
  border-top: 1px solid var(--border);
}

.user-chip {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.15s;
}

.user-chip:hover {
  background: var(--bg);
}

.avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--blue), var(--teal));
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 600;
  font-size: 13px;
  flex-shrink: 0;
}

.user-info {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-weight: 600;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-role {
  font-size: 11px;
  color: var(--text3);
}

#sidebar-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 99;
}

@media (max-width: 900px) {
  .sidebar {
    position: fixed;
    left: -280px;
    height: 100%;
    box-shadow: var(--shadow-lg);
  }

  .sidebar.open {
    left: 0;
  }

  #sidebar-overlay {
    display: block;
  }
}
</style>
