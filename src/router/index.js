import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home.vue'
import Login from '@/views/login.vue'
import UserList from '@/views/users/list.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/home', component: Home },
  { path: '/administrador/usuarios/listar', component: UserList }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router