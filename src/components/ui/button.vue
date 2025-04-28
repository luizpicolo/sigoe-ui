<script setup>
  defineProps({
    name: String,
    _class: String 
  })
</script>

<template>
  <button
    type="submit"
    :class="`flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${_class}`"
  >
    {{ name }}
  </button>
</template>
