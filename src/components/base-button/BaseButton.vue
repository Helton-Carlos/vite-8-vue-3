<script setup lang="ts">
import type { Button } from './types';

defineProps<
  Button & {
    variant?:
      | 'primary'
      | 'secondary'
      | 'accent'
      | 'success'
      | 'warning'
      | 'error'
      | 'ghost'
      | 'outline';
    size?: 'xs' | 'sm' | 'md' | 'lg';
  }
>();

defineEmits(['onClick']);

const variantMap: Record<string, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  accent: 'btn-accent',
  success: 'btn-success',
  warning: 'btn-warning',
  error: 'btn-error',
  ghost: 'btn-ghost',
  outline: 'btn-outline btn-primary',
};

const sizeMap: Record<string, string> = {
  xs: 'btn-xs',
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg',
};
</script>

<template>
  <button
    :type="type"
    class="btn gap-2 shadow-sm"
    :class="[variantMap[variant || 'primary'], sizeMap[size || 'md']]"
    @click="$emit('onClick')"
  >
    <slot />
  </button>
</template>
