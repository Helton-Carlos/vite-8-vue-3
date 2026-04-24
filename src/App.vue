<script setup lang="ts">
import BaseSide from "./components/base-side/BaseSide.vue";
import BaseTitlePage from "./components/base-title-page/BaseTitlePage.vue";
</script>

<template>
  <div :class="$route.name !== 'login' ? 'flex' : 'block'">
    <BaseSide v-if="$route.name !== 'login'" />

    <div>
      <BaseTitlePage v-if="$route.name !== 'login'" />
      <RouterView />
    </div>
  </div>
</template>
