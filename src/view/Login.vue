<script setup lang="ts">
import BaseButton from "../components/base-button/BaseButton.vue";
import { useRouter } from "vue-router";

const router = useRouter();

function submit() {
  router.push({ name: "dashboard" });
}
</script>

<template>
  <div class="w-full min-h-lvh flex">
    <form
      class="w-[450px] bg-black flex flex-col py-8 px-4 m-auto gap-4 rounded-3xl"
      @submit.prevent="submit"
    >
      <h3>Faça seu login</h3>

      <input
        type="email"
        placeholder="Digite seu e-mail"
        class="w-full input focus:input-success"
      >

      <input
        type="password"
        placeholder="Digite sua senha"
        class="w-full mb-4 input focus:input-success"
      >

      <BaseButton type="submit">
        Sing-in
      </BaseButton>
    </form>
  </div>
</template>
