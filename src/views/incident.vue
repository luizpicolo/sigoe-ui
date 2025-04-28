<script setup>
  import Sidebar from '@/components/sidebar.vue'
  import Button from '@/components/ui/button.vue'
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
      <Sidebar :activePage="'ocorrencias'" />

      <!-- Main Content -->
      <main class="flex-1 p-6">
        <h1 class="text-2xl font-bold mb-6">Ocorrências</h1>

        <div class="flex justify-between items-center mb-6">
          <p class="text-gray-600">Gerencie as ocorrências do sistema</p>
          <router-link to="/ocorrencias/nova">
            <Button />
          </router-link>
        </div>

        <div class="bg-white rounded-md shadow p-6">
          <p class="text-center text-gray-500">
            Selecione "Nova Ocorrência" para registrar um novo evento ou acesse a "Lista de Ocorrências" no menu
            lateral.
          </p>
        </div>
      </main>
    </div>
  </div>
</template>