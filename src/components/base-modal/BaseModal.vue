<script setup lang="ts">
defineProps<{
  id: string;
  title: string;
  size?: 'sm' | 'md' | 'lg';
}>();

defineEmits(['close']);
</script>

<template>
  <dialog
    :id="id"
    class="modal modal-bottom sm:modal-middle"
  >
    <div
      class="modal-box bg-base-200"
      :class="{ 'max-w-2xl': size === 'md', 'max-w-4xl': size === 'lg' }"
    >
      <form method="dialog">
        <button
          class="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
          @click="$emit('close')"
        >
          ✕
        </button>
      </form>
      <h3 class="text-lg font-bold mb-6">
        {{ title }}
      </h3>
      <slot />
    </div>
    <form
      method="dialog"
      class="modal-backdrop"
    >
      <button @click="$emit('close')">
        close
      </button>
    </form>
  </dialog>
</template>
