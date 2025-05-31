<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from '@/components/sidebar.vue'
import Button from '@/components/ui/button.vue'
import Breadcrumb from '@/components/breadcrumb.vue'
import Card from '@/components/ui/card.vue'
import Input from '@/components/ui/input.vue'
import Header from '@/components/header.vue'

const route = useRoute()
const studentId = ref(route.params.id)

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Administrador", href: "/administrador" },
  { label: "Estudantes", href: "/administrador/estudantes/listar" },
  { label: "Editar", href: `/administrador/estudantes/editar/${studentId.value}` },
];

const student = ref({
  id: studentId.value,
  name: "NAIANY GOMES DA SILVA",
  cpf: "080.184.921-74",
  birthdate: "2011-01-17",
  password: "",
  confirmPassword: "",
  responsible: "",
  contact: ""
})

const handleSubmit = async () => {
  // Implementar lógica de envio do formulário
  console.log('Formulário enviado', student.value)
}

onMounted(() => {
  // fetchStudent(studentId.value)
})

// const fetchStudent = async (id) => {
//   try {
//     const response = await findStudent(id)
//     student.value = response.student
//   } catch (error) {
//     console.error('Erro ao buscar dados do estudante:', error)
//   }
// }
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header />

    <div class="flex flex-col md:flex-row flex-1">
      <!-- Sidebar -->
      <Sidebar :activePage="'estudantes'" />

      <!-- Main Content -->
      <main class="flex-1 p-6">
        <Breadcrumb :items="breadcrumbItems" />

        <h1 class="text-2xl font-bold mb-6">Editar estudante</h1>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Dados Pessoais -->
          <Card customClass="mb-4">
            <div class="border-b border-gray-200 pb-2 mb-4">
              <h2 class="text-sm font-medium text-gray-500">Dados pessoais</h2>
            </div>
            
            <div class="grid grid-cols-1 gap-6 mb-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                <Input 
                  v-model="student.name"
                  type="text"
                  placeholder="Nome completo do estudante"
                  required
                />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">CPF</label>
                <Input 
                  v-model="student.cpf"
                  type="text"
                  placeholder="000.000.000-00"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento</label>
                <Input 
                  v-model="student.birthdate"
                  type="date"
                  required
                />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Senha para assinatura digital</label>
                <Input 
                  v-model="student.password"
                  type="password"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Confirmar senha</label>
                <Input 
                  v-model="student.confirmPassword"
                  type="password"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </Card>

          <!-- Dados do Responsável -->
          <Card customClass="mb-4">
            <div class="border-b border-gray-200 pb-2 mb-4">
              <h2 class="text-sm font-medium text-gray-500">Dados responsável</h2>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Responsável</label>
                <Input 
                  v-model="student.responsible"
                  type="text"
                  placeholder="Responsável"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Contato</label>
                <Input 
                  v-model="student.contact"
                  type="text"
                  placeholder="Email / Telefone"
                />
              </div>
            </div>
          </Card>

          <div class="flex justify-start">
            <Button customClass="bg-green-600 hover:bg-green-700 focus:ring-green-500">
              <i class="fa-solid fa-save mr-1"></i>
              Salvar
            </Button>
          </div>
        </form>
      </main>
    </div>
  </div>
</template>
