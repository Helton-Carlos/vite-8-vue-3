<script setup lang="ts">
import Button from './components/Button.vue';
function click() {
  alert('hey');
}
</script>

<template>
  <h1 class="text-5xl font-bold bg-green-700 p-4">vue 3</h1>
  <Button @onClick="click"> Enviar alerta </Button>
</template>
