<script setup>
  defineProps({
    color: String,
    customClass: String,
    type: {
      type: String,
      default: 'submit'
    },
    to: String
  })
</script>

<template>
  <RouterLink :to="to">
    <button
      type="'{{ type }}'"
      :class="`bg-${color}-600 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white  hover:bg-${color}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}-500 ${customClass}`">
      <slot>{{ name }}</slot>
    </button>
  </RouterLink>
</template>
