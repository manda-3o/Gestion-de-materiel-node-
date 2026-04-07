<template>
  <router-view />
</template>

<script setup lang="ts">
import { useAuthStore } from './stores/auth'

const auth = useAuthStore()

// Initialize auth state from localStorage
if (auth.isLoggedIn) {
  // User is already logged in
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --blue: #3b82f6;
  --blue-dark: #1d4ed8;
  --blue-light: #dbeafe;
  --blue-xlight: #eff6ff;
  --teal: #14b8a6;
  --teal-light: #ccfbf1;
  --teal-dark: #0f766e;
  --bg: #f0f4ff;
  --surface: #ffffff;
  --surface2: #f8fafc;
  --text: #0f172a;
  --text2: #475569;
  --text3: #94a3b8;
  --border: #e2e8f0;
  --border2: #cbd5e1;
  --red: #ef4444;
  --red-light: #fee2e2;
  --amber: #f59e0b;
  --amber-light: #fef3c7;
  --green: #10b981;
  --green-light: #d1fae5;
  --radius: 10px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04);
  --shadow-lg: 0 10px 40px rgba(0, 0, 0, 0.12);
}

body {
  font-family: 'Figtree', sans-serif;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  font-size: 14px;
  line-height: 1.6;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: var(--border2);
  border-radius: 99px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
