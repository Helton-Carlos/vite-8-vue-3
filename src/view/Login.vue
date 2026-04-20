<script setup lang="ts">
import BaseButton from "../components/base-button/BaseButton.vue";
import { useRouter } from "vue-router";

const router = useRouter();

function click() {
  router.push({ name: "dashboard" });
}
</script>

<template>
  <BaseButton @on-click="click">
    {{ $route.name }}
  </BaseButton>
</template>
