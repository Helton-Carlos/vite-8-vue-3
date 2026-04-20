<script setup lang="ts">
import BaseSide from "./components/base-side/BaseSide.vue";
</script>

<template>
  <div class="flex">
    <BaseSide v-if="$route.name !== 'login'" />

    <RouterView />
  </div>
</template>
