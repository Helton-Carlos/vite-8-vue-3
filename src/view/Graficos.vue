<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div class="m-8">
    <h2 class="card-title">{{ router }}</h2>
  </div>
</template>
