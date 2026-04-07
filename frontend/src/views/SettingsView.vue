<template>
  <div class="container">
    <div class="settings-grid">
      <div>
        <div class="card" style="padding: 12px">
          <div class="settings-nav">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              :class="['settings-nav-item', { active: activeTab === tab.id }]"

              @click="activeTab = tab.id"
            >
              {{ tab.icon }} {{ tab.label }}
            </button>
          </div>
        </div>
      </div>

      <div>
        <!-- PROFILE TAB -->
        <div v-if="activeTab === 'profile'" class="card">
          <div class="section-head">
            <h2>Informations du profil</h2>
            <p>Gérez vos informations personnelles</p>
          </div>
          <div class="avatar-upload">
            <div class="avatar-lg">{{ userInitials }}</div>
            <div>
              <button type="button" class="btn btn-secondary">📷 Changer la photo</button>
              <div style="font-size: 11.5px; color: #94a3b8; margin-top: 5px">JPG ou PNG, max 2 Mo</div>
            </div>
          </div>
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Nom complet</label>
              <input type="text" :value="auth.user?.name" class="form-input" />
            </div>
            <div class="form-group">
              <label class="form-label">Email</label>
              <input type="email" :value="auth.user?.email" class="form-input" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Rôle</label>
            <input type="text" :value="auth.user?.role" class="form-input" readonly style="background: #f0f4ff; cursor: not-allowed" />
          </div>
          <button type="button" class="btn btn-primary" @click="uiStore.addToast('Profil mis à jour', 'success')">💾 Sauvegarder</button>
        </div>

        <!-- SECURITY TAB -->
        <div v-if="activeTab === 'security'" class="card">
          <div class="section-head">
            <h2>Sécurité du compte</h2>
            <p>Modifiez votre mot de passe</p>
          </div>
          <div class="form-group">
            <label class="form-label">Mot de passe actuel</label>
            <input type="password" class="form-input" placeholder="••••••••" />
          </div>
          <div class="form-group">
            <label class="form-label">Nouveau mot de passe</label>
            <input type="password" class="form-input" placeholder="Minimum 8 caractères" />
            <div class="form-hint">Au moins 8 caractères, une majuscule et un chiffre</div>
          </div>
          <div class="form-group">
            <label class="form-label">Confirmer le nouveau mot de passe</label>
            <input type="password" class="form-input" placeholder="••••••••" />
          </div>
          <button type="button" class="btn btn-primary" @click="uiStore.addToast('Mot de passe modifié', 'success')">🔒 Mettre à jour</button>
        </div>

        <!-- INTERFACE TAB -->
        <div v-if="activeTab === 'interface'" class="card">
          <div class="section-head">
            <h2>Préférences d'interface</h2>
            <p>Personnalisez votre expérience</p>
          </div>
          <div class="form-group">
            <label class="form-label">Couleur principale</label>
            <div class="theme-swatches" style="margin-top: 10px">
              <div
                v-for="color in colors"
                :key="color.value"
                class="theme-swatch"
                :class="{ active: selectedColor === color.value }"
                :style="{ background: color.value }"
                @click="selectedColor = color.value"
              ></div>
            </div>
          </div>
          <div class="divider"></div>
          <div class="form-group">
            <label class="form-label">Langue</label>
            <select class="form-select">
              <option>🇫🇷 Français</option>
              <option>🇬🇧 English</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Éléments par page</label>
            <select class="form-select">
              <option>10 par page</option>
              <option>25 par page</option>
              <option selected>50 par page</option>
            </select>
          </div>
          <button type="button" class="btn btn-primary" @click="uiStore.addToast('Préférences sauvegardées', 'success')">💾 Appliquer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useUiStore } from '../stores/ui'

const auth = useAuthStore()
const uiStore = useUiStore()

const activeTab = ref('profile')
const selectedColor = ref('#3b82f6')

const tabs = [
  { id: 'profile', label: 'Profil', icon: '👤' },
  { id: 'security', label: 'Sécurité', icon: '🔒' },
  { id: 'interface', label: 'Interface', icon: '🎨' },
]

const colors = [
  { value: '#3b82f6' },
  { value: '#14b8a6' },
  { value: '#8b5cf6' },
  { value: '#f59e0b' },
  { value: '#ef4444' },
  { value: '#10b981' },
]

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
.container {
  padding: 28px;
}

.settings-grid {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 24px;
}

.card {
  background: #fff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
}

.settings-nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.settings-nav-item {
  padding: 10px 14px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 13.5px;
  font-weight: 500;
  color: #475569;
  transition: 0.15s;
  display: flex;
  align-items: center;
  gap: 10px;
  border: none;
  background: none;
  font-family: inherit;
}

.settings-nav-item:hover {
  background: #f0f4ff;
  color: #0f172a;
}

.settings-nav-item.active {
  background: #eff6ff;
  color: #3b82f6;
  font-weight: 600;
}

.section-head {
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e2e8f0;
}

.section-head h2 {
  font-size: 16px;
  font-weight: 700;
  font-family: 'Space Grotesk', sans-serif;
  color: #0f172a;
}

.section-head p {
  font-size: 13px;
  color: #94a3b8;
  margin-top: 3px;
}

.avatar-upload {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.avatar-lg {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #14b8a6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 26px;
  font-weight: 600;
  flex-shrink: 0;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 12.5px;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 6px;
}

.form-input,
.form-select {
  width: 100%;
  padding: 10px 14px;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  font-family: inherit;
  font-size: 14px;
  color: #0f172a;
  background: #fff;
  outline: none;
  transition: 0.2s;
  appearance: none;
}

.form-input:focus,
.form-select:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 4px #dbeafe;
}

.form-select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2394A3B8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 36px;
}

.form-hint {
  font-size: 11.5px;
  color: #94a3b8;
  margin-top: 5px;
}

.theme-swatches {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.theme-swatch {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: 0.15s;
  position: relative;
}

.theme-swatch.active::after {
  content: '✓';
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #fff;
  font-weight: 700;
}

.theme-swatch:hover {
  transform: scale(1.08);
}

.divider {
  height: 1px;
  background: #e2e8f0;
  margin: 24px 0;
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
}

.btn-primary {
  background: #3b82f6;
  color: #fff;
}

.btn-primary:hover {
  background: #1d4ed8;
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

@media (max-width: 640px) {
  .settings-grid {
    grid-template-columns: 1fr;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
