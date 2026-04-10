<script setup lang="ts">
import BaseButton from './components/base-button/BaseButton.vue';
import { useRouter } from 'vue-router';
import BaseSide from './components/base-side/BaseSide.vue';

const router = useRouter();

const dropDown = [
  {
    path: 'test',
    name: 'test-title',
  },
];

function click() {
  router.push('/dashboard');
}
</script>

<template>
  <div class="flex">
    <BaseSide />

    <BaseButton @on-click="click">
      Enviar alerta
    </BaseButton>
  </div>
</template>
