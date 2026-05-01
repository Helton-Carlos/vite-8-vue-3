<script setup lang="ts">
defineProps<{
  variant?:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'ghost';
}>();

const variantMap: Record<string, string> = {
  primary: 'badge-primary',
  secondary: 'badge-secondary',
  accent: 'badge-accent',
  info: 'badge-info',
  success: 'badge-success',
  warning: 'badge-warning',
  error: 'badge-error',
  ghost: 'badge-ghost',
};
</script>

<template>
  <span class="badge" :class="variantMap[variant || 'ghost']">
    <slot />
  </span>
</template>
