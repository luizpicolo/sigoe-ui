<script setup>
  defineProps({
    title: String,
    description: String,
    customClass: String
  })
</script>

<template>
  <div :class="`bg-white p-4 border border-gray-200 rounded-md ${ customClass }`">
    <h1 class="text-2xl font-extrabold mb-2">{{ title }}</h1>
    <p class="text-sm text-gray-600">{{ description }}</p>
    <slot></slot>
  </div>
</template>