<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import { useStore } from '../../stores/useStore';
import { useRouter, useRoute } from 'vue-router';
import { toast } from 'vue3-toastify';
import type { IconTypes } from './types';

const store = useStore();
const router = useRouter();
const route = useRoute();

const paths = ref<IconTypes[]>([
  { title: 'Dashboard', path: '/', icon: 'mdi:view-dashboard' },
  { title: 'Tanques', path: '/tanques', icon: 'mdi:fishbowl-outline' },
  { title: 'Espécies', path: '/especies', icon: 'mdi:fish' },
  { title: 'Alimentação', path: '/alimentacao', icon: 'mdi:food-drumstick' },
  {
    title: 'Qualidade da Água',
    path: '/qualidade-agua',
    icon: 'mdi:water-check',
  },
  { title: 'Colheitas', path: '/colheitas', icon: 'mdi:basket-outline' },
]);

function isActive(path: string) {
  return route.path === path;
}

function handleLogout() {
  store.logout();
  toast.success('Logout realizado com sucesso', {
    progressClassName: 'bg-green-500',
    position: toast.POSITION.BOTTOM_RIGHT,
  });
  router.push('/login');
}
</script>

<template>
  <aside
    class="w-[260px] min-h-dvh flex flex-col bg-base-200 border-r border-base-300"
  >
    <div class="flex items-center gap-3 px-6 py-6">
      <div class="bg-primary rounded-xl p-2">
        <Icon icon="mdi:fish" class="size-6 text-primary-content" />
      </div>
      <div>
        <h1 class="text-base font-bold leading-tight">AquaGestão</h1>
        <p class="text-[10px] uppercase tracking-widest opacity-50">
          Piscicultura
        </p>
      </div>
    </div>

    <div class="divider my-0 px-4" />

    <nav class="flex-1 px-3 py-4">
      <ul class="space-y-1">
        <li v-for="item in paths" :key="item.title">
          <router-link
            :to="item.path"
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150"
            :class="
              isActive(item.path)
                ? 'bg-primary text-primary-content font-semibold shadow-md'
                : 'hover:bg-base-300 opacity-70 hover:opacity-100'
            "
          >
            <Icon :icon="item.icon" class="size-5" />
            {{ item.title }}
          </router-link>
        </li>
      </ul>
    </nav>

    <div class="divider my-0 px-4" />

    <div class="p-4">
      <button
        class="btn btn-ghost btn-sm w-full justify-start gap-3 opacity-70 hover:opacity-100"
        @click="handleLogout"
      >
        <Icon icon="mdi:logout" class="size-5" />
        Sair
      </button>
    </div>
  </aside>
</template>
