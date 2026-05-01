<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { Icon } from '@iconify/vue';
import { useStore } from '../../stores/useStore';

const route = useRoute();
const store = useStore();

const title = computed(() => (route?.meta?.title as string) || 'Dashboard');
const isDark = computed(() => store.theme === 'dark');
</script>

<template>
  <header
    class="sticky top-0 z-30 flex items-center justify-between px-8 py-4 bg-base-100/80 backdrop-blur-md border-b border-base-300"
  >
    <div class="flex items-center gap-3">
      <div class="text-sm breadcrumbs">
        <ul>
          <li>
            <Icon
              icon="mdi:home"
              class="size-4 opacity-50"
            />
          </li>
          <li class="font-semibold">
            {{ title }}
          </li>
        </ul>
      </div>
    </div>

    <div class="flex items-center gap-3">
      <label class="swap swap-rotate btn btn-ghost btn-circle btn-sm">
        <input
          type="checkbox"
          :checked="isDark"
          @change="store.toggleTheme()"
        >
        <Icon
          icon="mdi:weather-sunny"
          class="swap-off size-5"
        />
        <Icon
          icon="mdi:weather-night"
          class="swap-on size-5"
        />
      </label>

      <div class="avatar placeholder">
        <div class="bg-primary text-primary-content w-8 rounded-full">
          <span class="text-xs">AG</span>
        </div>
      </div>
    </div>
  </header>
</template>
