<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import BaseSide from "./components/base-side/BaseSide.vue";
import BaseTitlePage from "./components/base-title-page/BaseTitlePage.vue";

const route = useRoute();

const isRouteLogin = computed(() => {
  return route?.name === "login";
});
</script>

<template>
  <div :class="isRouteLogin ? 'block' : 'flex'">
    <BaseSide v-if="!isRouteLogin" />

    <div>
      <BaseTitlePage v-if="!isRouteLogin" />
      <div class="m-8">
        <RouterView />
      </div>
    </div>
  </div>
</template>
