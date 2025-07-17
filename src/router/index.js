import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

function estaAutenticado() {
  let res = localStorage.getItem('auth') === 'true';
  return res;
}

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: {
      requiereAuth: true //Protegida
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiereAuth) {
    //Si no se encuentra logeado
    if (!estaAutenticado()) {
      next('/login')
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router
