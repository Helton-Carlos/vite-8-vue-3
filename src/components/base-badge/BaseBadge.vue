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
  size?: 'xs' | 'sm' | 'md' | 'lg';
  outline?: boolean;
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

const sizeMap: Record<string, string> = {
  xs: 'badge-xs',
  sm: 'badge-sm',
  md: '',
  lg: 'badge-lg',
};
</script>

<template>
  <span
    class="badge gap-1 font-medium"
    :class="[
      variantMap[variant || 'ghost'],
      sizeMap[size || 'sm'],
      { 'badge-outline': outline },
    ]"
  >
    <slot />
  </span>
</template>
