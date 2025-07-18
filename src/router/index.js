import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AboutView from '../views/AboutView.vue'
import EstudianteView from '../views/EstudianteView.vue'
import RecursoProhibidoView from '../views/RecursoProhibido.vue'
import NotasIngresoView from '../views/NotasIngresoView.vue'

import { obtenerPaginasPermitidas } from '../helpers/Autorizacion'

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
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: {
      requiereAuth: true //Protegida
    }
  },
  {
    path: '/estudiante',
    name: 'estudiante',
    component: EstudianteView,
    meta: {
      requiereAuth: true //Protegida
    }
  },
  {
    path: '/403',
    name: '403',
    component: RecursoProhibidoView,
    meta: {
      requiereAuth: true //Protegida
    }
  },
  {
    path: '/notas',
    name: 'notas',
    component: NotasIngresoView,
    meta: {
      requiereAuth: true //Protegida
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


//Guardian 
router.beforeEach((to, from, next) => {
  //Valida si la pagina debe estar autenticada (requiereAuth: true)
  if (to.meta.requiereAuth) {
    //Si no se encuentra logeado
    if (!estaAutenticado()) {
      next('/login')
    } else {
      let usuario = localStorage.getItem('usuario');
      let paginas = obtenerPaginasPermitidas(usuario);
      if (paginas.includes(to.path)) {
        next();
      } else {
        next('/403');
      }
    }
  } else {
    next();
  }
})

export default router
