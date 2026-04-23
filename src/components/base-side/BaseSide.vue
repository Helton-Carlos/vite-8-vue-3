<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import type { IconTypes } from "./types";

const paths = ref<IconTypes[]>([
  {
    title: "Dashboard",
    path: "/",
    icon: "cil:file",
  },
  {
    title: "Listagem",
    path: "/listagem",
    icon: "cil:locomotive",
  },
  {
    title: "Gráficos",
    path: "/graficos",
    icon: "cil:locomotive",
  },
]);
</script>

<template>
  <div class="menu bg-base-200 rounded-box w-[285px] h-dvh">
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

    <RouterLink
      to="/login"
      class="btn btn-error flex items-center gap-4 m-10 btn"
    >
      <Icon
        class="icon"
        icon="cil:exit-to-app"
      />
      Sair
    </RouterLink>
  </div>
</template>
