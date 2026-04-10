<script setup lang="ts">
import BaseButton from '../base-button/BaseButton.vue';
import { Icon } from '@iconify/vue';
</script>

<template>
  <div class="menu bg-base-200 rounded-box w-[285px] h-dvh">
    <h1 class="text-lg font-bold text-center my-8">
      Testing
    </h1>

    <ul class="flex-1 mt-8">
      <li>
        <a>
          <Icon
            class="icon"
            icon="cil:file"
          />
          Item 2
        </a>
      </li>
      <li>
        <a>
          <Icon
            class="icon"
            icon="cil:locomotive"
          />
          Item 1
        </a>
      </li>
      <li>
        <a>
          <Icon
            class="icon"
            icon="cil:locomotive"
          />
          Item 3
        </a>
      </li>
    </ul>

    <BaseButton class="flex items-center gap-4 m-10">
      <Icon
        class="icon"
        icon="cil:exit-to-app"
      />
      Sair
    </BaseButton>
  </div>
</template>
