<script setup lang="ts">
import BaseButton from './components/base-button/BaseButton.vue';
import BaseDropdown from './components/base-dropdown/BaseDropdown.vue';
import { useRouter } from 'vue-router';

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
  <header class="navbar bg-base-100 shadow-sm mb-8">
    <div class="navbar-start">
      <div class="dropdown">
        <div
          tabindex="0"
          role="button"
          class="btn btn-ghost btn-circle"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </div>
      </div>
    </div>

    <div class="navbar-center">
      <a class="btn btn-ghost text-xl">Vite-8</a>
    </div>

    <div class="navbar-end">
      <BaseDropdown
        title="Menu"
        :itens="dropDown"
      />
    </div>
  </header>

  <BaseButton @on-click="click">
    Enviar alerta
  </BaseButton>
</template>
