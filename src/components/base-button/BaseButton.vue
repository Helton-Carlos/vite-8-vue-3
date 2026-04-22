<script setup lang="ts">
defineProps<{
  type?: "button" | "submit" | "reset";
}>();

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
