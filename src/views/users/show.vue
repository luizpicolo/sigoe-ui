<script setup>
import Sidebar from '@/components/sidebar.vue'
import Button from '@/components/ui/button.vue'
import Breadcrumb from '@/components/breadcrumb.vue'
import Card from '@/components/ui/card.vue'

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Administrador", href: "/administrador" },
  { label: "Usuários", href: "/administrador/usuarios" },
  { label: "Visualizar", href: "/administrador/usuarios/visualizar" },
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

        <h1 class="text-2xl font-bold mb-1">Detalhes do Usuário</h1>

        <div class="flex justify-end">
          <Button to="/administrador/usuarios/listar" customClass="bg-white border-gray-200 !text-gray-900 hover:bg-gray-100 !focus:ring-gray-300">
            <i class="fa-solid fa-arrow-left"></i>
            Voltar
          </Button>
        </div>

        <div class="grid grid-cols-4 gap-4 mb-6 mt-4 rounded-lg shadow-sm">
          <Card customClass="col-span-1 " title="Foto">
            <div class="flex justify-center items-center mt-5 pt-2 pb-5">
              <img src="/placeholder.svg" width="200" alt="" srcset="">
            </div>
          </Card>
          <Card customClass="col-span-3" title="Informações Pessoais">
            <dl className="divide-y divide-gray-200">
              <div className="py-3 grid grid-cols-3">
                <dt className="text-sm font-medium text-gray-500">Nome completo</dt>
                <dd className="text-sm text-gray-900 col-span-2">Luiz Fernando Picolo</dd>
              </div>
              <div className="py-3 grid grid-cols-3">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="text-sm text-gray-900 col-span-2">luiz.picolo@ifms.edu.br</dd>
              </div>
              <div className="py-3 grid grid-cols-3">
                <dt className="text-sm font-medium text-gray-500">SIAPE</dt>
                <dd className="text-sm text-gray-900 col-span-2">1357157</dd>
              </div>
              <div className="py-3 grid grid-cols-3">
                <dt className="text-sm font-medium text-gray-500">Campus</dt>
                <dd className="text-sm text-gray-900 col-span-2">Nova Andradina</dd>
              </div>
            </dl>
          </Card>
          <Card customClass="col-span-1" title="Ações">
            <Button to="/administrador/usuarios/permissoes/9" customClass="mt-4 w-full bg-green-600 hover:bg-green-700 focus:ring-green-500">
                <i class="fa-solid fa-edit"></i>
              Gerenciar Permissões
            </Button>
            <Button customClass="mt-4 w-full bg-blue-600 hover:bg-blue-700 focus:ring-blue-500">
              <i class="fa-solid fa-edit"></i>
              Editar Usuário
            </Button>
            <Button customClass="mt-4 w-full bg-red-600 hover:bg-red-700 focus:ring-red-500">
              <i class="fa-solid fa-trash-alt"></i>
              Excluir Usuário
            </Button>
          </Card>
          <Card customClass="col-span-3" title="Informações de Acesso" description="Aqui será um diagrama">
            <dl className="divide-y divide-gray-200">
              <div className="py-3 grid grid-cols-3">
                <dt className="text-sm font-medium text-gray-500">Nome de usuário</dt>
                <dd className="text-sm text-gray-900 col-span-2">Luiz Fernando Picolo</dd>
              </div>
              <div className="py-3 grid grid-cols-3">
                <dt className="text-sm font-medium text-gray-500">Administrador</dt>
                <dd className="text-sm text-gray-900 col-span-2">
                  <span
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Ativo
                  </span>
                </dd>
              </div>
              <div className="py-3 grid grid-cols-3">
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="text-sm text-gray-900 col-span-2">
                  <span
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Ativo
                  </span>
                </dd>
              </div>
              <div className="py-3 grid grid-cols-3">
                <dt className="text-sm font-medium text-gray-500">Data de criação</dt>
                <dd className="text-sm text-gray-900 col-span-2">10/10/2025</dd>
              </div>
              <div className="py-3 grid grid-cols-3">
                <dt className="text-sm font-medium text-gray-500">Último acesso</dt>
                <dd className="text-sm text-gray-900 col-span-2">10/10/2025</dd>
              </div>
            </dl>
          </Card>
        </div>
      </main>
    </div>
  </div>
</template>