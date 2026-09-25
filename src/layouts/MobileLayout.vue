<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { logout } from '@/services/authentication'

const router = useRouter()
const route = useRoute()
const menuOpen = ref(false)

const navItems = [
  { label: 'Dashboard', to: '/mobile/dashboard', icon: 'fa-chart-pie' },
  { label: 'Ocorrências', to: '/mobile/incidents', icon: 'fa-triangle-exclamation' },
  { label: 'Estudantes', to: '/mobile/students', icon: 'fa-user-graduate' },
]

const pageTitle = computed(() => {
  const item = navItems.find(item => route.path.startsWith(item.to))
  return item?.label || 'SIGOE'
})

const closeMenu = () => {
  menuOpen.value = false
}

const handleLogout = async () => {
  await logout()
  closeMenu()
  router.replace('/mobile/login')
}

const handleUnauthorized = () => {
  closeMenu()
  router.replace('/mobile/login')
}

onMounted(() => window.addEventListener('sigoe:unauthorized', handleUnauthorized))
onUnmounted(() => window.removeEventListener('sigoe:unauthorized', handleUnauthorized))
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <header class="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div class="flex h-16 items-center justify-between px-4">
        <button class="flex h-10 w-10 items-center justify-center rounded-xl text-slate-700 hover:bg-slate-100" @click="menuOpen = true" aria-label="Abrir menu">
          <i class="fa-solid fa-bars" />
        </button>
        <div class="text-center">
          <p class="text-xs font-semibold uppercase tracking-wider text-green-700">SIGOE</p>
          <h1 class="text-sm font-bold">{{ pageTitle }}</h1>
        </div>
        <button class="flex h-10 w-10 items-center justify-center rounded-xl text-slate-700 hover:bg-slate-100" @click="handleLogout" aria-label="Sair">
          <i class="fa-solid fa-right-from-bracket" />
        </button>
      </div>
    </header>

    <div v-if="menuOpen" class="fixed inset-0 z-50">
      <button class="absolute inset-0 bg-slate-950/40" aria-label="Fechar menu" @click="closeMenu" />
      <aside class="relative h-full w-80 max-w-[86vw] bg-white p-5 shadow-2xl">
        <div class="mb-8 flex items-center justify-between">
          <div>
            <p class="text-xs font-bold uppercase tracking-wider text-green-700">SIGOE</p>
            <p class="text-lg font-bold">Menu</p>
          </div>
          <button class="h-10 w-10 rounded-xl hover:bg-slate-100" @click="closeMenu" aria-label="Fechar menu">
            <i class="fa-solid fa-xmark" />
          </button>
        </div>

        <nav class="space-y-2">
          <RouterLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-3 rounded-xl px-4 py-3 font-medium"
            :class="route.path.startsWith(item.to) ? 'bg-green-50 text-green-700' : 'text-slate-700 hover:bg-slate-50'"
            @click="closeMenu"
          >
            <i :class="['fa-solid', item.icon, 'w-5 text-center']" />
            {{ item.label }}
          </RouterLink>
        </nav>

        <button class="mt-8 flex w-full items-center gap-3 rounded-xl px-4 py-3 font-medium text-red-600 hover:bg-red-50" @click="handleLogout">
          <i class="fa-solid fa-right-from-bracket w-5 text-center" />
          Sair
        </button>
      </aside>
    </div>

    <main class="mx-auto w-full max-w-3xl px-4 py-5 pb-24">
      <slot />
    </main>

    <nav class="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white">
      <div class="mx-auto grid max-w-3xl grid-cols-3">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="flex flex-col items-center gap-1 px-2 py-3 text-[11px] font-medium"
          :class="route.path.startsWith(item.to) ? 'text-green-700' : 'text-slate-500'"
        >
          <i :class="['fa-solid', item.icon, 'text-base']" />
          {{ item.label }}
        </RouterLink>
      </div>
    </nav>
  </div>
</template>
