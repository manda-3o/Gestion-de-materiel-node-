import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import LoginView from '../views/LoginView.vue'
import AppLayout from '../layouts/AppLayout.vue'
import HomeView from '../views/HomeView.vue'
import MaterialsView from '../views/MaterialsView.vue'
import AddMaterialView from '../views/AddMaterialView.vue'
import BilanView from '../views/BilanView.vue'
import SettingsView from '../views/SettingsView.vue'

const routes = [
  {
    path: '/login',
    component: LoginView,
    meta: { public: true },
  },
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: 'home',
        name: 'home',
        component: HomeView,
      },
      {
        path: 'materials',
        name: 'materials',
        component: MaterialsView,
      },
      {
        path: 'ajout',
        name: 'add',
        component: AddMaterialView,
      },
      {
        path: 'bilan',
        name: 'bilan',
        component: BilanView,
      },
      {
        path: 'settings',
        name: 'settings',
        component: SettingsView,
      },
      {
        path: '',
        redirect: '/home',
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/home',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  const isPublic = to.meta.public

  if (!isPublic && !auth.isLoggedIn) {
    next('/login')
  } else if (to.path === '/login' && auth.isLoggedIn) {
    next('/home')
  } else {
    next()
  }
})

export default router
