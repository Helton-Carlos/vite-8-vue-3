<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import BaseSide from './components/base-side/BaseSide.vue';
import BaseHeader from './components/base-header/BaseHeader.vue';

const route = useRoute();

const isRouteLogin = computed(() => route?.name === 'login');
</script>

<template>
  <div :class="isRouteLogin ? 'block' : 'flex'">
    <BaseSide v-if="!isRouteLogin" />

    <div class="flex-1 min-h-dvh flex flex-col bg-base-100">
      <BaseHeader v-if="!isRouteLogin" />
      <main class="flex-1 p-6 lg:p-8">
        <RouterView />
      </main>
    </div>
  </div>
</template>
