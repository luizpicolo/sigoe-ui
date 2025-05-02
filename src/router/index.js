import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home.vue'
import Login from '@/views/login.vue'
import UserList from '@/views/users/list.vue'
import UserView from '@/views/users/show.vue'
import UserNew from '@/views/users/new.vue'
import UserPermissions from '@/views/users/permissions.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/home', component: Home },
  { path: '/administrador/usuarios/listar', component: UserList },
  { path: '/administrador/usuarios/visualizar/:id', component: UserView },
  { path: '/administrador/usuarios/novo', component: UserNew },
  { path: '/administrador/usuarios/permissoes/:id/', component: UserPermissions }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router