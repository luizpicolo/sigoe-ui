<script setup>
import Sidebar from '@/components/sidebar.vue'
import Button from '@/components/ui/button.vue'
import Breadcrumb from '@/components/breadcrumb.vue'
import Card from '@/components/ui/card.vue'
import Input from '@/components/input.vue'

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Administrador", href: "/administrador" },
  { label: "Usuários", href: "/administrador/usuarios" },
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

        <h1 class="text-2xl font-bold mb-6">Usuários</h1>

        <div class="bg-white rounded-md shadow p-4 mb-6">
          <div class="flex flex-wrap gap-2">
            <a href="/administrador/estudantes/novo">
              <Button color="green">
                <i class="fa-solid fa-user"></i>
                Novo Estudante
              </Button>
            </a>

            <div class="flex items-center gap-2 ml-auto">
              <span class="text-sm">Ordenar por</span>
              <div class="relative w-[180px]">
                <select
                  class="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm">
                  <option value="name">Nome</option>
                  <option value="course">Curso</option>
                  <option value="class">Turma</option>
                </select>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <span class="text-sm">Total</span>
              <div class="relative w-[80px]">
                <select
                  class="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm">
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <Input type="text" placeholder="Buscar..." class="w-[200px]" />
              <Button color="green">
                <i class="fa-solid fa-magnifying-glass"></i>
                Busca
              </Button>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-md shadow overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-100">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campus
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuário
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Admin
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ativo
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody v-for="(value, i) in 5" class="bg-white divide-y divide-gray-200">
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Luiz Picolo</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">luiz.picolo@ifms.edu.br</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Aquidauana</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">luiz.picolo</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sim</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sim</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Button customClass="w-full" color="green" to="/administrador/usuarios/visualizar/9">
                    <i class="fa-solid fa-eye"></i>
                    Visualizar
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  </div>
</template>