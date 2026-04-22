<script setup lang="ts">
import type { Button } from "./types";

defineProps<Button>();

defineEmits(["onClick"]);
</script>

<template>
  <button
    :type="type"
    class="btn btn-success"
    @click="$emit('onClick')"
  >
    <slot />
  </button>
</template>
