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
  { path: '/', component: Login, meta: { auth: false } },
  { path: '/home', component: Home, meta: { auth: true } },
  { path: '/administrador/usuarios/listar', component: UserList, meta: { auth: true } },
  { path: '/administrador/usuarios/visualizar/:id', component: UserView, meta: { auth: true } },
  { path: '/administrador/usuarios/novo', component: UserNew, meta: { auth: true } },
  { path: '/administrador/usuarios/permissoes/:id/', component: UserPermissions, meta: { auth: true } },
  { path: '/administrador/estudantes/listar', component: StudentList, meta: { auth: true } },
  { path: '/administrador/cursos/listar', component: CourseList, meta: { auth: true } },
  { path: '/administrador/turmas/listar', component: SchoolGroupsList, meta: { auth: true } },
  { path: '/ocorrencias/ocorrencias/listar', component: IncidentsList, meta: { auth: true } },
  { path: '/ocorrencias/ocorrencias/novo', component: IncidentsNew, meta: { auth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, _from, next) => {
  if (to.meta.auth) {
    if (await isTokenValid()) {
      next();
    } else {
      next({ path: '/' });
    }
  } else {
    next();
  }
});

export default router