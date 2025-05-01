<script setup>
import Sidebar from '@/components/sidebar.vue'
import Button from '@/components/ui/button.vue'
import Breadcrumb from '@/components/breadcrumb.vue'
import Card from '@/components/ui/card.vue'
import Input from '@/components/ui/input.vue'

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Administrador", href: "/administrador" },
  { label: "Usuários", href: "/administrador/usuarios" },
  { label: "Novo Usuário", href: "/administrador/usuarios/novo" }
];
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
          <div class="mb-6 p-1 rounded-lg shadow-sm">
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
                  <label :for="id" class="mb-2 block text-sm font-medium text-gray-700">Campus</label>
                  <select
                    class="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm">
                    <option value="name">Nome</option>
                    <option value="course">Curso</option>
                    <option value="class">Turma</option>
                  </select>
                </div>
              </div>
            </Card>
            <Card title="Dados Pessoais">

            </Card>
          </div>
        </form>
      </main>
    </div>
  </div>
</template>