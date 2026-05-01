<script setup lang="ts">
import BaseButton from '../components/base-button/BaseButton.vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { ref } from 'vue';
import { useStore } from '../stores/useStore';
import { Icon } from '@iconify/vue';

const { setUser } = useStore();
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

  setUser(email.value);

  toast.success('Bem-vindo ao AquaGestão!', {
    progressClassName: 'bg-green-500',
    position: toast.POSITION.BOTTOM_RIGHT,
  });

  router.push({ name: 'dashboard' });
}
</script>

<template>
  <div
    class="w-full min-h-lvh flex items-center justify-center mx-auto bg-gradient-to-br from-base-300 to-base-100"
  >
    <form
      class="w-[450px] bg-base-200 flex flex-col gap-4 py-8 px-6 rounded-3xl shadow-xl"
      @submit.prevent="submit"
    >
      <div class="flex flex-col items-center gap-2 mb-4">
        <Icon icon="mdi:fish" class="size-12 text-primary" />
        <h2 class="text-2xl font-bold text-primary">AquaGestão</h2>
        <p class="text-sm opacity-60">Sistema de Gestão de Piscicultura</p>
      </div>

      <input
        v-model="email"
        type="email"
        placeholder="Digite seu e-mail"
        class="w-full input focus:input-primary"
      />

      <input
        v-model="password"
        type="password"
        placeholder="Digite sua senha"
        class="w-full mb-4 input focus:input-primary"
      />

      <BaseButton type="submit">
        <Icon icon="mdi:login" class="icon" />
        Entrar
      </BaseButton>
    </form>
  </div>
</template>
