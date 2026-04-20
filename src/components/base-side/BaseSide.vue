<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import type { IconTypes } from "./types";

const paths = ref<IconTypes[]>([
  {
    title: "Item 1",
    path: "item-1",
    icon: "cil:file",
  },
  {
    title: "Item 2",
    path: "item-2",
    icon: "cil:locomotive",
  },
  {
    title: "Item 3",
    path: "item-3",
    icon: "cil:locomotive",
  },
]);
</script>

<template>
  <div class="menu bg-base-200 rounded-box w-[285px] h-dvh">
    <h1 class="text-lg font-bold text-center my-8">
      Testing
    </h1>

    <ul class="flex-1 mt-8">
      <li
        v-for="item in paths"
        :key="item.title"
      >
        <a>
          <Icon
            class="icon"
            :icon="item.icon"
          />
          {{ item.title }}
        </a>
      </li>
    </ul>

    <RouterLink
      to="/login"
      class="flex items-center gap-4 m-10 btn"
    >
      <Icon
        class="icon"
        icon="cil:exit-to-app"
      />
      Sair
    </RouterLink>
  </div>
</template>
