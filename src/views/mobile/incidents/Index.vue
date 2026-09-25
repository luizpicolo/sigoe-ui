<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import MobileLayout from '@/layouts/MobileLayout.vue'
import { list } from '@/services/incidents'

const router = useRouter()
const incidents = ref([])
const total = ref(0)
const page = ref(1)
const search = ref('')
const loading = ref(false)
const error = ref('')

const load = async () => {
  loading.value = true
  error.value = ''
  try {
    const data = await list(page.value, 'id', search.value)
    incidents.value = data.incidents || []
    total.value = data.total || 0
  } catch (err) {
    error.value = err.messages?.[0] || 'Não foi possível carregar as ocorrências.'
  } finally {
    loading.value = false
  }
}

const next = () => {
  if (incidents.value.length && incidents.value.length < total.value) {
    page.value += 1
    load()
  }
}

const previous = () => {
  if (page.value > 1) {
    page.value -= 1
    load()
  }
}

onMounted(load)
</script>

<template>
  <MobileLayout>
    <div class="flex items-end justify-between gap-3">
      <div>
        <p class="text-sm text-slate-500">Registro escolar</p>
        <h2 class="text-2xl font-bold">Ocorrências</h2>
      </div>
      <button class="flex h-11 w-11 items-center justify-center rounded-xl bg-green-700 text-white shadow-sm" @click="router.push('/mobile/incidents/new')" aria-label="Nova ocorrência">
        <i class="fa-solid fa-plus" />
      </button>
    </div>

    <div class="mt-5">
      <div class="relative">
        <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input v-model="search" @keyup.enter="page = 1; load()" placeholder="Buscar ocorrência..." class="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 outline-none focus:border-green-600" />
      </div>
    </div>

    <p v-if="error" class="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-700">{{ error }}</p>

    <div v-if="loading" class="mt-4 space-y-3">
      <div v-for="n in 5" :key="n" class="h-28 animate-pulse rounded-2xl bg-white shadow-sm" />
    </div>

    <div v-else class="mt-4 space-y-3">
      <button v-for="incident in incidents" :key="incident.id" class="w-full rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm" @click="router.push(`/mobile/incidents/${incident.id}`)">
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <p class="font-bold">{{ incident.student?.name || incident.student_name || 'Estudante não informado' }}</p>
            <p class="mt-1 text-sm text-slate-500">{{ incident.type_incident?.name || incident.type_incident_name || 'Ocorrência' }}</p>
          </div>
          <span class="shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold" :class="incident.is_resolved ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'">
            {{ incident.is_resolved ? 'Resolvida' : 'Pendente' }}
          </span>
        </div>
        <p class="mt-3 line-clamp-2 text-sm text-slate-600">{{ incident.description || 'Sem descrição.' }}</p>
        <p class="mt-3 text-xs text-slate-400">{{ incident.date_incident || '' }} {{ incident.time_incident || '' }}</p>
      </button>

      <div v-if="!incidents.length" class="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
        Nenhuma ocorrência encontrada.
      </div>

      <div class="flex items-center justify-between pt-2">
        <button :disabled="page === 1 || loading" class="rounded-xl border border-slate-300 px-4 py-2 text-sm disabled:opacity-40" @click="previous">Anterior</button>
        <span class="text-xs text-slate-500">Página {{ page }} · {{ total }} registros</span>
        <button :disabled="loading || incidents.length === 0 || incidents.length >= total" class="rounded-xl border border-slate-300 px-4 py-2 text-sm disabled:opacity-40" @click="next">Próxima</button>
      </div>
    </div>
  </MobileLayout>
</template>
