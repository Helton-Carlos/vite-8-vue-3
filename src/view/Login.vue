<script setup lang="ts">
import BaseButton from "../components/base-button/BaseButton.vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { ref } from "vue";
import { useStore } from "../stores/useStore";

const { setUser } = useStore();
const router = useRouter();
const email = ref("");
const password = ref("");

function submit() {
  if (!email.value || !password.value) {
    toast.error("Preencha os campos corretamente", {
      progressClassName: "bg-red-500",
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    return;
  }

  setUser(email.value);

  toast.success("Seja-bem vindo(a)", {
    progressClassName: "bg-green-500",
    position: toast.POSITION.BOTTOM_RIGHT,
  });

  router.push({ name: "dashboard" });
}
</script>

<template>
  <div class="w-full min-h-lvh flex items-center justify-center mx-auto">
    <form
      class="w-[450px] bg-black flex flex-col gap-4 py-8 px-4 rounded-3xl"
      @submit.prevent="submit"
    >
      <h3>Faça seu login</h3>

      <input
        v-model="email"
        type="email"
        placeholder="Digite seu e-mail"
        class="w-full input focus:input-success"
      >

      <input
        v-model="password"
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
