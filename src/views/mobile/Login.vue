<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/services/authentication'

const router = useRouter()
const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const submit = async () => {
  error.value = ''
  loading.value = true

  try {
    await login(username.value.trim(), password.value)
    router.replace('/mobile/dashboard')
  } catch (err) {
    error.value = err.messages?.[0] || 'Usuário ou senha inválidos.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="min-h-screen bg-slate-50 px-5 py-10">
    <div class="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md flex-col justify-center">
      <div class="mb-8 text-center">
        <img src="/logo.png" alt="Instituto Federal de Mato Grosso do Sul" class="mx-auto mb-5 h-24 w-auto object-contain" />
        <p class="text-sm font-bold uppercase tracking-[0.25em] text-green-700">SIGOE</p>
        <h1 class="mt-2 text-2xl font-bold text-slate-900">Acesso ao sistema</h1>
        <p class="mt-2 text-sm text-slate-500">Gerenciamento de ocorrências escolares</p>
      </div>

      <form class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" @submit.prevent="submit">
        <div v-if="error" class="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{{ error }}</div>

        <label class="block text-sm font-semibold text-slate-700">
          Usuário
          <input v-model="username" autocomplete="username" required class="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100" />
        </label>

        <label class="mt-4 block text-sm font-semibold text-slate-700">
          Senha
          <input v-model="password" type="password" autocomplete="current-password" required class="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100" />
        </label>

        <button :disabled="loading" class="mt-6 w-full rounded-xl bg-green-700 px-4 py-3 font-bold text-white disabled:opacity-60">
          {{ loading ? 'Entrando...' : 'Entrar' }}
        </button>
      </form>
    </div>
  </main>
</template>
