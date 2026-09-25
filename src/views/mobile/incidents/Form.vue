<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MobileLayout from '@/layouts/MobileLayout.vue'
import { create, find, options, update } from '@/services/incidents'
import { list as listStudents } from '@/services/students'

const route = useRoute()
const router = useRouter()
const editing = computed(() => Boolean(route.params.id))
const loading = ref(true)
const saving = ref(false)
const error = ref('')
const optionsData = ref({ assistants: [], sectors: [], type_incidents: [], student_duties: [], prohibition_and_responsibilities: [], sanctions: [] })
const students = ref([])
const studentSearch = ref('')
const form = reactive({
  type_incident_id: '',
  student_id: '',
  date_incident: new Date().toISOString().slice(0, 10),
  sector_id: '',
  assistant_id: '',
  time_incident: '',
  institution: '',
  description: '',
  soluction: '',
  is_resolved: false,
  visibility: 'public',
  type_student: '',
  sanction: '',
  student_duty_ids: [],
  prohibition_and_responsibility_ids: [],
})

const label = item => item?.name || item?.label || item?.item || item?.description || item?.title || item?.identifier || String(item?.id ?? item?.value ?? '')
const idOf = item => item?.id ?? item?.value
const loadStudents = async () => {
  const data = await listStudents(1, 'name', studentSearch.value)
  students.value = data.students || []
}

const load = async () => {
  loading.value = true
  error.value = ''
  try {
    optionsData.value = await options()
    await loadStudents()
    if (editing.value) {
      const data = await find(route.params.id)
      const incident = data.incident || {}
      Object.assign(form, {
        ...incident,
        type_incident_id: incident.type_incident?.id || incident.type_incident_id || '',
        student_id: incident.student?.id || incident.student_id || '',
        sector_id: incident.sector?.id || incident.sector_id || '',
        assistant_id: incident.assistant?.id || incident.assistant_id || '',
        student_duty_ids: (incident.student_duties || []).map(idOf),
        prohibition_and_responsibility_ids: (incident.prohibition_and_responsibilities || []).map(idOf),
      })
    }
  } catch (err) {
    error.value = err.messages?.[0] || 'Não foi possível carregar o formulário.'
  } finally {
    loading.value = false
  }
}

const save = async () => {
  saving.value = true
  error.value = ''
  try {
    const payload = {
      ...form,
      type_incident_id: form.type_incident_id || undefined,
      student_id: form.student_id || undefined,
      sector_id: form.sector_id || undefined,
      assistant_id: form.assistant_id || undefined,
    }
    if (editing.value) await update(route.params.id, payload)
    else await create(payload)
    router.replace('/mobile/incidents')
  } catch (err) {
    error.value = err.messages?.join(' ') || 'Não foi possível salvar a ocorrência.'
  } finally {
    saving.value = false
  }
}

onMounted(load)
</script>

<template>
  <MobileLayout>
    <div class="mb-5">
      <button class="mb-3 text-sm font-semibold text-green-700" @click="router.back()"><i class="fa-solid fa-arrow-left mr-2" />Voltar</button>
      <h2 class="text-2xl font-bold">{{ editing ? 'Editar ocorrência' : 'Nova ocorrência' }}</h2>
    </div>

    <div v-if="loading" class="rounded-2xl bg-white p-6 text-sm text-slate-500">Carregando...</div>
    <form v-else class="space-y-4" @submit.prevent="save">
      <div v-if="error" class="rounded-xl bg-red-50 p-4 text-sm text-red-700">{{ error }}</div>

      <section class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 class="font-bold">Identificação</h3>
        <label class="mt-4 block text-sm font-semibold">Estudante
          <select v-model="form.student_id" required class="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3">
            <option value="">Selecione</option>
            <option v-for="student in students" :key="student.id" :value="student.id">{{ student.name }}</option>
          </select>
        </label>
        <button type="button" class="mt-2 text-xs font-semibold text-green-700" @click="loadStudents">Atualizar estudantes</button>

        <label class="mt-4 block text-sm font-semibold">Tipo de ocorrência
          <select v-model="form.type_incident_id" required class="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3">
            <option value="">Selecione</option>
            <option v-for="item in optionsData.type_incidents" :key="idOf(item)" :value="idOf(item)">{{ label(item) }}</option>
          </select>
        </label>

        <label class="mt-4 block text-sm font-semibold">Tipo de estudante
          <input v-model="form.type_student" class="mt-2 w-full rounded-xl border border-slate-300 px-3 py-3" />
        </label>
      </section>

      <section class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 class="font-bold">Ocorrência</h3>
        <div class="mt-4 grid grid-cols-2 gap-3">
          <label class="text-sm font-semibold">Data<input v-model="form.date_incident" type="date" required class="mt-2 w-full rounded-xl border border-slate-300 px-3 py-3" /></label>
          <label class="text-sm font-semibold">Hora<input v-model="form.time_incident" type="time" class="mt-2 w-full rounded-xl border border-slate-300 px-3 py-3" /></label>
        </div>
        <label class="mt-4 block text-sm font-semibold">Setor
          <select v-model="form.sector_id" class="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3">
            <option value="">Selecione</option>
            <option v-for="item in optionsData.sectors" :key="idOf(item)" :value="idOf(item)">{{ label(item) }}</option>
          </select>
        </label>
        <label class="mt-4 block text-sm font-semibold">Responsável/assistente
          <select v-model="form.assistant_id" class="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3">
            <option value="">Selecione</option>
            <option v-for="item in optionsData.assistants" :key="idOf(item)" :value="idOf(item)">{{ label(item) }}</option>
          </select>
        </label>
        <label class="mt-4 block text-sm font-semibold">Instituição<input v-model="form.institution" class="mt-2 w-full rounded-xl border border-slate-300 px-3 py-3" /></label>
        <label class="mt-4 block text-sm font-semibold">Descrição<textarea v-model="form.description" required rows="5" class="mt-2 w-full rounded-xl border border-slate-300 px-3 py-3" /></label>
      </section>

      <section class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 class="font-bold">Regulamento</h3>
        <div class="mt-4 space-y-3">
          <label v-for="item in optionsData.student_duties" :key="idOf(item)" class="flex gap-3 text-sm">
            <input v-model="form.student_duty_ids" type="checkbox" :value="idOf(item)" class="mt-1" />
            <span>{{ label(item) }}</span>
          </label>
        </div>
        <h4 class="mt-5 font-semibold">Proibições e responsabilidades</h4>
        <div class="mt-3 space-y-3">
          <label v-for="item in optionsData.prohibition_and_responsibilities" :key="idOf(item)" class="flex gap-3 text-sm">
            <input v-model="form.prohibition_and_responsibility_ids" type="checkbox" :value="idOf(item)" class="mt-1" />
            <span>{{ label(item) }}</span>
          </label>
        </div>
      </section>

      <section v-if="optionsData.sanctions?.length" class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 class="font-bold">Sanção e solução</h3>
        <label class="mt-4 block text-sm font-semibold">Sanção
          <select v-model="form.sanction" class="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3">
            <option value="">Selecione</option>
            <option v-for="item in optionsData.sanctions" :key="item.value" :value="item.value">{{ item.label }}</option>
          </select>
        </label>
        <label class="mt-4 flex gap-3 text-sm font-semibold"><input v-model="form.is_resolved" type="checkbox" class="mt-1" /> Ocorrência resolvida</label>
        <label class="mt-4 block text-sm font-semibold">Solução<textarea v-model="form.soluction" rows="4" class="mt-2 w-full rounded-xl border border-slate-300 px-3 py-3" /></label>
      </section>

      <button :disabled="saving" class="w-full rounded-xl bg-green-700 px-4 py-3 font-bold text-white disabled:opacity-50">
        {{ saving ? 'Salvando...' : (editing ? 'Salvar alterações' : 'Registrar ocorrência') }}
      </button>
    </form>
  </MobileLayout>
</template>
