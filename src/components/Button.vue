<script setup lang="ts"></script>

<template>
  <button
    class="bg-green-700 text-white px-2 py-2 my-2 rounded hover:bg-green-300 hover:cursor-pointer"
    @click="$emit('onClick')"
  >
    <slot />
  </button>
</template>
