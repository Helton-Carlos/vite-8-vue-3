<script setup lang="ts">
import BaseButton from '../components/base-button/BaseButton.vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { ref } from 'vue';
import { useStore } from '../stores/useStore';
import { Icon } from '@iconify/vue';

const store = useStore();
const router = useRouter();
const email = ref('');
const password = ref('');

function submit() {
  if (!email.value || !password.value) {
    toast.error('Preencha os campos corretamente', {
      progressClassName: 'bg-red-500',
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    return;
  }

  store.setUser(email.value);

  toast.success('Bem-vindo ao AquaGestão!', {
    progressClassName: 'bg-green-500',
    position: toast.POSITION.BOTTOM_RIGHT,
  });

  router.push({ name: 'dashboard' });
}
</script>

<template>
  <div
    class="w-full min-h-dvh flex items-center justify-center bg-base-200 relative overflow-hidden"
  >
    <div class="absolute inset-0 opacity-5">
      <div
        class="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full blur-3xl"
      />
      <div
        class="absolute bottom-20 right-20 w-96 h-96 bg-secondary rounded-full blur-3xl"
      />
    </div>

    <div class="absolute top-6 right-6">
      <label class="swap swap-rotate btn btn-ghost btn-circle btn-sm">
        <input
          type="checkbox"
          :checked="store.theme === 'dark'"
          @change="store.toggleTheme()"
        >
        <Icon
          icon="mdi:weather-sunny"
          class="swap-off size-5"
        />
        <Icon
          icon="mdi:weather-night"
          class="swap-on size-5"
        />
      </label>
    </div>

    <form
      class="relative w-full max-w-md bg-base-100 flex flex-col gap-5 p-8 rounded-2xl shadow-2xl border border-base-300 mx-4"
      @submit.prevent="submit"
    >
      <div class="flex flex-col items-center gap-3 mb-2">
        <div class="bg-primary rounded-2xl p-4 shadow-lg">
          <Icon
            icon="mdi:fish"
            class="size-10 text-primary-content"
          />
        </div>
        <h2 class="text-2xl font-bold">
          AquaGestão
        </h2>
        <p class="text-sm opacity-50">
          Sistema de Gestão de Piscicultura
        </p>
      </div>

      <div class="form-control">
        <label class="label">
          <span
            class="label-text text-xs font-medium uppercase tracking-wide opacity-60"
          >E-mail</span>
        </label>
        <label class="input input-bordered flex items-center gap-2">
          <Icon
            icon="mdi:email-outline"
            class="size-4 opacity-40"
          />
          <input
            v-model="email"
            type="email"
            placeholder="seu@email.com"
            class="grow"
          >
        </label>
      </div>

      <div class="form-control">
        <label class="label">
          <span
            class="label-text text-xs font-medium uppercase tracking-wide opacity-60"
          >Senha</span>
        </label>
        <label class="input input-bordered flex items-center gap-2">
          <Icon
            icon="mdi:lock-outline"
            class="size-4 opacity-40"
          />
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="grow"
          >
        </label>
      </div>

      <BaseButton
        type="submit"
        class="mt-2"
      >
        <Icon
          icon="mdi:login"
          class="icon"
        />
        Entrar
      </BaseButton>
    </form>
  </div>
</template>
