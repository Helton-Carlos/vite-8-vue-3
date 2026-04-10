<script setup lang="ts">
import BaseButton from '../components/base-button/BaseButton.vue';
</script>

<template>
  <BaseButton @on-click="click">
    {{ $route.name }}
  </BaseButton>
</template>
