<template>
  <div class="toast-container">
    <transition-group name="toast" tag="div">
      <div
        v-for="toast in uiStore.toasts"
        :key="toast.id"
        :class="['toast', `toast-${toast.type}`]"
      >
        <span class="toast-icon">{{ getIcon(toast.type) }}</span>
        <span>{{ toast.message }}</span>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { useUiStore } from '../stores/ui'

const uiStore = useUiStore()

const getIcon = (type: string) => {
  const icons: Record<string, string> = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
    warn: '⚠️',
  }
  return icons[type] || 'ℹ️'
}
</script>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 28px;
  right: 28px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 9999;
}

.toast {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 18px;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04);
  font-size: 13.5px;
  font-weight: 500;
  min-width: 260px;
  background: #fff;
}

.toast-success {
  border-left: 4px solid #10b981;
  color: #065f46;
}

.toast-error {
  border-left: 4px solid #ef4444;
  color: #991b1b;
}

.toast-info {
  border-left: 4px solid #3b82f6;
  color: #1d4ed8;
}

.toast-warn {
  border-left: 4px solid #f59e0b;
  color: #92400e;
}

.toast-icon {
  font-size: 16px;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  transform: translateY(16px);
  opacity: 0;
}

.toast-leave-to {
  transform: translateY(8px);
  opacity: 0;
}

@media (max-width: 560px) {
  .toast-container {
    bottom: 16px;
    right: 16px;
  }

  .toast {
    min-width: auto;
    max-width: 90vw;
  }
}
</style>
