<script setup>
  defineProps({
    title: String,
    description: String
  })
</script>

<template>
  <div class="bg-white p-4 bg-gray-50 border border-gray-200 rounded-md">
    <h2 class="text-lg font-semibold mb-2">{{ title }}</h2>
    <p class="text-sm text-gray-600">{{ description }}</p>
  </div>
</template>