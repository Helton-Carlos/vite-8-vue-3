<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import { useStore } from '../../stores/useStore';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import type { IconTypes } from './types';
import BaseButton from '../base-button/BaseButton.vue';

const { logout } = useStore();
const router = useRouter();

const paths = ref<IconTypes[]>([
  {
    title: 'Dashboard',
    path: '/',
    icon: 'mdi:view-dashboard',
  },
  {
    title: 'Tanques',
    path: '/tanques',
    icon: 'mdi:fishbowl-outline',
  },
  {
    title: 'Espécies',
    path: '/especies',
    icon: 'mdi:fish',
  },
  {
    title: 'Alimentação',
    path: '/alimentacao',
    icon: 'mdi:food-drumstick',
  },
  {
    title: 'Qualidade da Água',
    path: '/qualidade-agua',
    icon: 'mdi:water-check',
  },
  {
    title: 'Colheitas',
    path: '/colheitas',
    icon: 'mdi:basket-outline',
  },
]);

function handleLogout() {
  logout();

  toast.success('Logout realizado com sucesso', {
    progressClassName: 'bg-green-500',
    position: toast.POSITION.BOTTOM_RIGHT,
  });

  router.push('/login');
}
</script>

<template>
  <div class="w-[260px] min-h-dvh menu bg-base-200 rounded-box flex flex-col">
    <div class="flex items-center gap-2 justify-center my-6">
      <Icon icon="mdi:fish" class="size-7 text-primary" />
      <h1 class="text-lg font-bold text-primary">AquaGestão</h1>
    </div>

    <ul class="flex-1 mt-4 space-y-1">
      <li v-for="item in paths" :key="item.title">
        <router-link :to="item.path" class="flex items-center gap-2">
          <Icon class="icon" :icon="item.icon" />
          {{ item.title }}
        </router-link>
      </li>
    </ul>

    <BaseButton class="m-6" @click="handleLogout">
      <Icon class="icon" icon="mdi:logout" />
      Sair
    </BaseButton>
  </div>
</template>
