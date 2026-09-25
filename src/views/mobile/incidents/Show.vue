<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MobileLayout from '@/layouts/MobileLayout.vue'
import { find, remove } from '@/services/incidents'

const route = useRoute()
const router = useRouter()
const incident = ref(null)
const loading = ref(true)
const error = ref('')
const deleting = ref(false)

const studentName = computed(() => incident.value?.student?.name || incident.value?.student_name || 'Estudante não informado')
const typeName = computed(() => incident.value?.type_incident?.name || incident.value?.type_incident_name || 'Ocorrência')

const load = async () => {
  try {
    incident.value = (await find(route.params.id)).incident
  } catch (err) {
    error.value = err.messages?.[0] || 'Não foi possível carregar a ocorrência.'
  } finally {
    loading.value = false
  }
}

const destroy = async () => {
  if (!window.confirm('Excluir esta ocorrência?')) return
  deleting.value = true
  try {
    await remove(route.params.id)
    router.replace('/mobile/incidents')
  } catch (err) {
    error.value = err.messages?.[0] || 'Não foi possível excluir a ocorrência.'
  } finally {
    deleting.value = false
  }
}

onMounted(load)
</script>

<template>
  <MobileLayout>
    <div class="mb-5 flex items-center justify-between">
      <button class="text-sm font-semibold text-green-700" @click="router.back()"><i class="fa-solid fa-arrow-left mr-2" />Voltar</button>
      <div class="flex gap-2">
        <button v-if="incident" class="rounded-xl border border-slate-300 px-3 py-2 text-sm" @click="router.push(`/mobile/incidents/${route.params.id}/edit`)">Editar</button>
        <button v-if="incident" :disabled="deleting" class="rounded-xl bg-red-600 px-3 py-2 text-sm font-semibold text-white disabled:opacity-50" @click="destroy">Excluir</button>
      </div>
    </div>

    <div v-if="loading" class="rounded-2xl bg-white p-6 text-sm text-slate-500">Carregando...</div>
    <div v-else-if="error" class="rounded-2xl bg-red-50 p-4 text-sm text-red-700">{{ error }}</div>

    <template v-else-if="incident">
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-sm text-slate-500">{{ typeName }}</p>
            <h2 class="mt-1 text-xl font-bold">{{ studentName }}</h2>
          </div>
          <span class="rounded-full px-3 py-1 text-xs font-bold" :class="incident.is_resolved ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'">{{ incident.is_resolved ? 'Resolvida' : 'Pendente' }}</span>
        </div>

        <dl class="mt-5 space-y-4 text-sm">
          <div><dt class="text-slate-400">Data</dt><dd class="font-medium">{{ incident.date_incident || '—' }} {{ incident.time_incident || '' }}</dd></div>
          <div><dt class="text-slate-400">Setor</dt><dd class="font-medium">{{ incident.sector?.name || '—' }}</dd></div>
          <div><dt class="text-slate-400">Assistente</dt><dd class="font-medium">{{ incident.assistant?.name || '—' }}</dd></div>
          <div><dt class="text-slate-400">Descrição</dt><dd class="whitespace-pre-line font-medium">{{ incident.description || '—' }}</dd></div>
          <div><dt class="text-slate-400">Solução</dt><dd class="whitespace-pre-line font-medium">{{ incident.soluction || '—' }}</dd></div>
        </dl>
      </div>

      <section class="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 class="font-bold">Regulamento</h3>
        <div class="mt-3 space-y-2 text-sm">
          <p v-for="item in incident.student_duties || []" :key="item.id">• {{ item.item || item.name || item.description }}</p>
          <p v-for="item in incident.prohibition_and_responsibilities || []" :key="item.id">• {{ item.name || item.description }}</p>
          <p v-if="!incident.student_duties?.length && !incident.prohibition_and_responsibilities?.length" class="text-slate-500">Nenhum item registrado.</p>
        </div>
      </section>
    </template>
  </MobileLayout>
</template>
