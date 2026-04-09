<script setup lang="ts">
defineEmits<{
  onClick: [];
}>();
</script>

<template>
  <button
    class="btn btn-success"
    @click="$emit('onClick')"
  >
    <slot />
  </button>
</template>
