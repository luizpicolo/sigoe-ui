import { createRouter, createWebHistory } from 'vue-router'
import { isTokenValid } from '@/services/authentication'

import Home from '@/views/home.vue'
import Login from '@/views/login.vue'
import UserList from '@/views/users/list.vue'
import UserView from '@/views/users/show.vue'
import UserNew from '@/views/users/new.vue'
import UserPermissions from '@/views/users/permissions.vue'
import StudentList from '@/views/students/list.vue'
import CourseList from '@/views/courses/list.vue'
import SchoolGroupsList from '@/views/school_groups/list.vue'
import IncidentsList from '@/views/incidents/list.vue'
import IncidentsNew from '@/views/incidents/new.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/home', component: Home },
  { path: '/administrador/usuarios/listar', component: UserList },
  { path: '/administrador/usuarios/visualizar/:id', component: UserView },
  { path: '/administrador/usuarios/novo', component: UserNew },
  { path: '/administrador/usuarios/permissoes/:id/', component: UserPermissions },
  { path: '/administrador/estudantes/listar', component: StudentList },
  { path: '/administrador/cursos/listar', component: CourseList },
  { path: '/administrador/turmas/listar', component: SchoolGroupsList },
  { path: '/ocorrencias/ocorrencias/listar', component: IncidentsList },
  { path: '/ocorrencias/ocorrencias/novo', component: IncidentsNew },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router