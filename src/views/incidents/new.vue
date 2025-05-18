<script setup>
import Sidebar from '@/components/sidebar.vue'
import Button from '@/components/ui/button.vue'
import Breadcrumb from '@/components/breadcrumb.vue'
import Input from '@/components/ui/input.vue'
import Card from '@/components/ui/card.vue'
import Select from '@/components/ui/select.vue'

import { ref } from 'vue'

// https://github.com/HENNGE/vue3-pagination
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";


const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Administrador", href: "/" },
  { label: "Ocorrências", href: "/ocorrencias/ocorrencias/listar" },
  { label: "Nova", href: "/ocorrencias/ocorrencias/nova" },
];

const page = ref(1);
const updateHandler = (newPage) => {
  page.value = newPage;
  console.log(`Page updated to: ${newPage}`);
};
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
        <Breadcrumb :items="breadcrumbItems" />

        <h1 class="text-2xl font-bold mb-6">Cadastrar Nova Ocorrência</h1>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="p-1 rounded-lg shadow-sm">
            <Card customClass="mb-4" title="Dados do estudante">
              <div class="grid grid-cols-6 gap-6 mb-6">
                <div class="col-span-4">
                    <Select
                      id="student"
                      name="student"
                      label="Estudante"
                      v-model="selectedStudent"
                      :options="[
                        { value: '', label: 'Selecione um estudante' },
                        { value: 'john_doe', label: 'John Doe' },
                        { value: 'jane_smith', label: 'Jane Smith' },
                        { value: 'michael_brown', label: 'Michael Brown' },
                        { value: 'emily_davis', label: 'Emily Davis' },
                        { value: 'chris_johnson', label: 'Chris Johnson' }
                      ]"
                    />
                </div>
                <div class="col-span-2">
                  <Select
                      id="campus"
                      name="campus"
                      label="O estudante é?"
                      v-model="selectedCampus"
                      :options="[
                        { value: '', label: 'Selecione o tipo' },
                        { value: 'name', label: 'Nome' },
                        { value: 'course', label: 'Curso' },
                        { value: 'class', label: 'Turma' }
                      ]"
                    />
                </div>
              </div>
            </Card>

            <Card customClass="mb-4" title="Assistente">
              <div class="grid grid-cols-6 gap-6 mb-6">
                <div class="col-span-3">
                    <Select
                      id="student"
                      name="student"
                      label="Assistente"
                      v-model="selectedStudent"
                      :options="[
                        { value: '', label: 'Selecione um Assistente' },
                        { value: 'john_doe', label: 'John Doe' },
                        { value: 'jane_smith', label: 'Jane Smith' },
                        { value: 'michael_brown', label: 'Michael Brown' },
                        { value: 'emily_davis', label: 'Emily Davis' },
                        { value: 'chris_johnson', label: 'Chris Johnson' }
                      ]"
                    />
                </div>
                <div class="col-span-3">
                  <Select
                      id="campus"
                      name="campus"
                      label="Encaminhar para"
                      v-model="selectedCampus"
                      :options="[
                        { value: '', label: '' },
                        { value: 'name', label: 'Nome' },
                        { value: 'course', label: 'Curso' },
                        { value: 'class', label: 'Turma' }
                      ]"
                    />
                </div>
              </div>
            </Card>
          </div>  
        </form>

      </main>
    </div>
  </div>
</template>