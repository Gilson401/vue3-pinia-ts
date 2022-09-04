<template>
  <header class="text-center p-4">
    <h3 class="text-3xl">{{ title }}</h3>
    <p>{{ description }}</p>
  </header>
</template>

<script setup lang="ts">
// tipagem das props
interface Props {
  title?: string;
  description?: string;
}
// conforme documentação precisa declarar a const props ainda que o linter acuse desuso
const props = defineProps<Props>();
</script>

<style lang="scss">
.icon-footer {
  font-size: 1.3em;
}
</style>
