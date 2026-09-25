<script setup>
import { onMounted, ref } from 'vue'
import MobileLayout from '@/layouts/MobileLayout.vue'
import { get as getDashboard } from '@/services/dashboard'

const data = ref(null)
const loading = ref(true)
const error = ref('')

const total = value => Array.isArray(value) ? value.reduce((sum, item) => sum + Number(item.count ?? item.total ?? 0), 0) : 0

const load = async () => {
  loading.value = true
  error.value = ''
  try {
    data.value = await getDashboard()
  } catch (err) {
    error.value = err.messages?.[0] || 'Não foi possível carregar o dashboard.'
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>

<template>
  <MobileLayout>
    <div class="mb-6">
      <p class="text-sm font-medium text-slate-500">Visão geral</p>
      <h2 class="text-2xl font-bold">Dashboard</h2>
    </div>

    <div v-if="loading" class="space-y-3">
      <div v-for="n in 4" :key="n" class="h-24 animate-pulse rounded-2xl bg-white shadow-sm" />
    </div>

    <div v-else-if="error" class="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
      {{ error }}
      <button class="mt-3 block font-bold underline" @click="load">Tentar novamente</button>
    </div>

    <template v-else>
      <div class="grid grid-cols-2 gap-3">
        <div v-for="item in [
          { label: 'Por ano', value: total(data?.by_years), icon: 'fa-calendar' },
          { label: 'Por curso', value: total(data?.by_courses), icon: 'fa-graduation-cap' },
          { label: 'Por tipo', value: total(data?.by_type_incident), icon: 'fa-tags' },
          { label: 'Por sanção', value: total(data?.by_sanction), icon: 'fa-gavel' },
        ]" :key="item.label" class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <i :class="['fa-solid', item.icon, 'text-green-700']" />
          <p class="mt-4 text-2xl font-bold">{{ item.value }}</p>
          <p class="text-xs text-slate-500">{{ item.label }}</p>
        </div>
      </div>

      <section class="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div class="flex items-center justify-between">
          <h3 class="font-bold">Situação das ocorrências</h3>
          <RouterLink to="/mobile/incidents" class="text-sm font-semibold text-green-700">Ver lista</RouterLink>
        </div>
        <div class="mt-4 space-y-3">
          <div v-for="item in (data?.by_is_resolved || [])" :key="JSON.stringify(item)" class="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-3 text-sm">
            <span>{{ item.is_resolved === true ? 'Resolvidas' : item.is_resolved === false ? 'Pendentes' : (item.label || item.name || 'Situação') }}</span>
            <strong>{{ item.count ?? item.total ?? 0 }}</strong>
          </div>
          <p v-if="!data?.by_is_resolved?.length" class="text-sm text-slate-500">Nenhum dado disponível.</p>
        </div>
      </section>
    </template>
  </MobileLayout>
</template>
