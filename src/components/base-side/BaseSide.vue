<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { useStore } from "../../stores/useStore";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

import type { IconTypes } from "./types";
import BaseButton from "../base-button/BaseButton.vue";

const { logout } = useStore();
const router = useRouter();

const paths = ref<IconTypes[]>([
  {
    title: "Dashboard",
    path: "/",
    icon: "cil:file",
  },
  {
    title: "Listagem",
    path: "/listagem",
    icon: "cil:list",
  },
  {
    title: "Gráficos",
    path: "/graficos",
    icon: "cil:chart",
  },
]);

function handleLogout() {
  logout();

  toast.success("Logout realizado com sucesso", {
    progressClassName: "bg-green-500",
    position: toast.POSITION.BOTTOM_RIGHT,
  });

  router.push("/login");
}
</script>

<template>
  <div class="w-[285px] h-dvh menu bg-base-200 rounded-box">
    <h1 class="text-lg font-bold text-center my-8">
      Full projet
    </h1>

    <ul class="flex-1 mt-8">
      <li
        v-for="item in paths"
        :key="item.title"
      >
        <router-link :to="item.path">
          <Icon
            class="icon"
            :icon="item.icon"
          />
          {{ item.title }}
        </router-link>
      </li>
    </ul>

    <BaseButton
      class="m-10"
      @click="handleLogout"
    >
      <Icon
        class="icon"
        icon="cil:exit-to-app"
      />
      Sair
    </BaseButton>
  </div>
</template>
