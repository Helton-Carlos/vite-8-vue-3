<script setup lang="ts">
defineProps<{
  id: string;
  title: string;
  size?: 'sm' | 'md' | 'lg';
}>();

defineEmits(['close']);
</script>

<template>
  <dialog :id="id" class="modal">
    <div
      class="modal-box"
      :class="{ 'max-w-2xl': size === 'md', 'max-w-4xl': size === 'lg' }"
    >
      <form method="dialog">
        <button
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          @click="$emit('close')"
        >
          ✕
        </button>
      </form>
      <h3 class="text-lg font-bold mb-4">{{ title }}</h3>
      <slot />
    </div>
    <form method="dialog" class="modal-backdrop">
      <button @click="$emit('close')">close</button>
    </form>
  </dialog>
</template>
