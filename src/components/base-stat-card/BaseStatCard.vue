<script setup lang="ts">
import { Icon } from '@iconify/vue';

withDefaults(
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
  }>(),
  {
    color: 'primary',
    description: undefined,
  },
);

const colorClasses: Record<string, { text: string; bg: string }> = {
  primary: { text: 'text-primary', bg: 'bg-primary/10' },
  secondary: { text: 'text-secondary', bg: 'bg-secondary/10' },
  accent: { text: 'text-accent', bg: 'bg-accent/10' },
  info: { text: 'text-info', bg: 'bg-info/10' },
  success: { text: 'text-success', bg: 'bg-success/10' },
  warning: { text: 'text-warning', bg: 'bg-warning/10' },
  error: { text: 'text-error', bg: 'bg-error/10' },
};
</script>

<template>
  <div
    class="card bg-base-200 shadow-sm hover:shadow-md transition-shadow duration-200"
  >
    <div class="card-body p-5 flex-row items-center gap-4">
      <div
        class="rounded-xl p-4"
        :class="colorClasses[color || 'primary'].bg"
      >
        <Icon
          :icon="icon"
          class="size-8"
          :class="colorClasses[color || 'primary'].text"
        />
      </div>
      <div class="flex-1 min-w-0">
        <p
          class="text-base font-bold uppercase tracking-wide opacity-60 mb-0.5"
        >
          {{ title }}
        </p>
        <p
          class="text-xl font-bold leading-tight"
          :class="colorClasses[color || 'primary'].text"
        >
          {{ value }}
        </p>
        <p
          v-if="description"
          class="text-xs opacity-50 mt-0.5"
        >
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>
