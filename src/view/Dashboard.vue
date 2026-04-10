<script setup lang="ts">
import BaseButton from '../components/base-button/BaseButton.vue';

function click() {
  alert('test');
}
</script>

<template>
  <BaseButton @on-click="click">
    {{ $route.name }}
  </BaseButton>
</template>
