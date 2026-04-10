<script setup lang="ts">
import type { DropDown } from './types';

defineProps<DropDown>();
</script>

<template>
  <details class="dropdown">
    <summary class="btn m-1">
      {{ title }}
    </summary>
    <ul
      v-for="(item, index) in itens"
      :key="index"
      class="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
    >
      <li>
        <a :href="item.path">
          {{ item.name }}
        </a>
      </li>
    </ul>
  </details>
</template>
