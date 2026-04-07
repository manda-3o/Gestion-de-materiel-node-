<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-logo">
        <div class="logo-icon">G</div>
        <div class="logo-text">Gest<span>Mat</span></div>
      </div>
      <h1 class="login-title">Bon retour 👋</h1>
      <p class="login-sub">Connectez-vous à votre espace de gestion</p>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label class="form-label">Email<span class="req">*</span></label>
          <input
            v-model="form.email"
            type="email"
            class="form-input"
            placeholder="manda@gmail.com"
            required
          />
        </div>

        <div class="form-group">
          <label class="form-label">Mot de passe<span class="req">*</span></label>
          <div class="input-wrap">
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              class="form-input"
              placeholder="••••••••"
              required
            />
            <span class="input-toggle" @click="showPassword = !showPassword">👁</span>
          </div>
        </div>

        <div class="remember-row">
          <label class="checkbox-label">
            <input type="checkbox" checked />
            Se souvenir de moi
          </label>
          <a href="#" class="forgot-link">Mot de passe oublié ?</a>
        </div>

        <button type="submit" class="btn btn-primary login-btn" :disabled="loading">
          <span v-if="!loading">Se connecter</span>
          <span v-else>Connexion...</span>
        </button>

        <div v-if="error" class="login-error">
          ⚠️ {{ error }}
        </div>
      </form>

      <p class="login-footer">Espace réservé aux administrateurs · <a href="#">Aide</a></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useUiStore } from '../stores/ui'

const router = useRouter()
const authStore = useAuthStore()
const uiStore = useUiStore()

const form = ref({ email: 'manda@gmail.com', password: 'admin123' })
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  error.value = ''
  loading.value = true

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    authStore.login(form.value.email, form.value.password)
    uiStore.addToast('Connexion réussie !', 'success')
    router.push('/home')
  } catch (err: any) {
    error.value = err.message || 'Erreur de connexion'
    uiStore.addToast(error.value, 'error')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  position: fixed;
  inset: 0;
  background: linear-gradient(135deg, #eff6ff 0%, #f0fdfa 50%, #f0f4ff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
}

.login-card {
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
  padding: 44px;
  width: 420px;
  max-width: 92vw;
  border: 1px solid #e2e8f0;
}

.login-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
  margin-bottom: 32px;
}

.logo-icon {
  width: 48px;
  height: 48px;
  font-size: 22px;
  border-radius: 14px;
  background: linear-gradient(135deg, #3b82f6, #14b8a6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
}

.logo-text {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #0f172a;
}

.logo-text span {
  color: #3b82f6;
}

.login-title {
  font-size: 22px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 4px;
  font-family: 'Space Grotesk', sans-serif;
  color: #0f172a;
}

.login-sub {
  text-align: center;
  color: #94a3b8;
  font-size: 13px;
  margin-bottom: 28px;
}

.login-form {
  margin-bottom: 20px;
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

.req {
  color: #ef4444;
  margin-left: 2px;
}

.form-input {
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
}

.form-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 4px #dbeafe;
}

.input-wrap {
  position: relative;
}

.input-wrap .form-input {
  padding-right: 40px;
}

.input-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #94a3b8;
  font-size: 14px;
  user-select: none;
}

.remember-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12.5px;
  color: #475569;
  cursor: pointer;
}

.checkbox-label input {
  accent-color: #3b82f6;
  width: 14px;
  height: 14px;
}

.forgot-link {
  font-size: 12.5px;
  color: #3b82f6;
  font-weight: 500;
  text-decoration: none;
}

.login-btn {
  width: 100%;
  justify-content: center;
  padding: 12px;
}

.login-error {
  display: block;
  margin-top: 12px;
  padding: 10px 14px;
  background: #fef2f2;
  border-radius: 8px;
  border: 1px solid #fecaca;
  font-size: 13px;
  color: #991b1b;
  text-align: center;
}

.login-footer {
  text-align: center;
  margin-top: 20px;
  font-size: 12px;
  color: #94a3b8;
}

.login-footer a {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
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

.btn-primary {
  background: #3b82f6;
  color: #fff;
}

.btn-primary:hover:not(:disabled) {
  background: #1d4ed8;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
