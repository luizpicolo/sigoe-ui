<script setup>
import { ref, onMounted } from 'vue'
import Input from '@/components/ui/input.vue'
import { useRouter } from 'vue-router'
import { isTokenValid } from '@/services/authentication'
import axios from 'axios'

const router = useRouter()
const username = ref('')
const password = ref('')
const error = ref('')

onMounted(async () => {
  if (await isTokenValid()) {
    router.push('/home')
  } else {
    router.push('/')
  }
})

const handleSubmit = async () => {
  error.value = ''
  try {
    const response = await axios.post('http://localhost:3000/api/auth/login', {
      user: {
        username: username.value,
        password: password.value
      }
    })
    
    // O token JWT vem no header 'Authorization'
    const token = response.headers['authorization']
    if (token) {
      localStorage.setItem('jwt', token)
      router.push('/home')
    } else {
      error.value = 'Token não recebido. Tente novamente.'
    }
  } catch (err) {
    error.value = 'Usuário ou senha inválidos'
  }
}
</script>

<template>
  <main>
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div class="flex flex-col items-center">
          <img src="/logo.png" alt="Instituto Federal Mato Grosso do Sul" width="120" height="113" />
        </div>

        <div class="bg-white p-8 border border-gray-200 rounded-md shadow-sm">
          <div class="text-center mb-6">
            <h1 class="text-2xl font-bold">SIGOE</h1>
            <p class="text-gray-600 text-sm">Sistema para o gerenciamento de ocorrências escolares</p>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <Input
              id="username"
              name="username"
              label="Usuário"
              v-model="username"
              required
            />
            <Input
              id="password"
              name="password"
              label="Senha"
              type="password"
              v-model="password"
              required
            />
            <div v-if="error" class="text-red-600 text-sm text-center">{{ error }}</div>
            <div>
              <button
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Entrar
              </button>
            </div>
          </form>
        </div>

        <div class="text-center text-sm text-gray-600">
          <p>Instituto Federal de Mato Grosso do Sul</p>
          <p>SIGOE - 3.0.0</p>
        </div>
      </div>
    </div>
  </main>
</template>