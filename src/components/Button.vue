<script setup lang="ts"></script>

<template>
  <button class="btn btn-success" @click="$emit('onClick')">
    <slot />
  </button>
</template>
