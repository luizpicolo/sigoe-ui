<script setup>
import Sidebar from '@/components/sidebar.vue'
import Button from '@/components/ui/button.vue'
import Breadcrumb from '@/components/breadcrumb.vue'
import Card from '@/components/ui/card.vue'
import Input from '@/components/ui/input.vue'
import Select from '@/components/ui/select.vue'

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Administrador", href: "/administrador" },
  { label: "Usuários", href: "/administrador/usuarios" },
  { label: "Novo Usuário", href: "/administrador/usuarios/novo" }
];

const updateHandler = () => {
  alert(123)
}

</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200 py-2 px-4 flex justify-between items-center">
      <div class="flex items-center">
        <img src="/logo_ifms.png" width="160">
      </div>
      <div class="text-sm">
        SIGOE - Controle de ocorrências escolares - <span class="text-green-600">Sair</span>
      </div>
    </header>

    <div class="flex flex-col md:flex-row flex-1">
      <!-- Sidebar -->
      <Sidebar :activePage="'usuarios'" />

      <!-- Main Content -->
      <main class="flex-1 p-6">
        <Breadcrumb :items="breadcrumbItems" />

        <h1 class="text-2xl font-bold mb-6">Cadastrar Novo Usuário</h1>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="p-1 rounded-lg shadow-sm">
            <Card customClass="mb-4" title="Dados Pessoais">
              <div class="grid grid-cols-6 gap-6 mb-6 p-1">
                <div class="col-span-4">
                  <Input
                    id="user"
                    name="user"
                    label="Nome Completo*"
                    v-model="user"
                    placeholder="Nome completo do usuário"
                    required
                  />
                </div>
                <div class="col-span-1">
                  Foto de Perfil
                  <img src="/placeholder.svg?height=48&width=48" width="150" alt="" srcset="">
                </div>
                <div class="col-span-1">
                  <Button customClass="mt-20 w-full bg-green-600 hover:bg-green-700 focus:ring-green-500">
                      <i class="fa-solid fa-edit"></i>
                    Selecionar foto
                  </Button>
                </div>
              </div>
            </Card>
            <Card customClass="mb-4" title="Dados institucionais">
              <div class="grid grid-cols-6 gap-6 mb-6 p-1">
                <div class="col-span-2">
                  <Input
                    id="user"
                    name="user"
                    label="Email Institucional*"
                    v-model="user"
                    placeholder="email@ifms.edu.br"
                    required
                  />
                </div>
                <div class="col-span-2">
                  <Input
                    id="user"
                    name="user"
                    label="SIAPE*"
                    v-model="user"
                    placeholder="Número SIAPE"
                    required
                  />
                </div>
                <div class="col-span-2">
                    <Select
                      id="campus"
                      name="campus"
                      label="Campus"
                      v-model="selectedCampus"
                      :options="[
                        { value: '', label: 'Selecione um campus' },
                        { value: 'name', label: 'Nome' },
                        { value: 'course', label: 'Curso' },
                        { value: 'class', label: 'Turma' }
                      ]"
                    />
                </div>
              </div>
            </Card>
            <Card title="Dados Pessoais">
              <div class="grid grid-cols-6 gap-6 p-1">
                <div class="col-span-2">
                  <Input
                    id="user"
                    name="user"
                    label="Nome de Usuário*"
                    v-model="user"
                    placeholder="email@ifms.edu.br"
                    required
                  />
                </div>
                <div class="col-span-2">
                  <Input
                    id="user"
                    name="user"
                    type="password"
                    label="Senha*"
                    v-model="user"
                    placeholder="Número SIAPE"
                    required
                  />
                </div>
                <div class="col-span-2 mt-3">
                  <Input
                    id="user"
                    type="password"
                    name="user"
                    label="Confirmar senha*"
                    v-model="user"
                    placeholder="Número SIAPE"
                    required
                  />
                </div>
              </div>

              <div class="grid grid-cols-8 gap-2">
                <div class="col-span-1">
                  <input type="checkbox" name="Administrador" />
                  Administrador? 
                </div>  
                <div class="col-span-1">
                  <input type="checkbox" name="Administrador" />
                  Usuário ativo? 
                </div>  
              </div>
            </Card>
          </div>
          <div class="flex justify-end">
            <Button customClass="mr-2 bg-white !border-gray-400 !text-gray-900 hover:bg-gray-100 focus:ring-gray-300">
              Cancelar
            </Button>
            <Button customClass="bg-green-600 hover:bg-green-700 focus:ring-green-500">
            <i class="fa-solid fa-save"></i>
            Cadastrar usuário
          </Button>
          </div>
          
        </form>
      </main>
    </div>
  </div>
</template>