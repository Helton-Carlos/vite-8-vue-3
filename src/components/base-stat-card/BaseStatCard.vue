<script setup lang="ts">
import { Icon } from '@iconify/vue';

defineProps<{
  title: string;
  value: string | number;
  icon: string;
  color?:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';
  description?: string;
}>();
</script>

<template>
  <div class="stat bg-base-200 rounded-box shadow-sm">
    <div class="stat-figure" :class="`text-${color || 'primary'}`">
      <Icon :icon="icon" class="size-8" />
    </div>
    <div class="stat-title">{{ title }}</div>
    <div class="stat-value" :class="`text-${color || 'primary'}`">
      {{ value }}
    </div>
    <div v-if="description" class="stat-desc">{{ description }}</div>
  </div>
</template>
