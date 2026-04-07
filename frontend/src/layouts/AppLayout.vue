<template>
  <div class="app-wrapper">
    <AppSidebar @logout="handleLogout" />
    <div class="main">
      <AppHeader :title="titles[$route.name as string]?.title || 'GestMat'" :subtitle="titles[$route.name as string]?.subtitle || ''" />
      <div class="content">
        <router-view />
      </div>
    </div>
    <ToastAlert />
  </div>
</template>

<script setup lang="ts">
import AppSidebar from '../components/AppSidebar.vue'
import AppHeader from '../components/AppHeader.vue'
import ToastAlert from '../components/ToastAlert.vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  auth.logout()
  router.push('/login')
}

const titles: Record<string, { title: string; subtitle: string }> = {
  home: { title: 'Accueil', subtitle: 'Vue d\'ensemble du système' },
  materials: { title: 'Liste des matériels', subtitle: 'Gestion et consultation du stock' },
  add: { title: 'Ajouter un matériel', subtitle: 'Enregistrement d\'un nouveau bien' },
  bilan: { title: 'Bilan & Statistiques', subtitle: 'Analyse détaillée des matériels' },
  settings: { title: 'Paramètres', subtitle: 'Configuration du compte' },
}
</script>

<style scoped>
.app-wrapper {
  display: flex;
  min-height: 100vh;
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
}

.content {
  flex: 1;
  overflow-y: auto;
  background: #f0f4ff;
}
</style>
