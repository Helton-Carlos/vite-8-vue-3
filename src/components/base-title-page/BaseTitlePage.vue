<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const title = computed(() => {
  return route.meta.title || "Dashboard";
});
</script>

<template>
  <h2 class="text-lg font-bold m-8">
    {{ title }}
  </h2>
</template>
